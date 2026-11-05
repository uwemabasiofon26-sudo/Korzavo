// Static product catalog for Korzavo.
// No database or CMS — this file IS the source of truth for product data.
// To add or edit a product, edit this file directly and redeploy.

import explovexBottle from "@/assets/products/korzavo-explovex.jpg";
import explovexFacts from "@/assets/products/korzavo-explovex-facts.jpg";
import creatineBottle from "@/assets/products/korzavo-creatine.jpg";
import nitroxarBottle from "@/assets/products/korzavo-nitroxar.jpg";
import nitroxarFacts from "@/assets/products/korzavo-nitroxar-facts.jpg";
import androzarBottle from "@/assets/products/korzavo-androzar.jpg";
import androzarFacts from "@/assets/products/korzavo-androzar-facts.jpg";
import dominanceStackImage from "@/assets/products/korzavo-dominance-stack.jpg";
import alpha24StackImage from "@/assets/products/korzavo-alpha-24-stack.jpg";
import nightRecovery3Image from "@/assets/products/korzavo-night-recovery-3-bottles.jpg";
import performanceStackImage from "@/assets/products/korzavo-performance-stack.jpg";
import nightRecoveryBottle from "@/assets/products/korzavo-night-recovery.jpg";
import nightRecoveryFacts from "@/assets/products/korzavo-night-recovery-facts.jpg";

// Wide banners used inside the bundle pages.
import bannerNitroxar from "@/assets/bundles/nitroxar-nitric-oxide.jpg";
import performanceStackBanner from "@/assets/bundles/performance-stack-banner.jpg";
import alpha24PosterNitroxar from "@/assets/bundles/alpha24-nitroxar.jpg";
import alpha24PosterNight from "@/assets/bundles/alpha24-night-recovery.jpg";
import bannerNightRecovery from "@/assets/bundles/night-recovery-rest-relax.jpg";

// Ingredient photography used by the "story" sections on product pages.
import androzarEpimedium from "@/assets/ingredients/androzar-epimedium.jpg";
import androzarPanax from "@/assets/ingredients/androzar-panax-ginseng.jpg";
import androzarEnergy from "@/assets/ingredients/androzar-energy-blend.jpg";
import androzarVitamins from "@/assets/ingredients/androzar-daily-vitamins.jpg";
import androzarMinerals from "@/assets/ingredients/androzar-essential-minerals.jpg";
import dominanceCirculation from "@/assets/ingredients/dominance-circulation.jpg";
import nitroxarCitrulline from "@/assets/ingredients/nitroxar-l-citrulline.jpg";
import nitroxarBeetroot from "@/assets/ingredients/nitroxar-beetroot.jpg";
import nitroxarZinc from "@/assets/ingredients/nitroxar-zinc.jpg";
import nitroxarEpimedium from "@/assets/ingredients/nitroxar-epimedium.jpg";
import nitroxarBlackPepper from "@/assets/ingredients/nitroxar-black-pepper.jpg";

// Shape reference (every field used somewhere in the UI):
// {
//   id, slug, name, tagline, description,
//   long_description?: string[]  (extra paragraphs shown below the Add to Cart button),
//   closing_line?: string        (sign-off line shown after Key Benefits),
//   category: "supplement" | "stack",
//   image, supplement_facts_image?,
//   inStock: boolean,
//   price, compare_at_price?,
//   display_name?: string        (page heading override, e.g. with a ™ mark; `name` stays plain for cart/emails),
//   headline?: string            (page-only eyebrow shown above the product name;
//                                 falls back to `tagline`, which stays short for cards),
//   meta_description?: string    (SEO / structured-data blurb; falls back to `description`),
//   benefits?: string[], ingredients?: string[],
//   servings?, size?, usage?,
//   colors?: string[], sizes?: string[], fit?: string,
//   story?: {                    (full-width ingredient sections below the main columns)
//     heading: string,
//     eyebrow?, numbered? (default true),
//     items: [{ name?, dose?, image?, wide?, href?, cta?, headline?, paragraphs?: (string | {label, text})[], tags?, note? }],
//     closing?: { heading, body },
//   },
//   includes?: [{ id, quantity }]  (bundles: products contained in this bundle),
//   allergen?: string            (shown next to Add to Cart),
//   guarantee?: { title, body, note? }, disclaimer?: string,
//   sort_order?,
// }

