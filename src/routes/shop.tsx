import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { chocolateTypes, productTypes, products, formatPrice } from "@/data/products";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  chocolate: fallback(z.string(), "All").default("All"),
  type: fallback(z.string(), "All").default("All"),
  maxPrice: fallback(z.number(), 70).default(70),
  sort: fallback(z.string(), "featured").default("featured"),
});

export const Route = createFileRoute("/shop")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Shop Premium Chocolate — Cocoa & Co." },
      {
        name: "description",
        content:
          "Browse single-origin bars, hand-rolled truffles, drinking chocolate and gift sets. Filter by chocolate type, product and price.",
      },
      { property: "og:title", content: "Shop Premium Chocolate — Cocoa & Co." },
      {
        property: "og:description",
        content: "Single-origin bars, truffles, drinking chocolate and gift sets from our Antwerp atelier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

const MAX_PRICE = 70;

function ShopPage() {
  const { q, chocolate, type, maxPrice, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const update = (patch: Record<string, string | number>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const query = q.trim().toLowerCase();
  let list = products.filter((p) => {
    const matchesQuery =
      query.length === 0 ||
      [p.name, p.tagline, p.description, p.origin, ...p.notes]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesChocolate = chocolate === "All" || p.chocolateType === chocolate;
    const matchesType = type === "All" || p.productType === type;
    const matchesPrice = p.price <= Math.min(Math.max(maxPrice, 10), MAX_PRICE);
    return matchesQuery && matchesChocolate && matchesType && matchesPrice;
  });

  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  else list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  const filtersActive = query !== "" || chocolate !== "All" || type !== "All" || maxPrice < MAX_PRICE;

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <header className="max-w-2xl">
        <p className="text-[10px] tracking-luxe text-gold">The Shop</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl">Everything we make</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Twelve chocolates, made in small batches and wrapped by hand. Filter by cacao, format or price.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search"
              aria-label="Search products"
              className="h-11 w-full rounded-full border border-border bg-card pl-10 pr-3 text-sm outline-none focus:border-gold"
            />
          </div>

          <FilterGroup
            label="Chocolate type"
            options={["All", ...chocolateTypes]}
            value={chocolate}
            onChange={(v) => update({ chocolate: v })}
          />
          <FilterGroup
            label="Product type"
            options={["All", ...productTypes]}
            value={type}
            onChange={(v) => update({ type: v })}
          />

          <div className="mt-8">
            <p className="text-[10px] tracking-luxe text-muted-foreground">Max price</p>
            <input
              type="range"
              min={10}
              max={MAX_PRICE}
              step={2}
              value={Math.min(Math.max(maxPrice, 10), MAX_PRICE)}
              onChange={(e) => update({ maxPrice: Number(e.target.value) })}
              aria-label="Maximum price"
              className="mt-4 w-full accent-[var(--gold)]"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>{formatPrice(10)}</span>
              <span className="text-foreground">Up to {formatPrice(Math.min(Math.max(maxPrice, 10), MAX_PRICE))}</span>
            </div>
          </div>

          {filtersActive && (
            <button
              onClick={() => navigate({ search: { q: "", chocolate: "All", type: "All", maxPrice: MAX_PRICE, sort } })}
              className="mt-8 inline-flex items-center gap-1.5 text-[10px] tracking-luxe text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" /> Clear filters
            </button>
          )}
        </aside>

        <section>
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="text-xs text-muted-foreground">
              {list.length} {list.length === 1 ? "product" : "products"}
            </p>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              Sort
              <select
                value={sort}
                onChange={(e) => update({ sort: e.target.value })}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground outline-none focus:border-gold"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>

          {list.length === 0 ? (
            <p className="py-24 text-center font-display text-2xl text-muted-foreground">
              Nothing matches those filters.
            </p>
          ) : (
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-8">
      <p className="text-[10px] tracking-luxe text-muted-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
              value === option
                ? "border-cocoa bg-cocoa text-cream"
                : "border-border bg-card hover:border-gold"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
