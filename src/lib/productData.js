// Static product catalog for Korzavo.
// No database or CMS — this file IS the source of truth for product data.
// To add or edit a product, edit this file directly and redeploy.

import explovexBottle from "@/assets/products/korzavo-explovex.jpg";
import explovexFacts from "@/assets/products/korzavo-explovex-facts.jpg";
import korzixBottle from "@/assets/products/korzavo-korzix.jpg";
import korzixFacts from "@/assets/products/korzavo-korzix-facts.jpg";
import creatineBottle from "@/assets/products/korzavo-creatine.jpg";
import creatineFacts from "@/assets/products/korzavo-creatine-facts.jpg";
import growBottle from "@/assets/products/korzavo-grow.jpg";
import glycoloadBottle from "@/assets/products/korzavo-glycoload.jpg";
import stackBottle from "@/assets/products/korzavo-stack.jpg";
import nitroxarBottle from "@/assets/products/korzavo-nitroxar.jpg";
import nitroxarFacts from "@/assets/products/korzavo-nitroxar-facts.jpg";
import nightRecoveryBottle from "@/assets/products/korzavo-night-recovery.jpg";
import nightRecoveryFacts from "@/assets/products/korzavo-night-recovery-facts.jpg";

// Shape reference (every field used somewhere in the UI):
// {
//   id, slug, name, tagline, description,
//   long_description?: string[]  (extra paragraphs shown below the Add to Cart button),
//   closing_line?: string        (sign-off line shown after Key Benefits),
//   category: "supplement" | "stack",
//   image, supplement_facts_image?,
//   inStock: boolean,
//   price, compare_at_price?,
//   benefits?: string[], ingredients?: string[],
//   servings?, size?, usage?,
//   colors?: string[], sizes?: string[], fit?: string,
//   sort_order?,
// }

