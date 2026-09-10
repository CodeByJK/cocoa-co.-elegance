import { createFileRoute, Link } from "@tanstack/react-router";
import workshop from "@/assets/about-workshop.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Cocoa & Co. — Small-Batch Chocolatier" },
      {
        name: "description",
        content:
          "Cocoa & Co. has made small-batch chocolate in Antwerp since 2009: direct-trade cacao, slow conching, and nothing that does not belong.",
      },
      { property: "og:title", content: "About Cocoa & Co. — Small-Batch Chocolatier" },
      {
        property: "og:description",
        content: "Direct-trade cacao, slow conching and hand-wrapped bars from our Antwerp atelier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Direct trade",
    body: "We buy cacao from eleven farms and cooperatives we visit each harvest, at prices agreed a season ahead.",
  },
  {
    title: "Slow conching",
    body: "Every batch is conched between twelve and thirty hours. It is the least efficient thing we do, and the most important.",
  },
  {
    title: "Three ingredients",
    body: "Cacao, cane sugar, cocoa butter. Milk when the bar calls for it. Nothing else, ever.",
  },
];

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
        <p className="text-[10px] tracking-luxe text-gold">Since 2009</p>
        <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">
          A small atelier on Hoogstraat, and a great deal of patience
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Cocoa &amp; Co. began when Elin Marchand left a pastry kitchen with a second-hand melanger and a
          sack of Madagascan cacao. Seventeen years later we still make everything in the same room, in
          batches of no more than forty kilos.
        </p>
      </section>

      <img
        src={workshop}
        alt="A chocolatier tempering chocolate on a marble slab in the Cocoa & Co. atelier"
        loading="lazy"
        width={1400}
        height={900}
        className="mx-auto aspect-[16/9] w-full max-w-6xl object-cover sm:rounded-sm"
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title}>
            <div className="h-px w-16 gold-rule" />
            <h2 className="mt-6 font-display text-2xl">{value.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
          </div>
        ))}
      </section>

      <section className="bg-cocoa text-cream">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <p className="font-display text-3xl leading-relaxed sm:text-4xl">
            &ldquo;Chocolate should taste of the place it came from. Everything we do in the atelier is in
            service of not getting in the way.&rdquo;
          </p>
          <p className="mt-8 text-[10px] tracking-luxe text-gold">Elin Marchand, founder</p>
          <Link
            to="/shop"
            className="mt-10 inline-block rounded-full border border-cream/30 px-8 py-3.5 text-[10px] tracking-luxe transition-colors hover:bg-cream hover:text-cocoa"
          >
            Taste the range
          </Link>
        </div>
      </section>
    </div>
  );
}
