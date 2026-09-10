import darkBar from "@/assets/product-dark-bar.jpg";
import milkBar from "@/assets/product-milk-bar.jpg";
import whiteBar from "@/assets/product-white-bar.jpg";
import truffleBox from "@/assets/product-truffle-box.jpg";
import drinking from "@/assets/product-drinking.jpg";
import giftBox from "@/assets/product-gift-box.jpg";

export type ChocolateType = "Dark" | "Milk" | "White" | "Ruby";
export type ProductType = "Bars" | "Truffles" | "Drinking" | "Gift Sets";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  chocolateType: ChocolateType;
  productType: ProductType;
  origin: string;
  weight: string;
  notes: string[];
  featured?: boolean;
}

export const chocolateTypes: ChocolateType[] = ["Dark", "Milk", "White", "Ruby"];
export const productTypes: ProductType[] = ["Bars", "Truffles", "Drinking", "Gift Sets"];

export const products: Product[] = [
  {
    slug: "grand-cru-85",
    name: "Grand Cru 85%",
    tagline: "Single origin Madagascar",
    description:
      "A deep, unhurried bar of 85% cacao from the Sambirano Valley. Slowly conched for eighteen hours to draw out red fruit and a long, dry finish.",
    price: 14,
    image: darkBar,
    chocolateType: "Dark",
    productType: "Bars",
    origin: "Madagascar",
    weight: "80 g",
    notes: ["Red currant", "Toasted almond", "Cocoa nib"],
    featured: true,
  },
  {
    slug: "midnight-sea-salt",
    name: "Midnight Sea Salt",
    tagline: "70% dark with Guérande salt",
    description:
      "Our house 70% blend finished with hand-harvested Guérande sea salt. Bittersweet and bright, with a saline sparkle on the close.",
    price: 12,
    image: darkBar,
    chocolateType: "Dark",
    productType: "Bars",
    origin: "Ecuador",
    weight: "80 g",
    notes: ["Sea salt", "Dark plum", "Espresso"],
    featured: true,
  },
  {
    slug: "golden-hazelnut",
    name: "Golden Hazelnut",
    tagline: "Milk chocolate, caramelised nuts",
    description:
      "Silky 41% milk chocolate studded with Piedmont hazelnuts caramelised in raw cane sugar. The bar we cannot keep in the shop.",
    price: 13,
    image: milkBar,
    chocolateType: "Milk",
    productType: "Bars",
    origin: "Piedmont",
    weight: "90 g",
    notes: ["Caramel", "Hazelnut", "Cream"],
    featured: true,
  },
  {
    slug: "velvet-milk-45",
    name: "Velvet Milk 45%",
    tagline: "Slow-conched house milk",
    description:
      "Forty-five percent cacao with Jersey milk, conched until it melts at the touch. Gentle, round and quietly complex.",
    price: 11,
    image: milkBar,
    chocolateType: "Milk",
    productType: "Bars",
    origin: "Peru",
    weight: "80 g",
    notes: ["Malt", "Honey", "Butter"],
  },
  {
    slug: "pistachio-rose",
    name: "Pistachio & Rose",
    tagline: "White chocolate, Damask rose",
    description:
      "Cocoa butter white chocolate scented with Damask rose and scattered with Bronte pistachios. Delicate, floral, faintly wild.",
    price: 15,
    image: whiteBar,
    chocolateType: "White",
    productType: "Bars",
    origin: "Sicily",
    weight: "80 g",
    notes: ["Rose", "Pistachio", "Vanilla"],
    featured: true,
  },
  {
    slug: "ruby-raspberry",
    name: "Ruby & Raspberry",
    tagline: "Naturally pink ruby cacao",
    description:
      "Ruby cacao with freeze-dried raspberry. Tart, fruity and entirely unlike anything else on the shelf.",
    price: 16,
    image: whiteBar,
    chocolateType: "Ruby",
    productType: "Bars",
    origin: "Ivory Coast",
    weight: "80 g",
    notes: ["Raspberry", "Yoghurt", "Citrus"],
  },
  {
    slug: "maison-truffles-12",
    name: "Maison Truffles, 12 pieces",
    tagline: "Dark ganache, hand rolled",
    description:
      "Twelve dark chocolate truffles rolled by hand each morning: bitter orange, single malt, coffee and pure 70% ganache.",
    price: 34,
    image: truffleBox,
    chocolateType: "Dark",
    productType: "Truffles",
    origin: "Atelier, Antwerp",
    weight: "180 g",
    notes: ["Bitter orange", "Single malt", "Coffee"],
    featured: true,
  },
  {
    slug: "champagne-truffles",
    name: "Champagne Truffles",
    tagline: "Milk ganache, brut champagne",
    description:
      "A milk chocolate ganache lifted with brut champagne and dusted in cocoa. Nine pieces in a lacquered gold case.",
    price: 29,
    image: truffleBox,
    chocolateType: "Milk",
    productType: "Truffles",
    origin: "Atelier, Antwerp",
    weight: "135 g",
    notes: ["Champagne", "Cream", "Cocoa dust"],
  },
  {
    slug: "drinking-chocolate-dark",
    name: "Drinking Chocolate, Dark",
    tagline: "Shaved 70% cacao",
    description:
      "Not a powder but shaved chocolate, made to melt into hot milk for a cup thick enough to hold a spoon.",
    price: 22,
    image: drinking,
    chocolateType: "Dark",
    productType: "Drinking",
    origin: "Ecuador",
    weight: "250 g",
    notes: ["Cocoa", "Brown sugar", "Spice"],
  },
  {
    slug: "drinking-chocolate-milk",
    name: "Drinking Chocolate, Milk",
    tagline: "Vanilla and Jersey milk",
    description:
      "A gentler cup: shaved milk chocolate with Madagascan vanilla, for slow winter mornings.",
    price: 20,
    image: drinking,
    chocolateType: "Milk",
    productType: "Drinking",
    origin: "Peru",
    weight: "250 g",
    notes: ["Vanilla", "Milk", "Caramel"],
  },
  {
    slug: "the-collection",
    name: "The Collection",
    tagline: "Six bars, ribboned",
    description:
      "Our six signature bars in a brown board box, finished with a gold ribbon and a handwritten card of your choosing.",
    price: 68,
    image: giftBox,
    chocolateType: "Dark",
    productType: "Gift Sets",
    origin: "Assorted",
    weight: "480 g",
    notes: ["Six bars", "Gold ribbon", "Handwritten card"],
    featured: true,
  },
  {
    slug: "petite-gift-box",
    name: "Petite Gift Box",
    tagline: "Three bars and truffles",
    description:
      "A smaller gesture: three bars and four truffles, boxed and ribboned for sending.",
    price: 42,
    image: giftBox,
    chocolateType: "Milk",
    productType: "Gift Sets",
    origin: "Assorted",
    weight: "300 g",
    notes: ["Three bars", "Four truffles", "Gift wrapped"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);
