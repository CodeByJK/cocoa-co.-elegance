import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden rounded-sm bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-luxe text-muted-foreground">{product.chocolateType}</p>
          <h3 className="mt-1 font-display text-xl leading-tight">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-gold">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.tagline}</p>
        </div>
        <span className="shrink-0 font-display text-lg">{formatPrice(product.price)}</span>
      </div>
      <button
        onClick={() => add(product.slug)}
        className="mt-4 w-full rounded-full border border-cocoa/25 py-2.5 text-[10px] tracking-luxe transition-colors hover:border-cocoa hover:bg-cocoa hover:text-cream"
      >
        Add to cart
      </button>
    </article>
  );
}