export const PRODUCTS = [
  {
    id: "explovex",
    inStock: true,
    slug: "explovex",
    name: "EXPLOVEX",
    tagline: "Extreme Pre-Workout",
    description:
      "A high-intensity pre-workout built for pump, endurance and focus — Raspberry Lemonade flavour, dosed for output that lasts the whole session.",
    category: "supplement",
    image: explovexBottle,
    supplement_facts_image: explovexFacts,
    price: 69.99,
    benefits: [
      "Supports nitric oxide production and blood flow",
      "Buffers muscular fatigue during high-intensity sets",
      "Clean, dosed stimulation without the crash",
    ],
    // Dosages below match the Supplement Facts panel.
    ingredients: [
      "L-Citrulline — 4500mg",
      "L-Arginine — 2500mg",
      "Taurine — 2000mg",
      "L-Theanine — 150mg",
      "Caffeine Anhydrous — 150mg",
    ],
    servings: "20 servings",
    size: "200g · Raspberry Lemonade",
    usage: "Mix 1 scoop with water 20–30 minutes before training.",
    sort_order: 1,
  },
  {
    id: "korzix",
    inStock: true,
    slug: "korzix",
    name: "KORZIX",
    tagline: "Premium Daily Performance Multi",
    description:
      "A 2-system daily vitality formula — a complete multivitamin and mineral foundation, plus a vitality and performance blend — in one 6-capsule daily pack.",
    category: "supplement",
    image: korzixBottle,
    supplement_facts_image: korzixFacts,
    price: 79,
    benefits: [
      "Complete multivitamin and mineral foundation",
      "Oyster extract, maca and ginseng for vitality",
      "Supports energy, stamina and focus",
    ],
    ingredients: [
      "Complete Multivitamin + Mineral Formula — 1 capsule",
      "Oyster Extract — 1000mg",
      "Black Maca Extract (10:1) — 1000mg",
      "Panax Ginseng Extract (20% Ginsenosides) — 300mg",
    ],
    servings: "20 servings",
    size: "6 capsule daily pack · 120 capsules",
    usage: "Take all 6 capsules together once daily, with food.",
    sort_order: 2,
  },
  {
    id: "creatine",
    inStock: true,
    slug: "creatine",
    name: "CREATINE",
    tagline: "Creatine + Electrolytes",
    description:
      "Creatine and electrolytes for strength, performance and hydration — Raspberry Lemonade flavour, easy to mix any time of day.",
    category: "supplement",
    image: creatineBottle,
    supplement_facts_image: creatineFacts,
    price: 44.99,
    benefits: [
      "Supports strength and power output",
      "Electrolytes for hydration support",
      "Simple, effective daily dose",
    ],
    ingredients: [
      "Creatine — 5000mg",
      "Sodium — 300mg",
      "Potassium — 200mg",
    ],
    servings: "30 servings",
    size: "250g · Raspberry Lemonade",
    usage: "Mix 1 scoop with water, any time of day.",
    sort_order: 3,
  },
  {
    id: "grow",
    inStock: true,
    slug: "grow",
    name: "GROW",
    tagline: "Premium Protein",
    description:
      "A smooth, creamy 25g protein blend designed for easy mixing and real recovery — Chocolate Hazelnut flavour, no compromise.",
    category: "supplement",
    image: growBottle,
    price: 89.99,
    benefits: [
      "25g of protein per serving",
      "Smooth, creamy texture that mixes easily",
      "Supports post-training muscle recovery",
    ],
    ingredients: ["Premium Protein Blend — 25g"],
    servings: "~33 servings",
    size: "1kg · Chocolate Hazelnut",
    usage: "Mix 1–2 scoops with water or milk post-workout.",
    sort_order: 4,
  },
  {
    id: "glycoload",
    inStock: true,
    slug: "glycoload",
    name: "GLYCOLOAD",
    tagline: "Fast-Digesting Carbohydrate",
    description:
      "A fast-digesting maltodextrin carbohydrate powder for athletes and gym users who need convenient training fuel — Raspberry Lemonade flavour, mixes easily with water, use before, during or after training.",
    category: "supplement",
    image: glycoloadBottle,
    // Launch pricing: selling at 39.99, regular RRP 44.99. The
    // compare_at_price renders as a struck-through "was" price next to the
    // live price; remove this field to end the launch offer.
    price: 39.99,
    compare_at_price: 44.99,
    benefits: [
      "Fast-digesting carbohydrate source",
      "Helps support muscle glycogen replenishment after exercise",
      "Provides convenient training fuel",
      "Suitable before, during or after training",
      "Easy to mix with water or your favourite sports drink",
      "Easy way to increase daily carbohydrate intake",
    ],
    ingredients: ["Maltodextrin"],
    servings: "1kg pouch",
    size: "1kg · Raspberry Lemonade",
    usage: "Mix the recommended serving with water and shake until fully dissolved. Can be used pre-workout, intra-workout or post-workout. Amount required depends on body weight, training duration and individual carbohydrate needs.",
    sort_order: 5,
  },
  {
    id: "nitroxar",
    inStock: true,
    slug: "nitroxar",
    name: "NITROXAR",
    tagline: "Blood Flow. Endurance. Performance.",
    // `description` is the short intro (also used for SEO / structured data).
    // `long_description` paragraphs and `closing_line` render further down the
    // product page, after the price and Add to Cart button.
    description:
      "NITROXAR™ is a performance formula designed for both men and women to support healthy circulation, endurance, training performance, vitality, and sexual wellbeing.",
    long_description: [
      "With L-Citrulline and Beetroot Extract, the formula supports nitric oxide production and healthy blood flow, helping deliver oxygen and nutrients to working muscles during exercise. This can support stronger muscle pumps, improved vascularity, sustained training performance, and a fuller, more defined look during workouts.",
      "Epimedium Extract has traditionally been used to support vitality, circulation, and sexual wellbeing, while Zinc contributes to normal reproductive health and overall wellbeing.",
      "By supporting circulation and exercise performance, NITROXAR™ is designed to help you train with greater intensity, maintain endurance across demanding sessions, and support efficient recovery between workouts.",
    ],
    closing_line: "PERFORM STRONGER. FEEL STRONGER. EVERYWHERE.",
    category: "supplement",
    image: nitroxarBottle,
    supplement_facts_image: nitroxarFacts,
    price: 79,
    benefits: [
      "Blood Flow",
      "Oxygen & Nutrient Delivery",
      "Muscle Pump",
      "Vascularity",
      "Endurance",
      "Training Performance",
      "Recovery",
      "Vitality",
      "Sexual Wellbeing",
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
    sort_order: 6,
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
    sort_order: 7,
  },
  {
    id: "complete-stack",
    inStock: true,
    slug: "complete-stack",
    name: "The Complete Stack",
    tagline: "Complete Performance System",
    description:
      "EXPLOVEX, KORZIX, CREATINE, GROW and GLYCOLOAD together as a complete performance system. Build. Fuel. Perform.",
    category: "stack",
    image: stackBottle,
    price: 259.99,
    sort_order: 8,
  },
];
