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
import androzarBottle from "@/assets/products/korzavo-androzar.jpg";
import androzarFacts from "@/assets/products/korzavo-androzar-facts.jpg";
import dominanceStackImage from "@/assets/products/korzavo-dominance-stack.jpg";
import alpha24StackImage from "@/assets/products/korzavo-alpha-24-stack.jpg";
import nightRecovery3Image from "@/assets/products/korzavo-night-recovery-3-bottles.jpg";
import performanceStackImage from "@/assets/products/korzavo-performance-stack.jpg";
import nightRecoveryBottle from "@/assets/products/korzavo-night-recovery.jpg";
import nightRecoveryFacts from "@/assets/products/korzavo-night-recovery-facts.jpg";

// Wide banners used inside the bundle pages.
import dominanceTwoFormulas from "@/assets/bundles/dominance-two-formulas.jpg";
import dominanceIngredients from "@/assets/bundles/dominance-ingredients.jpg";
import bannerAndrozar from "@/assets/bundles/androzar-testosterone-vitality.jpg";
import bannerNitroxar from "@/assets/bundles/nitroxar-nitric-oxide.jpg";
import performanceStackBanner from "@/assets/bundles/performance-stack-banner.jpg";
import bannerNightRecovery from "@/assets/bundles/night-recovery-rest-relax.jpg";

