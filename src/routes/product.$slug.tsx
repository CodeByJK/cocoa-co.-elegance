import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { formatPrice, getProduct, products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { QuantityStepper } from "@/components/QuantityStepper";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Cocoa & Co." }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — Cocoa & Co.`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description.slice(0, 155) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl">We can't find that chocolate</h1>
      <p className="mt-3 text-sm text-muted-foreground">It may have sold out or been renamed.</p>
      <Link to="/shop" className="mt-8 inline-block rounded-full bg-cocoa px-7 py-3 text-[10px] tracking-luxe text-cream">
        Back to shop
      </Link>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);

  const related = products
    .filter((p) => p.slug !== product.slug && (p.chocolateType === product.chocolateType || p.productType === product.productType))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] tracking-luxe text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Back to shop
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <img
          src={product.image}
          alt={product.name}
          width={900}
          height={900}
          className="aspect-square w-full rounded-sm object-cover"
        />

        <div className="lg:py-6">
          <p className="text-[10px] tracking-luxe text-gold">
            {product.chocolateType} · {product.productType}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{product.tagline}</p>
          <p className="mt-6 font-display text-3xl">{formatPrice(product.price)}</p>

          <p className="mt-8 max-w-prose text-sm leading-relaxed text-foreground/80">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-y border-border py-6 text-sm">
            <dt className="text-[10px] tracking-luxe text-muted-foreground">Origin</dt>
            <dd>{product.origin}</dd>
            <dt className="text-[10px] tracking-luxe text-muted-foreground">Weight</dt>
            <dd>{product.weight}</dd>
            <dt className="text-[10px] tracking-luxe text-muted-foreground">Tasting notes</dt>
            <dd>{product.notes.join(", ")}</dd>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper value={quantity} onChange={(q) => setQuantity(Math.max(1, Math.min(q, 99)))} />
            <button
              onClick={() => add(product.slug, quantity)}
              className="flex-1 rounded-full bg-cocoa px-8 py-3.5 text-[10px] tracking-luxe text-cream transition-opacity hover:opacity-90"
            >
              Add to cart — {formatPrice(product.price * quantity)}
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Complimentary shipping on orders over {formatPrice(60)}. Packed in insulated, recyclable boxes.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="font-display text-3xl">You may also like</h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