export const PRODUCTS = [
  {
    id: "explovex",
    inStock: true,
    slug: "explovex",
    name: "EXPLOVEX",
    display_name: "EXPLOVEX™",
    tagline: "Extreme Pre-Workout",
    headline: "Maximum Pump & Performance",
    description:
      "Extreme pre-workout built for maximum pump and performance — 6,000 mg L-Citrulline, 3,000 mg Taurine and 1,000 mg L-Arginine per serving. Unflavoured.",
    category: "supplement",
    image: explovexBottle,
    price: 69.99,
    benefits: [
      "Maximum pump & performance",
      "Supports nitric oxide production and blood flow",
      "Three clearly dosed ingredients, unflavoured",
    ],
    ingredients: [
      "L-Citrulline — 6000mg",
      "Taurine — 3000mg",
      "L-Arginine — 1000mg",
    ],
    servings: "20 servings",
    size: "300g · Unflavoured",
    usage: "Mix 1 scoop with water 20–30 minutes before training.",
    sort_order: 1,
  },
  {
    id: "creatine",
    inStock: true,
    slug: "creatine",
    name: "CREATINE MONOHYDRATE",
    tagline: "100% Pure Creatine Monohydrate",
    description:
      "100% pure creatine monohydrate — 5,000 mg per serving, unflavoured and easy to mix any time of day.",
    category: "supplement",
    image: creatineBottle,
    price: 44.99,
    benefits: [
      "Supports strength and power output",
      "100% pure creatine monohydrate",
      "Simple, effective daily dose of 5,000 mg",
    ],
    ingredients: [
      "Creatine Monohydrate — 5000mg",
    ],
    servings: "50 servings",
    size: "300g · Unflavoured",
    usage: "Mix 1 scoop with water, any time of day.",
    sort_order: 3,
  },
  {
    id: "nitroxar",
    inStock: true,
    slug: "nitroxar",
    name: "NITROXAR",
    display_name: "NITROXAR™",
    tagline: "Blood Flow. Endurance. Performance.",
    headline: "Built around blood flow. Created for active men and women.",
    // `description` is the short intro (shown under the product name).
    // `meta_description` feeds SEO / structured data. `long_description`
    // paragraphs render further down the page, after the Add to Cart button.
    description:
      "Your training demands effort. Your body relies on circulation.",
    meta_description:
      "NITROXAR brings together 3,600 mg of L-Citrulline, Beetroot Extract, Epimedium, Zinc and Black Pepper Extract in one capsule formula built around blood flow.",
    long_description: [
      "Blood flow carries oxygen and nutrients to working muscles, connecting the science of circulation with the demands of an active lifestyle.",
      "NITROXAR brings together 3,600 mg of L-Citrulline, Beetroot Extract, Epimedium, Zinc and Black Pepper Extract in one capsule formula.",
      "Its focus combines nitric-oxide biology, essential mineral nutrition and botanical ingredients for an active lifestyle.",
    ],
    category: "supplement",
    image: nitroxarBottle,
    supplement_facts_image: nitroxarFacts,
    price: 79,
    benefits: [
      "Blood flow, endurance and pump",
      "Nitric-oxide biology with L-Citrulline and Beetroot",
      "Essential mineral nutrition",
      "Botanical ingredients for an active lifestyle",
      "Created for active men and women",
    ],
    // Names and doses match the Supplement Facts image.
    ingredients: [
      "L-Citrulline — 3600mg",
      "Beetroot Extract (10:1) — 600mg",
      "Epimedium Extract (10% Icariin) — 540mg",
      "Zinc (as Zinc Acetate) — 20mg",
      "Black Pepper Extract — 12mg",
    ],
    servings: "15 servings",
    size: "90 Capsules",
    usage: "Take 6 capsules daily with water. Do not exceed the recommended daily serving.",
    story: {
      heading: "Five ingredients. One clear focus.",
      items: [
        {
          name: "L-Citrulline",
          dose: "3,600 mg per serving",
          image: nitroxarCitrulline,
          headline: "The foundation of the blood-flow focus",
          paragraphs: [
            "L-Citrulline is an amino acid that the body converts into L-Arginine, which is used to produce nitric oxide.",
            "Nitric oxide helps blood vessels relax and plays an important role in regulating circulation. During exercise, circulation delivers oxygen and nutrients to working muscles.",
            { label: "Training connection", text: "This pathway explains why L-Citrulline is a familiar ingredient in formulas centred on blood flow and the workout pump. It has also been studied for exercise performance, with results depending on the dose, protocol and activity." },
            { label: "Beyond the gym", text: "Circulation is part of normal physical and sexual function, making nitric-oxide biology relevant to the wider conversation around men’s wellbeing." },
            "NITROXAR provides 3,600 mg of L-Citrulline per serving as the formula’s principal ingredient.",
          ],
          tags: "Amino acid • Nitric-oxide precursor • Circulation science",
        },
        {
          name: "Beetroot Extract",
          dose: "600 mg per serving | 10:1 Extract",
          image: nitroxarBeetroot,
          headline: "Rooted in nature. Connected to movement.",
          paragraphs: [
            "Beetroot is a distinctive botanical with a recognised place in sports nutrition.",
            "Naturally occurring dietary nitrates in beetroot can be converted by the body into nitric oxide—a molecule involved in blood-vessel relaxation and circulation.",
            { label: "The training connection", text: "Blood flow delivers oxygen and nutrients to working muscles. Research on nitrate-rich beetroot preparations has explored this connection to exercise efficiency and endurance." },
            { label: "In the NITROXAR formula", text: "Each serving provides 600 mg of Beetroot Extract at a 10:1 extraction ratio, complementing L-Citrulline in a blend centred on circulation science and active living." },
          ],
          tags: "Botanical origin • Circulation science • Active living",
        },
        {
          name: "Zinc",
          dose: "20 mg per serving | As Zinc Acetate",
          image: nitroxarZinc,
          headline: "Essential nutrition for an active body",
          paragraphs: [
            "Zinc is an essential mineral involved in hundreds of enzyme systems throughout the body.",
            "It contributes to normal protein and DNA synthesis, immune function, cell division and wound healing.",
            { label: "Training connection", text: "Protein synthesis and normal tissue maintenance are fundamental processes for a body that trains. Adequate zinc intake helps meet the nutritional needs behind these everyday functions." },
            { label: "Everyday wellbeing", text: "Its contribution extends beyond the gym, supporting essential biological processes that matter throughout daily life." },
            "NITROXAR provides 20 mg of zinc per serving, supplied as zinc acetate.",
          ],
          tags: "Protein synthesis • Immune function • Normal cell maintenance",
        },
        {
          name: "Epimedium Extract",
          dose: "540 mg per serving | Standardised to 10% Icariin",
          image: nitroxarEpimedium,
          headline: "Male vitality beyond the workout",
          paragraphs: [
            "Looking after yourself extends beyond physical training.",
            "Epimedium brings a long tradition of use for sexual vitality to NITROXAR. Its characteristic compound, icariin, has been investigated in laboratory and animal research for mechanisms associated with sexual function.",
            { label: "Men’s wellbeing connection", text: "Its role in the formula reflects the importance of intimacy and male wellbeing alongside an active lifestyle." },
            { label: "A clearly specified extract", text: "Each serving provides 540 mg of Epimedium Extract, standardised to 10% icariin. The standardisation identifies its specified compound content; it is not a measure of guaranteed results." },
          ],
          tags: "Traditional male vitality • Botanical heritage • Standardised extract",
        },
        {
          name: "Black Pepper Extract",
          dose: "12 mg per serving",
          image: nitroxarBlackPepper,
          headline: "Small detail. Purposeful addition.",
          paragraphs: [
            "Black pepper contains piperine, a natural compound studied for its role in the absorption of certain nutrients and botanical compounds.",
            "NITROXAR includes 12 mg of Black Pepper Extract per serving, completing its five-ingredient formula.",
          ],
          tags: "Botanical origin • Piperine research • Thoughtful formulation",
        },
      ],
    },
    sort_order: 6,
  },
  {
    id: "androzar",
    inStock: true,
    slug: "androzar",
    name: "ANDROZAR",
    tagline: "Power to Perform",
    headline: "Energy. Strength. Vitality.",
    description:
      "ANDROZAR brings a daily foundation of 19 vitamins and minerals together with Epimedium Extract, Panax Ginseng Extract and an Energy & Performance Blend, in one daily pack.",
    meta_description:
      "ANDROZAR — Power to Perform. A daily pack of 19 vitamins and minerals, Epimedium Extract, Panax Ginseng Extract and an Energy & Performance Blend for energy, strength and vitality.",
    long_description: [
      "Each daily pack is built in three parts: a Daily Health Foundation of vitamins and minerals, a Vitality & Performance pair of standardised extracts, and an Energy & Performance Blend.",
      "Made for training sessions and demanding workdays alike.",
    ],
    category: "supplement",
    image: androzarBottle,
    supplement_facts_image: androzarFacts,
    price: 79,
    benefits: [
      "Energy, strength and vitality",
      "19 vitamins and minerals in one daily pack",
      "Standardised Epimedium and Panax Ginseng extracts",
      "Energy & Performance Blend for training sessions and demanding workdays",
    ],
    // Matches the Supplement Facts image: 1 daily pack = 5 capsules
    // (1 foundation + 3 vitality & performance + 1 energy & performance).
    ingredients: [
      "Daily Health Foundation: 19 Vitamins & Minerals",
      "Epimedium Extract (10% Icariin) — 1000mg",
      "Panax Ginseng Extract (20% Ginsenosides) — 300mg",
      "Energy & Performance Blend — 470mg (L-Tyrosine, Caffeine Anhydrous, L-Theanine, Rhodiola rosea Extract, Bitter Orange Extract)",
    ],
    // Ingredients shown in the "Scientific Research" cards (the blend is split
    // into its components so each gets its own card).
    show_research: true,
    research_ingredients: [
      "19 Vitamins & Minerals",
      "Epimedium Extract",
      "Panax Ginseng Extract",
      "L-Tyrosine",
      "Caffeine Anhydrous",
      "L-Theanine",
      "Rhodiola rosea Extract",
      "Bitter Orange Extract",
    ],
    servings: "20 servings",
    size: "5 capsules per serving · 100 capsules",
    usage: "Serving size: 1 daily pack (5 capsules). Servings per container: 20.",
    allergen: "Contains caffeine.",
    disclaimer:
      "Contains caffeine. Not suitable for children. If you are pregnant, breastfeeding, sensitive to caffeine or other stimulants, taking medication or managing a medical condition, consult a healthcare professional before use. Individual results vary. Follow the final product label.",
    story: {
      heading: "Inside the daily pack",
      items: [
        {
          name: "Energy & Performance Blend",
          dose: "470 mg per serving",
          image: androzarEnergy,
          headline: "Built for training sessions and demanding workdays",
          paragraphs: [
            "Designed for gym-goers, office workers, and busy adults who want support for energy, alertness, and focus.",
            "We added this blend to complement ANDROZAR’s vitamins and botanical extracts, with training sessions and demanding workdays in mind.",
          ],
          list: {
            label: "In the blend",
            items: ["L-Tyrosine", "Caffeine Anhydrous", "L-Theanine", "Rhodiola rosea Extract", "Bitter Orange Extract"],
          },
          note: "Contains caffeine.",
          tags: "Energy • Alertness • Focus",
        },
        {
          name: "Epimedium Extract",
          dose: "1,000 mg per serving | Standardised to 10% Icariin",
          image: androzarEpimedium,
          headline: "A tradition of male vitality",
          paragraphs: [
            "Male wellbeing includes intimacy as well as physical activity.",
            "Epimedium has a long history of traditional use for sexual vitality. Its distinctive plant compound, icariin, makes it a recognisable ingredient in the conversation around men’s wellbeing.",
            "ANDROZAR provides 1,000 mg of Epimedium extract per serving, standardised to 10% icariin—a clearly specified contribution to the formula’s vitality focus.",
          ],
          tags: "Traditional use • Male vitality • Defined extract content",
        },
        {
          name: "Panax Ginseng Extract",
          dose: "300 mg per serving | Standardised to 20% Ginsenosides",
          image: androzarPanax,
          headline: "Vitality beyond your workout",
          paragraphs: [
            "Panax Ginseng has a long tradition of use for vitality, with human research exploring its potential role in general fatigue and wellbeing.",
            "Its characteristic compounds, called ginsenosides, give this botanical its distinctive identity.",
            { label: "In the ANDROZAR formula", text: "Each serving provides 300 mg of Panax Ginseng Extract, standardised to 20% ginsenosides." },
            "It complements the vitamin and mineral foundation and the Energy & Performance Blend, adding a botanical focus on everyday vitality for people with busy, active lives.",
          ],
          tags: "Traditional vitality • General fatigue research • Standardised extract",
        },
        {
          name: "Daily Vitamins",
          dose: "12 Vitamins. A Nutritional Foundation.",
          image: androzarVitamins,
          headline: "Support the processes behind your day",
          paragraphs: [
            "ANDROZAR combines eight B vitamins with vitamins A, C, D3 and E.",
            "B vitamins contribute to the normal metabolic processes that allow the body to use nutrients from food. Selected vitamins also support normal nerve function and red blood cell formation.",
            "Vitamins A, C and D contribute to normal immune function. Vitamin C supports collagen formation, vitamin D supports normal muscle and bone function, and vitamin E contributes to antioxidant protection.",
            "A nutritional foundation for people who value consistent daily care.",
          ],
          tags: "Energy metabolism • Immune function • Daily nutrition",
        },
        {
          name: "Essential Minerals",
          dose: "Seven Minerals. Everyday Roles.",
          image: androzarMinerals,
          headline: "Small nutrients. Essential functions.",
          paragraphs: [
            "Zinc, magnesium, iodine, selenium, copper, manganese and chromium complete the mineral foundation of ANDROZAR.",
            "Magnesium contributes to normal muscle and nerve function and energy metabolism. Zinc supports normal protein synthesis and immune function.",
            "Iodine contributes to thyroid hormone production, while selenium supports normal thyroid function and antioxidant systems. Copper and manganese participate in essential enzyme processes, and chromium is involved in insulin action and nutrient metabolism.",
            "Together, these minerals help meet nutritional needs that matter both during daily life and an active routine.",
          ],
          tags: "Muscle & nerve function • Nutrient metabolism • Essential nutrition",
        },
      ],
      closing: {
        heading: "ANDROZAR — Power to perform.",
        body: "One daily pack. Energy, strength and vitality.",
        cta: "Add ANDROZAR to Cart",
      },
    },
    sort_order: 7,
  },
  {
    id: "night-recovery",
    inStock: true,
    slug: "night-recovery",
    name: "NIGHT RECOVERY",
    tagline: "Sleep & Recovery Formula",
    description:
      "A comprehensive nighttime formula created to support relaxation, restful sleep and overnight recovery — fully disclosed, no proprietary blends.",
    category: "supplement",
    image: nightRecoveryBottle,
    supplement_facts_image: nightRecoveryFacts,
    price: 79,
    benefits: [
      "Supports relaxation before bedtime",
      "Supports restful, quality sleep",
      "Helps maintain healthy sleep patterns",
      "Supports overnight muscle and nervous-system recovery",
      "Helps reduce feelings of everyday tension",
    ],
    ingredients: [
      "Magnesium — 335mg",
      "Valerian Root Extract — 400mg",
      "Passionflower Extract — 300mg",
      "L-Tryptophan — 300mg",
    ],
    servings: "15 servings",
    size: "90 Capsules",
    usage: "Take 6 capsules with water approximately 30–60 minutes before bedtime.",
    sort_order: 8,
  },
  {
    id: "complete-stack",
    inStock: true,
    slug: "complete-stack",
    name: "The Complete Stack",
    tagline: "Complete Performance System",
    description:
      "EXPLOVEX, ANDROZAR, CREATINE, GROW and GLYCOLOAD together as a complete performance system. Build. Fuel. Perform.",
    category: "stack",
    image: stackBottle,
    price: 259.99,
    includes: [
      { id: "explovex", quantity: 1 },
      { id: "androzar", quantity: 1 },
      { id: "creatine", quantity: 1 },
      { id: "grow", quantity: 1 },
      { id: "glycoload", quantity: 1 },
    ],
    sort_order: 9,
  },
  {
    id: "dominance-stack",
    inStock: true,
    slug: "dominance-stack",
    name: "DOMINANCE STACK",
    display_name: "DOMINANCE STACK™",
    tagline: "NITROXAR™ + ANDROZAR",
    headline: "Energy. Focus. Blood Flow.",
    description:
      "Bring circulation-focused ingredients and everyday vitality and energy support into one thoughtfully selected bundle.",
    long_description: [
      "NITROXAR features L-Citrulline, Beetroot Extract, Epimedium, Zinc and Black Pepper Extract.",
      "ANDROZAR brings together Epimedium, Panax Ginseng, an Energy & Performance Blend and a daily foundation of 19 vitamins and minerals.",
      "Two distinct ingredient profiles, connecting your interest in training with your commitment to everyday wellbeing.",
    ],
    category: "stack",
    image: dominanceStackImage,
    price: 104,
    includes: [
      { id: "nitroxar", quantity: 1 },
      { id: "androzar", quantity: 1 },
    ],
    story: {
      eyebrow: "Inside the Stack",
      heading: "Inside the Dominance Stack",
      numbered: false,
      items: [
        {
          name: "The Circulation Connection",
          image: dominanceCirculation,
          alt: "L-Citrulline and Beetroot",
          width: 760,
          height: 793,
          paragraphs: [
            "Your working muscles rely on blood flow to deliver oxygen and nutrients.",
            "L-Citrulline participates in the body’s arginine and nitric-oxide pathways. Nitric oxide helps blood vessels relax—a connection that makes citrulline an ingredient of interest in sports nutrition.",
            "NITROXAR provides 3,600 mg of L-Citrulline per serving alongside Beetroot Extract and essential zinc.",
          ],
          tags: "Circulation science • Active living • Mineral nutrition",
        },
        {
          name: "The Vitality Connection",
          image: androzarPanax,
          alt: "Panax Ginseng extract",
          paragraphs: [
            "An active routine goes beyond the workout.",
            "ANDROZAR combines Epimedium and Panax Ginseng—ingredients with a history of use in traditional vitality preparations—with an Energy & Performance Blend and a daily vitamin and mineral foundation.",
            "Paired with NITROXAR, the bundle offers a broader selection of ingredients for customers interested in both circulation-focused nutrition and everyday vitality and energy.",
            "Build your routine around purposeful training, balanced nutrition and quality sleep.",
          ],
          tags: "Traditional botanicals • Daily energy • A focused routine",
        },
      ],
    },
    sort_order: 11,
  },
  {
    id: "alpha-24-stack",
    inStock: true,
    slug: "alpha-24-stack",
    name: "ALPHA 24 STACK",
    tagline: "Vitality • Performance • Recovery",
    headline: "Bring more to your day. Make time to recover.",
    description:
      "Your routine demands more than a single focus. ALPHA 24 brings NITROXAR, ANDROZAR and NIGHT RECOVERY together in one bundle centred on blood flow, men’s vitality and evening relaxation.",
    long_description: [
      "From physical activity to personal wellbeing and your nighttime wind-down, give every part of your routine the attention it deserves.",
    ],
    category: "stack",
    image: alpha24StackImage,
    price: 129,
    includes: [
      { id: "nitroxar", quantity: 1 },
      { id: "androzar", quantity: 1 },
      { id: "night-recovery", quantity: 1 },
    ],
    story: {
      eyebrow: "Inside the Stack",
      heading: "What’s in the stack",
      numbered: false,
      items: [
        // NITROXAR
        { wide: true, image: bannerNitroxar, alt: "Nitric Oxide & Blood Flow — NITROXAR" },
        {
          name: "NITROXAR — Blood Flow & Physical Performance",
          image: alpha24PosterNitroxar,
          alt: "NITROXAR — built around blood flow",
          width: 1024,
          height: 1536,
          paragraphs: [
            "Built around L-Citrulline, with beetroot and epimedium extracts, NITROXAR focuses on circulation—a key part of delivering oxygen and nutrients to working muscles.",
          ],
          list: {
            label: "Designed to support:",
            items: [
              "Healthy blood flow and circulation.",
              "Muscle pump during exercise.",
              "Physical performance during demanding activity.",
            ],
          },
          href: "/product/nitroxar",
          cta: "View NITROXAR",
        },
        // ANDROZAR (new bottle image — the old poster/banner showed the previous formula)
        {
          name: "ANDROZAR — Men’s Daily Vitality",
          image: androzarBottle,
          alt: "ANDROZAR — Power to Perform",
          width: 1254,
          height: 1254,
          paragraphs: [
            "Featuring Epimedium, Panax Ginseng and an Energy & Performance Blend, with a daily foundation of vitamins and minerals, ANDROZAR brings a dedicated focus to men’s vitality and everyday wellbeing.",
          ],
          list: {
            label: "Designed for men who prioritise:",
            items: [
              "Daily vitality and an active lifestyle.",
              "Consistency in their wellbeing routine.",
              "Personal wellbeing beyond the gym.",
            ],
          },
          href: "/product/androzar",
          cta: "View ANDROZAR",
        },
        // NIGHT RECOVERY
        { wide: true, image: bannerNightRecovery, alt: "Rest. Relax. Recover. — NIGHT RECOVERY" },
        {
          name: "NIGHT RECOVERY — Rest & Relaxation",
          image: alpha24PosterNight,
          alt: "NIGHT RECOVERY — make time to unwind",
          width: 1024,
          height: 1536,
          paragraphs: [
            "Your evening deserves the same commitment as your day. Featuring valerian root, magnesium and passionflower, NIGHT RECOVERY is designed to complement your bedtime routine.",
          ],
          list: {
            label: "Designed to support:",
            items: [
              "Relaxation as the day comes to an end.",
              "A calmer transition towards bedtime.",
              "A consistent nighttime wind-down.",
            ],
          },
          href: "/product/night-recovery",
          cta: "View NIGHT RECOVERY",
        },
        // Closing sections
        {
          wide: true,
          name: "Men’s Wellbeing. A More Personal Focus.",
          paragraphs: [
            "Your wellbeing matters in the moments you share, too. Healthy circulation plays a role in normal sexual function, giving blood flow a purpose beyond exercise.",
            "ALPHA 24 brings this personal side of wellbeing into the picture, alongside everyday vitality and time to unwind. For men who value an active life and a close connection with their partner.",
          ],
        },
        {
          wide: true,
          name: "Why choose Alpha 24?",
          paragraphs: [
            "Because your goals extend across the whole day.",
            "NITROXAR focuses on blood flow and physical performance. ANDROZAR focuses on men’s vitality. NIGHT RECOVERY adds a dedicated evening formula.",
            "Three focused formulas. Clearly disclosed doses. One convenient bundle.",
          ],
        },
      ],
      closing: {
        heading: "Live stronger. Every day.",
        cta: "Shop Alpha 24 Stack",
      },
    },
    sort_order: 12,
  },
  {
    id: "night-recovery-3-bottles",
    inStock: true,
    slug: "night-recovery-3-bottles",
    name: "NIGHT RECOVERY — 3 BOTTLES",
    tagline: "Sleep & Recovery Formula · 3 Bottles",
    description:
      "Make rest part of your nightly routine. Choose the 3-bottle bundle and use NIGHT RECOVERY as directed to complement your evening wind-down.",
    category: "stack",
    image: nightRecovery3Image,
    supplement_facts_image: nightRecoveryFacts,
    price: 129,
    includes: [{ id: "night-recovery", quantity: 3 }],
    // Same formula as the single bottle (see the NIGHT RECOVERY entry).
    ingredients: [
      "Magnesium — 335mg",
      "Valerian Root Extract — 400mg",
      "Passionflower Extract — 300mg",
      "L-Tryptophan — 300mg",
    ],
    servings: "15 servings per bottle",
    size: "3 bottles · 90 capsules each",
    usage: "Take 6 capsules with water approximately 30–60 minutes before bedtime.",
    sort_order: 13,
  },
  {
    id: "performance-stack",
    inStock: true,
    slug: "performance-stack",
    name: "PERFORMANCE STACK",
    display_name: "PERFORMANCE STACK™",
    tagline: "EXPLOVEX + CREATINE",
    headline: "Pump. Strength. Performance.",
    description:
      "Two powerful formulas. One performance-focused routine — EXPLOVEX Pre-Workout and Creatine Monohydrate together to support nitric oxide pathways and muscular energy production.",
    meta_description:
      "KORZAVO PERFORMANCE STACK™ brings together EXPLOVEX Pre-Workout and Pure Creatine Monohydrate to support nitric oxide pathways and muscular energy production.",
    category: "stack",
    image: performanceStackImage,
    price: 94,
    includes: [
      { id: "explovex", quantity: 1 },
      { id: "creatine", quantity: 1 },
    ],
    landing: {
      subtitle: "Two Powerful Formulas. One Performance-Focused Routine.",
      intro: [
        "The KORZAVO PERFORMANCE STACK™ brings together EXPLOVEX™ Pre-Workout and Pure Creatine Monohydrate to support two essential aspects of training: nitric oxide pathways and muscular energy production.",
        "Designed for dedicated lifters, fitness enthusiasts, and performance-driven individuals who want to get more from their training.",
      ],
      gallery: [
        { src: performanceStackImage, alt: "Performance Stack — EXPLOVEX and Creatine Monohydrate" },
        { src: explovexBottle, alt: "EXPLOVEX Extreme Pre-Workout" },
        { src: creatineBottle, alt: "Creatine Monohydrate" },
      ],
      trust: [
        { icon: "package", label: "2 complete formulas" },
        { icon: "shield", label: "Full ingredient doses" },
        { icon: "truck", label: "Ships within NZ" },
      ],

      benefits: {
        eyebrow: "Benefits",
        heading: "Six key benefits",
        items: [
          {
            title: "Supports Nitric Oxide Production & Muscle Pump",
            paragraphs: [
              "EXPLOVEX™ delivers 6,000mg of L-Citrulline alongside 1,000mg of L-Arginine. These amino acids participate in the body’s nitric oxide production pathway, which helps regulate blood vessel relaxation and circulation.",
              "This makes EXPLOVEX™ a circulation-focused addition to a pre-workout routine, particularly for individuals seeking a fuller muscle pump during resistance training. Individual responses may vary.",
            ],
          },
          {
            title: "Enhances Strength & Explosive Power",
            paragraphs: [
              "Creatine Monohydrate helps replenish phosphocreatine stores in skeletal muscle, supporting the rapid regeneration of ATP, the energy used during short bursts of high-intensity exercise.",
              "With consistent daily supplementation, creatine can improve performance during activities such as heavy lifting, sprinting, and repeated explosive movements.",
            ],
          },
          {
            title: "Supports Training Volume & Workout Capacity",
            paragraphs: [
              "Creatine supports repeated high-intensity efforts, potentially helping athletes perform more work across demanding training sessions.",
              "EXPLOVEX™ complements this approach with ingredients selected for nitric oxide pathways and muscular function, making the stack suitable for strength-focused and high-volume workouts.",
            ],
          },
          {
            title: "Supports Muscular Function & Exercise Performance",
            paragraphs: [
              "Each serving of EXPLOVEX™ provides 3,000mg of Taurine, an amino compound involved in cellular fluid balance and normal muscle function.",
              "Research suggests Taurine supplementation may provide modest benefits in certain exercise-performance measures, although results vary between individuals and exercise types.",
            ],
          },
          {
            title: "Supports Muscle Development Through Better Training",
            paragraphs: [
              "Creatine supplementation, combined with a consistent resistance-training programme, can support increases in lean mass and strength over time.",
              "By combining daily creatine with a pre-workout formula, PERFORMANCE STACK™ offers a convenient routine for individuals working towards long-term strength and muscle-development goals.",
            ],
          },
          {
            title: "Two Complementary Approaches to Performance",
            paragraphs: [
              "Rather than focusing on only one aspect of a workout, PERFORMANCE STACK™ combines:",
            ],
            bullets: [
              "Nitric oxide pathway support.",
              "Rapid muscular energy regeneration.",
              "Support for repeated high-intensity exercise.",
              "Muscular function support.",
              "A convenient pre-workout and daily creatine routine.",
            ],
          },
        ],
      },

      how: {
        eyebrow: "How it works",
        heading: "How PERFORMANCE STACK™ works",
        steps: [
          {
            title: "The nitric oxide pathway",
            paragraphs: [
              "L-Citrulline is converted into L-Arginine in the body. Arginine serves as a precursor for nitric oxide, a molecule involved in regulating blood vessel relaxation.",
              "This pathway is relevant to circulation and the muscle-pump response during exercise, although increased blood flow or pump is not guaranteed.",
            ],
          },
          {
            title: "Muscular function",
            paragraphs: [
              "Taurine participates in processes involving muscle-cell fluid regulation and calcium handling, both important aspects of normal muscular function.",
              "Supplementation may support some aspects of exercise performance, but benefits are not consistently demonstrated across all types of training.",
            ],
          },
          {
            title: "Rapid energy regeneration",
            paragraphs: [
              "Creatine increases available muscular phosphocreatine stores over time.",
              "During intense exercise, phosphocreatine helps regenerate ATP, supporting the repeated muscular contractions required for weightlifting, sprinting, and explosive movements.",
            ],
          },
          {
            title: "Long-term training adaptation",
            paragraphs: [
              "Consistent creatine supplementation, alongside progressive resistance training, may help individuals achieve greater training adaptations, including improvements in strength and lean mass.",
            ],
          },
        ],
        result: {
          label: "The result",
          text: "A complementary performance routine combining pre-workout nitric oxide pathway support with evidence-backed creatine supplementation for high-intensity training.",
        },
      },

      products: {
        eyebrow: "The formulas",
        heading: "Individual product benefits",
        items: [
          {
            id: "explovex",
            kicker: "Extreme Pre-Workout",
            specs: ["20 Servings", "300 g", "Unflavoured"],
            groups: [
              {
                items: [
                  {
                    label: "6,000mg L-Citrulline",
                    image: stackCitrulline,
                    bullets: [
                      "Supports the body’s nitric oxide production pathway.",
                      "Contributes to the availability of arginine for nitric oxide synthesis.",
                      "Designed for circulation-focused pre-workout support.",
                    ],
                  },
                  {
                    label: "3,000mg Taurine",
                    image: stackTaurine,
                    bullets: [
                      "Supports normal muscular and cellular function.",
                      "Plays a role in calcium regulation and cellular fluid balance.",
                      "May help support selected exercise-performance outcomes.",
                    ],
                  },
                  {
                    label: "1,000mg L-Arginine",
                    image: stackArginine,
                    bullets: [
                      "Serves as a substrate for nitric oxide production.",
                      "Complements the formula’s nitric oxide-focused ingredient profile.",
                      "Provides additional arginine, although direct performance benefits at this dose are not established.",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "creatine",
            kicker: "Strength & Power",
            specs: ["50 Servings", "300 g", "Unflavoured"],
            groups: [
              {
                items: [
                  {
                    label: "Creatine Monohydrate — 5,000mg per serving",
                    image: stackCreatine,
                    bullets: [
                      "Supports rapid ATP regeneration during high-intensity exercise.",
                      "Improves performance in repeated, short-duration, high-intensity efforts.",
                      "Supports strength and power development.",
                      "Helps improve training adaptations when combined with resistance exercise.",
                      "Can support gains in lean mass alongside consistent resistance training.",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      education: {
        eyebrow: "Fitness education",
        heading: "Training perspective",
        label: "General educational commentary, not an individual professional endorsement.",
        paragraphs: [
          "When building a performance-focused training routine, it helps to look at more than just the immediate pre-workout experience. Supporting muscular energy availability and maintaining consistent training quality are important for long-term progress.",
          "The KORZAVO PERFORMANCE STACK™ combines a citrulline-based pre-workout formula with creatine monohydrate, one of the most extensively researched supplements for high-intensity exercise.",
          "It’s a practical combination for strength-focused individuals who want to approach their training with consistency and purpose.",
        ],
        attribution: "KORZAVO Educational Content",
      },

      why: {
        tagline: "Train hard. Build strength. Push your performance.",
        name: "PERFORMANCE STACK™",
        signoff: "Two formulas. One goal. A stronger training routine.",
      },

      disclaimer:
        "Individual results vary. Follow the final product labels. If pregnant, breastfeeding, taking medication or managing a medical condition, consult a healthcare professional before use.",
    },
    sort_order: 10,
  },
];