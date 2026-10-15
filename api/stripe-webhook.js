// Vercel Serverless Function — Stripe calls this automatically the moment a
// payment completes. It sends the branded confirmation email to the
// customer and the order notification to support@korzavo.com.
//
// Setup required:
// 1. Stripe Dashboard → Developers → Webhooks → Add endpoint
//    URL: https://<your-domain>/api/stripe-webhook
//    Event to send: checkout.session.completed
// 2. Copy the "Signing secret" Stripe shows you into the Vercel environment
//    variable STRIPE_WEBHOOK_SECRET.
// 3. STRIPE_SECRET_KEY and RESEND_API_KEY must also be set (see the other
//    two functions in this folder).
//
// bodyParser is disabled below because Stripe's signature check needs the
// exact raw request bytes — a parsed/re-serialized body will not verify.
import Stripe from "stripe";
import { Resend } from "resend";
import { customerOrderEmail, companyOrderNotificationEmail } from "./_lib/email-templates.js";

export const config = {
  api: { bodyParser: false },
};

const FROM_EMAIL = process.env.ORDER_NOTIFICATION_FROM || "Korzavo <onboarding@resend.dev>";
const COMPANY_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL || "support@korzavo.com";

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Stripe env vars missing");
    return res.status(500).end();
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

  let event;
  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Line items aren't included on the session object itself — fetch
      // them separately.
      const lineItemsResp = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      const items = lineItemsResp.data.map((li) => ({
        name: li.description,
        quantity: li.quantity,
        amount: (li.amount_total || 0) / 100,
      }));
      const total = (session.amount_total || 0) / 100;
      const customerEmail = session.customer_details?.email || session.customer_email;
      const customerName = session.customer_details?.name || session.metadata?.shippingFirstName;

      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Customer confirmation
        if (customerEmail) {
          const customerResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: customerEmail,
            subject: "Your Korzavo order is confirmed",
            html: customerOrderEmail({ customerName, items, total, orderId: session.id }),
          });
          if (customerResult.error) {
            console.error("Resend customer-order email error:", customerResult.error);
          }
        }

        // Company notification
        const companyResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: COMPANY_EMAIL,
          subject: `New order — ${total ? `$${total.toFixed(2)} NZD` : ""}`,
          html: companyOrderNotificationEmail({ customerName, customerEmail, items, total, orderId: session.id }),
        });
        if (companyResult.error) {
          console.error("Resend company-order email error:", companyResult.error);
        }
      } else {
        console.error("RESEND_API_KEY not set — order emails were not sent.");
      }
    } catch (err) {
      // Don't fail the webhook response over an email problem — Stripe
      // will retry the whole webhook otherwise, and the payment itself
      // already succeeded regardless of email delivery.
      console.error("Order email sending failed:", err);
    }
  }

  return res.status(200).json({ received: true });
}