// Ingredient photography used by the "story" sections on product pages.
import androzarEpimedium from "@/assets/ingredients/androzar-epimedium.jpg";
import androzarShilajit from "@/assets/ingredients/androzar-shilajit.jpg";
import androzarPanax from "@/assets/ingredients/androzar-panax-ginseng.jpg";
import androzarTongkat from "@/assets/ingredients/androzar-tongkat-ali.jpg";
import nitroxarCitrulline from "@/assets/ingredients/nitroxar-l-citrulline.jpg";
import nitroxarBeetroot from "@/assets/ingredients/nitroxar-beetroot.jpg";
import nitroxarZinc from "@/assets/ingredients/nitroxar-zinc.jpg";
import nitroxarEpimedium from "@/assets/ingredients/nitroxar-epimedium.jpg";
import nitroxarBlackPepper from "@/assets/ingredients/nitroxar-black-pepper.jpg";
import korzixOyster from "@/assets/ingredients/korzix-oyster.jpg";
import korzixMaca from "@/assets/ingredients/korzix-black-maca.jpg";
import korzixPanax from "@/assets/ingredients/korzix-panax-ginseng.jpg";
import korzixVitamins from "@/assets/ingredients/korzix-daily-vitamins.jpg";
import korzixMinerals from "@/assets/ingredients/korzix-essential-minerals.jpg";

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
    display_name: "KORZIX™",
    tagline: "Premium Daily Performance Multi",
    headline: "Daily nutrition. Everyday ambition.",
    description:
      "For men and women who make wellbeing part of their routine. KORZIX brings together 19 vitamins and minerals with Oyster Extract, Black Maca and Panax Ginseng in one daily formula.",
    meta_description:
      "KORZIX brings together 19 vitamins and minerals with Oyster Extract, Black Maca and Panax Ginseng in one daily formula for men and women.",
    long_description: [
      "Its essential nutrients support normal energy metabolism, immune function and the everyday processes behind muscle and nerve function—while its botanical ingredients bring a tradition of vitality to the blend.",
      "From busy working days to an active lifestyle, give your daily nutrition the attention it deserves.",
    ],
    category: "supplement",
    image: korzixBottle,
    supplement_facts_image: korzixFacts,
    price: 79,
    benefits: [
      "19 vitamins and minerals in one daily formula",
      "Supports normal energy metabolism and immune function",
      "Supports everyday muscle and nerve function",
      "Oyster Extract, Black Maca and Panax Ginseng",
      "For men and women with active lives",
    ],
    ingredients: [
      "19 Vitamins & Minerals (12 vitamins, 7 minerals) — 1 capsule",
      "Oyster Extract — 1000mg",
      "Black Maca Extract (10:1) — 1000mg",
      "Panax Ginseng Extract (20% Ginsenosides) — 300mg",
    ],
    servings: "20 servings",
    size: "6 capsule daily pack · 120 capsules",
    usage: "Take all 6 capsules together once daily, with food.",
    allergen: "Contains oyster, a molluscan shellfish.",
    story: {
      heading: "19 vitamins & minerals. Three distinctive extracts.",
      items: [
        {
          name: "Oyster Extract",
          dose: "1,000 mg per serving",
          image: korzixOyster,
          headline: "A distinctive marine ingredient",
          paragraphs: [
            "Oyster Extract brings a marine origin to KORZIX, complementing its botanical extracts and clearly specified vitamins and minerals.",
            "Each daily serving provides 1,000 mg of Oyster Extract as one of the formula’s three signature ingredients.",
            "Together with Black Maca and Panax Ginseng, it gives KORZIX a distinctive identity beyond a conventional multivitamin.",
          ],
          tags: "Marine origin • Signature ingredient • Daily formula",
          note: "Contains oyster, a molluscan shellfish.",
        },
        {
          name: "Black Maca Extract",
          dose: "1,000 mg per serving | 10:1 Extract",
          image: korzixMaca,
          headline: "A tradition of vitality for men and women",
          paragraphs: [
            "Native to the Peruvian Andes, maca has been used as a food and traditional botanical for generations.",
            "Research on specific maca preparations has explored perceived wellbeing and sexual desire in men and women—bringing an everyday-vitality dimension to the conversation around health.",
            { label: "In the KORZIX formula", text: "Each serving provides 1,000 mg of Black Maca Extract at a 10:1 extraction ratio, complementing the formula’s essential nutrient foundation." },
            "Whether your priorities include daily wellbeing, intimacy or an active routine, maca brings a distinctive botanical heritage to KORZIX.",
          ],
          tags: "Botanical heritage • Vitality research • Everyday wellbeing",
        },
        {
          name: "Panax Ginseng Extract",
          dose: "300 mg per serving | Standardised to 20% Ginsenosides",
          image: korzixPanax,
          headline: "Vitality for life beyond the gym",
          paragraphs: [
            "Panax Ginseng has a long tradition of use for vitality, with human research exploring its potential role in general fatigue and wellbeing.",
            "Its characteristic compounds, called ginsenosides, give this botanical its distinctive identity.",
            { label: "In the KORZIX formula", text: "Each serving provides 300 mg of Panax Ginseng Extract, standardised to 20% ginsenosides." },
            "It complements the vitamin and mineral blend, adding a botanical focus on everyday vitality for men and women with busy, active lives.",
          ],
          tags: "Traditional vitality • General fatigue research • Standardised extract",
        },
        {
          name: "Daily Vitamins",
          dose: "12 Vitamins. A Nutritional Foundation.",
          image: korzixVitamins,
          headline: "Support the processes behind your day",
          paragraphs: [
            "KORZIX combines eight B vitamins with vitamins A, C, D3 and E.",
            "B vitamins contribute to the normal metabolic processes that allow the body to use nutrients from food. Selected vitamins also support normal nerve function and red blood cell formation.",
            "Vitamins A, C and D contribute to normal immune function. Vitamin C supports collagen formation, vitamin D supports normal muscle and bone function, and vitamin E contributes to antioxidant protection.",
            "A nutritional foundation for men and women who value consistent daily care.",
          ],
          tags: "Energy metabolism • Immune function • Daily nutrition",
        },
        {
          name: "Essential Minerals",
          dose: "Seven Minerals. Everyday Roles.",
          image: korzixMinerals,
          headline: "Small nutrients. Essential functions.",
          paragraphs: [
            "Zinc, magnesium, iodine, selenium, copper, manganese and chromium complete the mineral foundation of KORZIX.",
            "Magnesium contributes to normal muscle and nerve function and energy metabolism. Zinc supports normal protein synthesis and immune function.",
            "Iodine contributes to thyroid hormone production, while selenium supports normal thyroid function and antioxidant systems. Copper and manganese participate in essential enzyme processes, and chromium is involved in insulin action and nutrient metabolism.",
            "Together, these minerals help meet nutritional needs that matter both during daily life and an active routine.",
          ],
          tags: "Muscle & nerve function • Nutrient metabolism • Essential nutrition",
        },
      ],
      closing: {
        heading: "KORZIX™ — Make daily wellbeing part of your routine.",
        body: "Essential nutrition and distinctive extracts, brought together for men and women with active lives.",
      },
    },
    guarantee: {
      title: "30-Day Money-Back Guarantee",
      body: "Try KORZIX with confidence. If you’re not satisfied, contact us within 30 days of receiving your order to request a refund.",
      note: "Terms and conditions apply.",
    },
    disclaimer:
      "Individual results vary. Follow the final product label. Contains oyster: do not use if allergic to oysters or molluscan shellfish. If pregnant, breastfeeding, taking medication or managing a medical condition, consult a healthcare professional before use.",
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
    tagline: "Testosterone Complex",
    headline: "Vitality. Drive. Your next challenge.",
    description:
      "Your goals go beyond the gym. Feeling engaged in daily life, making time for intimacy and staying committed to training are all part of the same ambition: taking care of yourself.",
    meta_description:
      "ANDROZAR brings together four distinctive extracts—Epimedium, Tongkat Ali, Shilajit and Panax Ginseng—in a formula created with men’s vitality and an active lifestyle in mind.",
    long_description: [
      "ANDROZAR brings together four distinctive extracts—Epimedium, Tongkat Ali, Shilajit and Panax Ginseng—in a formula created with men’s vitality and an active lifestyle in mind.",
      "For men pursuing strength and muscle, it belongs alongside the essentials: purposeful training, quality nutrition and consistent recovery.",
    ],
    category: "supplement",
    image: androzarBottle,
    supplement_facts_image: androzarFacts,
    price: 79,
    benefits: [
      "Vitality, drive and stamina",
      "Four distinctive extracts with clearly specified content",
      "Created with men’s vitality in mind",
      "Made for an active lifestyle",
    ],
    // Names and doses match the Supplement Facts image.
    ingredients: [
      "Epimedium Extract (10% Icariin) — 1000mg",
      "Tongkat Ali Extract (100:1) — 500mg",
      "Shilajit Extract (10% Fulvic Acid) — 500mg",
      "Panax Ginseng Extract (20% Ginsenosides) — 300mg",
    ],
    servings: "15 servings",
    size: "5 capsules per serving · 75 capsules",
    usage: "Serving size: 5 capsules. Servings per container: 15.",
    story: {
      heading: "Four extracts. A clear purpose.",
      items: [
        {
          name: "Epimedium Extract",
          dose: "1,000 mg per serving | Standardised to 10% Icariin",
          image: androzarEpimedium,
          headline: "A tradition of male vitality",
          paragraphs: [
            "Male wellbeing includes intimacy as well as physical activity.",
            "Epimedium has a long history of traditional use for sexual vitality. Its distinctive plant compound, icariin, makes it a recognisable ingredient in the conversation around men’s wellbeing.",
            "ANDROZAR provides 1,000 mg of Epimedium extract per serving, standardised to 10% icariin—a clearly specified contribution to the formula’s male-vitality focus.",
          ],
          tags: "Traditional use • Male vitality • Defined extract content",
        },
        {
          name: "Shilajit Extract",
          dose: "500 mg per serving | Standardised to 10% Fulvic Acid",
          image: androzarShilajit,
          headline: "Where vitality meets physical performance research",
          paragraphs: [
            "Shilajit brings a distinctive Ayurvedic heritage to the formula.",
            "A naturally occurring mineral-organic substance, purified Shilajit preparations have been investigated for male hormonal wellbeing and the ability to maintain muscular strength during fatiguing exercise.",
            "That research makes Shilajit an interesting connection between the two themes behind ANDROZAR: men’s vitality and the demands of an active lifestyle.",
            "Each serving provides 500 mg of Shilajit extract, standardised to 10% fulvic acid.",
          ],
          tags: "Ayurvedic heritage • Male wellbeing • Muscular fatigue research",
        },
        {
          name: "Panax Ginseng Extract",
          dose: "300 mg per serving | Standardised to 20% Ginsenosides",
          image: androzarPanax,
          headline: "Vitality beyond your workout",
          paragraphs: [
            "An active life involves more than training.",
            "Panax Ginseng has a long tradition of use for vitality, with research exploring general fatigue and aspects of male sexual wellbeing.",
            "It adds an everyday-wellbeing dimension to ANDROZAR, complementing the formula’s focus on men’s vitality.",
            "Each serving provides 300 mg of Panax Ginseng extract, standardised to 20% ginsenosides.",
          ],
          tags: "Traditional vitality • Everyday wellbeing • Defined extract content",
        },
        {
          name: "Tongkat Ali Extract",
          dose: "500 mg per serving | 100:1 Extract",
          image: androzarTongkat,
          headline: "Men’s vitality, with an active mindset",
          paragraphs: [
            "Tongkat Ali brings a Southeast Asian tradition of male vitality to ANDROZAR.",
            "Also known as Eurycoma longifolia, this botanical has attracted human research into testosterone and male wellbeing using specific extracts.",
            "Its place in ANDROZAR reflects a focus on men who care about their wellbeing and take their physical goals seriously—from daily activity to consistent resistance training.",
            "Each serving provides 500 mg of Tongkat Ali extract.",
          ],
          tags: "Male wellbeing • Botanical heritage • Active living",
        },
      ],
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
      "EXPLOVEX, KORZIX, CREATINE, GROW and GLYCOLOAD together as a complete performance system. Build. Fuel. Perform.",
    category: "stack",
    image: stackBottle,
    price: 259.99,
    sort_order: 9,
  },
  {
    id: "dominance-stack",
    inStock: true,
    slug: "dominance-stack",
    name: "DOMINANCE STACK",
    tagline: "NITROXAR™ + ANDROZAR",
    headline: "Two formulas. One focused routine.",
    description:
      "Bring circulation-focused ingredients and traditional vitality botanicals into one thoughtfully selected bundle.",
    long_description: [
      "NITROXAR features L-Citrulline, Beetroot Extract, Epimedium, Zinc and Black Pepper Extract.",
      "ANDROZAR brings together Epimedium, Tongkat Ali, Shilajit and Panax Ginseng.",
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
          wide: true,
          image: dominanceTwoFormulas,
          alt: "Two formulas. One focused routine. NITROXAR plus ANDROZAR.",
        },
        {
          wide: true,
          name: "The Circulation Connection",
          image: dominanceIngredients,
          alt: "L-Citrulline and Beetroot, Tongkat Ali and Shilajit, and Panax Ginseng",
          paragraphs: [
            "Your working muscles rely on blood flow to deliver oxygen and nutrients.",
            "L-Citrulline participates in the body’s arginine and nitric-oxide pathways. Nitric oxide helps blood vessels relax—a connection that makes citrulline an ingredient of interest in sports nutrition.",
            "NITROXAR provides 3,600 mg of L-Citrulline per serving alongside Beetroot Extract and essential zinc.",
          ],
          tags: "Circulation science • Active living • Mineral nutrition",
        },
        {
          wide: true,
          name: "The Vitality Connection",
          paragraphs: [
            "An active routine goes beyond the workout.",
            "ANDROZAR combines Tongkat Ali, Shilajit, Panax Ginseng and Epimedium—ingredients with a history of use in traditional vitality preparations.",
            "Paired with NITROXAR, the bundle offers a broader selection of ingredients for customers interested in both circulation-focused nutrition and botanical vitality.",
            "Build your routine around purposeful training, balanced nutrition and quality sleep.",
          ],
          tags: "Traditional botanicals • Everyday wellbeing • A focused routine",
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
    tagline: "Own your day. Prioritise your night.",
    description:
      "Own your day. Prioritise your night. Choose the NITROXAR, ANDROZAR and NIGHT RECOVERY bundle to bring your daytime goals and evening wind-down into one focused routine.",
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
        { wide: true, name: "ANDROZAR", image: bannerAndrozar, alt: "Testosterone & Men’s Vitality — ANDROZAR", href: "/product/androzar", cta: "View ANDROZAR" },
        { wide: true, name: "NITROXAR", image: bannerNitroxar, alt: "Nitric Oxide & Blood Flow — NITROXAR", href: "/product/nitroxar", cta: "View NITROXAR" },
        { wide: true, name: "NIGHT RECOVERY", image: bannerNightRecovery, alt: "Rest. Relax. Recover. — NIGHT RECOVERY", href: "/product/night-recovery", cta: "View NIGHT RECOVERY" },
      ],
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
    tagline: "EXPLOVEX + CREATINE",
    headline: "Power your next level.",
    description:
      "Support your training goals with a powerful pairing of EXPLOVEX Pre-Workout and Creatine + Electrolytes—in refreshing Raspberry Lemonade.",
    category: "stack",
    image: performanceStackImage,
    price: 94,
    includes: [
      { id: "explovex", quantity: 1 },
      { id: "creatine", quantity: 1 },
    ],
    benefits: [
      "Pump & Performance — Support your muscle pump and get ready for demanding training sessions.",
      "Strength & Power — Support strength and repeated high-intensity performance with consistent daily creatine use.",
      "Hydration Support — Added electrolytes complement your hydration routine during training.",
      "Built for Progress — Pair your stack with consistent training, balanced nutrition, and recovery to work towards your goals.",
    ],
    closing_line: "Two products. One goal. Your next level.",
    story: {
      eyebrow: "Inside the Stack",
      heading: "EXPLOVEX + CREATINE",
      numbered: false,
      items: [
        {
          wide: true,
          image: performanceStackBanner,
          alt: "Power your next level. EXPLOVEX plus CREATINE — the Performance Stack.",
        },
      ],
    },
    sort_order: 10,
  },
];
