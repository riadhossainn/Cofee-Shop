export type Category = "single-origin" | "blend" | "decaf";

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  category: Category;
  price: number;
  weight: string;
  notes: string[];
  process: string;
  elevation: string;
  varietal: string;
  roast: 1 | 2 | 3 | 4 | 5;
  roastLabel: string;
  score: number;
  badge?: string;
  description: string;
  brewTip: string;
  image: string;
  glow: string;
}

export const GRINDS = ["Whole bean", "Filter", "Espresso", "French press"] as const;
export type Grind = (typeof GRINDS)[number];

export interface CartLine {
  key: string;
  productId: string;
  grind: Grind;
  qty: number;
}

export const FREE_SHIPPING_AT = 45;
export const FLAT_SHIPPING = 6.5;

export const CATEGORY_LABEL: Record<Category, string> = {
  "single-origin": "Single Origin",
  blend: "Blend",
  decaf: "Decaf",
};

export const money = (n: number) => `$${n.toFixed(2)}`;

export const PRODUCTS: Product[] = [
  {
    id: "chelbesa",
    name: "Ethiopia Chelbesa",
    origin: "Ethiopia",
    region: "Gedeb, Yirgacheffe",
    category: "single-origin",
    price: 21,
    weight: "250 g",
    notes: ["Jasmine", "Apricot", "Bergamot"],
    process: "Washed",
    elevation: "2,100 masl",
    varietal: "Heirloom 74158",
    roast: 2,
    roastLabel: "Light",
    score: 88,
    badge: "New crop",
    description:
      "From 700 smallholder farms around the Chelbesa washing station, this heirloom lot is a study in delicacy — florals up front, a ripe stone-fruit middle, and a long bergamot finish that keeps unfolding as the cup cools.",
    brewTip: "Pour over at 94 °C, 1:16. Let it cool a minute — the apricot shows up as the cup settles.",
    image:
      "https://image.qwenlm.ai/generated-images/adfb38cc-c934-469c-b819-b9dae7bdd02b/_result.png",
    glow: "rgba(226,153,58,0.20)",
  },
  {
    id: "el-paraiso",
    name: "Colombia El Paraíso",
    origin: "Colombia",
    region: "Piendamó, Cauca",
    category: "single-origin",
    price: 23,
    weight: "250 g",
    notes: ["Lychee", "Panela", "Rose"],
    process: "Double fermentation, washed",
    elevation: "1,950 masl",
    varietal: "Pink Bourbon",
    roast: 2,
    roastLabel: "Light",
    score: 89,
    badge: "Micro-lot",
    description:
      "Wilton Benítez pushes fermentation like a perfumer blends — 48 hours, temperature-controlled, then washed clean. The result is uncannily aromatic: lychee and rose water held down by a sweet panela backbone.",
    brewTip: "Great as a concentrated V60 (1:14) over ice — the lychee turns electric when chilled.",
    image:
      "https://image.qwenlm.ai/generated-images/d67cf2ab-a091-4c74-a3cd-f38d1b3a01b0/_result.png",
    glow: "rgba(192,95,44,0.22)",
  },
  {
    id: "gichathaini",
    name: "Kenya Gichathaini AA",
    origin: "Kenya",
    region: "Nyeri County",
    category: "single-origin",
    price: 24,
    weight: "250 g",
    notes: ["Blackcurrant", "Grapefruit", "Demerara"],
    process: "Washed, double fermented",
    elevation: "1,750 masl",
    varietal: "SL28 · SL34",
    roast: 1,
    roastLabel: "Lightest",
    score: 90,
    badge: "Top lot",
    description:
      "A classic Nyeri from the Gichathaini factory, built on red volcanic soil. Juicy and loud — blackcurrant cordial brightness, a grapefruit snap, and raw demerara sweetness underneath. Our highest-scoring cup this season.",
    brewTip: "AeroPress, 1:13, two minutes. This one rewards a shorter, stronger brew.",
    image:
      "https://image.qwenlm.ai/generated-images/23d24ba0-beac-4978-970f-8353bd32ca41/_result.png",
    glow: "rgba(196,64,50,0.20)",
  },
  {
    id: "hearth",
    name: "Hearth Espresso",
    origin: "Brazil + Ethiopia",
    region: "Cerrado · Guji",
    category: "blend",
    price: 19,
    weight: "250 g",
    notes: ["Cocoa nib", "Hazelnut", "Orange zest"],
    process: "Natural + washed",
    elevation: "1,150–1,900 masl",
    varietal: "Mundo Novo · Heirloom",
    roast: 4,
    roastLabel: "Medium-dark",
    score: 86,
    badge: "Best seller",
    description:
      "Our house espresso, built to cut through milk without shouting. A heavy natural Brazil base gives cocoa and hazelnut, while a washed Ethiopian lifts the finish with a flick of orange zest. Syrupy, forgiving, daily.",
    brewTip: "Dial in at 1:2 in 27–30 seconds. Pairs beautifully with oat milk.",
    image:
      "https://image.qwenlm.ai/generated-images/162a4fc3-86be-4a75-8235-c4a2fa1c2429/_result.png",
    glow: "rgba(201,126,34,0.22)",
  },
  {
    id: "night-owl",
    name: "Night Owl Dark",
    origin: "Colombia + Sumatra",
    region: "Huila · Mandheling",
    category: "blend",
    price: 18,
    weight: "250 g",
    notes: ["Molasses", "Toasted pecan", "Dark cherry"],
    process: "Washed + wet-hulled",
    elevation: "1,500–1,600 masl",
    varietal: "Caturra · Ateng",
    roast: 5,
    roastLabel: "Dark",
    score: 85,
    description:
      "For the moka-pot faithful and the midnight finishers. Roasted to the edge of second crack and no further — bittersweet molasses and toasted pecan with a dark-cherry undertow. Never ashy, always chocolatey.",
    brewTip: "Moka pot or French press, 1:12. Add nothing, or a little demerara and cream.",
    image:
      "https://image.qwenlm.ai/generated-images/67467cb0-e31f-4e37-81b7-2d793dac5c8c/_result.png",
    glow: "rgba(90,110,150,0.18)",
  },
  {
    id: "slow-evening",
    name: "Slow Evening Decaf",
    origin: "Colombia",
    region: "Caldas",
    category: "decaf",
    price: 20,
    weight: "250 g",
    notes: ["Caramel", "Almond", "Red apple"],
    process: "Sugarcane E.A. decaf",
    elevation: "1,700 masl",
    varietal: "Castillo · Colombia",
    roast: 3,
    roastLabel: "Medium",
    score: 86,
    badge: "Sweet dreams",
    description:
      "Decaffeinated with sugarcane ethanol from Colombian cane — the gentlest process we know, and it shows. Round caramel and marzipan sweetness with a clean red-apple acidity. Nobody has ever guessed it's decaf.",
    brewTip: "Batch brew or a long filter cup after dinner. Decaf deserves a full dose — 1:15.",
    image:
      "https://image.qwenlm.ai/generated-images/daa98fc9-ad32-47ac-912a-d7015a724821/_result.png",
    glow: "rgba(163,168,127,0.20)",
  },
];

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/8321fcb3-f4e6-41c9-84d3-bd73f3825cfb/_result.png";

export const CRAFT_IMAGE =
  "https://image.qwenlm.ai/generated-images/13201e7f-fc69-4eaf-adcc-118af25a4d8f/_result.png";

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id)!;

export const roastLabelShort = (r: number) =>
  ["Lightest", "Light", "Medium", "Med-dark", "Dark"][r - 1];
