import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cocoa & Co. — Premium Small-Batch Chocolate" },
      {
        name: "description",
        content:
          "Single-origin bars, hand-rolled truffles and gift sets from the Cocoa & Co. atelier in Antwerp. Slow-conched, direct-trade cacao since 2009.",
      },
      { property: "og:title", content: "Cocoa & Co. — Premium Small-Batch Chocolate" },
      {
        property: "og:description",
        content: "Single-origin bars, hand-rolled truffles and gift sets, made in small batches in Antwerp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div>
      <section className="relative">
        <img
          src={hero}
          alt="Dark chocolate bars with gold leaf arranged on cream linen with cacao pods"
          width={1600}
          height={1104}
          className="h-[78vh] min-h-[460px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa/75 via-cocoa/35 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="max-w-xl text-cream">
              <p className="text-[10px] tracking-luxe text-gold">Antwerp · Est. 2009</p>
              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-cream sm:text-7xl">
                A richer kind of silence
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/80">
                Slow-conched, single-origin chocolate made in batches of forty kilos and wrapped by hand.
                Three ingredients, eleven farms, no shortcuts.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="rounded-full bg-cream px-8 py-3.5 text-[10px] tracking-luxe text-cocoa transition-opacity hover:opacity-90"
                >
                  Shop the range
                </Link>
                <Link
                  to="/about"
                  className="rounded-full border border-cream/40 px-8 py-3.5 text-[10px] tracking-luxe text-cream transition-colors hover:bg-cream/10"
                >
                  Our story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 text-center sm:px-8 md:grid-cols-3">
        {[
          { title: "Direct-trade cacao", body: "Eleven farms, visited every harvest, paid a season ahead." },
          { title: "Made by hand", body: "Tempered, cut and wrapped in our Hoogstraat atelier." },
          { title: "Sent beautifully", body: "Insulated, recyclable boxes. Free shipping over $60." },
        ].map((item) => (
          <div key={item.title}>
            <div className="mx-auto h-px w-16 gold-rule" />
            <h2 className="mt-6 font-display text-2xl">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-[10px] tracking-luxe text-gold">Selected</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">The house favourites</h2>
          </div>
          <Link to="/shop" className="text-[10px] tracking-luxe text-muted-foreground hover:text-foreground">
            View all chocolate →
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-0 overflow-hidden rounded-sm bg-cocoa text-cream md:grid-cols-2">
          <div className="p-10 sm:p-16">
            <p className="text-[10px] tracking-luxe text-gold">Gifting</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
              Six bars, one gold ribbon
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              The Collection brings together our six signature bars in a board box with a handwritten card —
              the simplest way to give something considered.
            </p>
            <Link
              to="/product/$slug"
              params={{ slug: "the-collection" }}
              className="mt-9 inline-block rounded-full border border-cream/35 px-8 py-3.5 text-[10px] tracking-luxe transition-colors hover:bg-cream hover:text-cocoa"
            >
              See The Collection
            </Link>
          </div>
          <img
            src={products.find((p) => p.slug === "the-collection")!.image}
            alt="The Collection gift box tied with a gold ribbon"
            loading="lazy"
            width={900}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
