import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Cocoa & Co. — Antwerp Chocolate Atelier" },
      {
        name: "description",
        content:
          "Questions about an order, corporate gifting or wholesale? Write to the Cocoa & Co. atelier in Antwerp, or visit us on Hoogstraat.",
      },
      { property: "og:title", content: "Contact Cocoa & Co." },
      { property: "og:description", content: "Reach the Cocoa & Co. atelier for orders, gifting and wholesale." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="text-[10px] tracking-luxe text-gold">Contact</p>
          <h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">Write to the atelier</h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Orders, corporate gifting, wholesale or simply a question about a bar — we answer every message
            within two working days.
          </p>

          <dl className="mt-12 space-y-8 text-sm">
            <div>
              <dt className="text-[10px] tracking-luxe text-muted-foreground">Atelier &amp; shop</dt>
              <dd className="mt-2 leading-relaxed">
                Hoogstraat 14
                <br />
                2000 Antwerp, Belgium
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-luxe text-muted-foreground">Opening hours</dt>
              <dd className="mt-2 leading-relaxed">
                Tuesday to Saturday, 10:00 – 18:00
                <br />
                Sunday &amp; Monday, closed
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-luxe text-muted-foreground">Email</dt>
              <dd className="mt-2">hello@cocoaandco.example</dd>
            </div>
          </dl>
          <p className="mt-10 text-xs text-muted-foreground">
            These details are placeholders for the demo — send me your real address, hours and email and I
            will put them in.
          </p>
        </div>

        <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <h2 className="font-display text-3xl">Thank you</h2>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Your message has been noted. This is a demo form, so nothing was actually sent.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 rounded-full border border-border px-6 py-2.5 text-[10px] tracking-luxe hover:border-gold"
              >
                Write another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              <Field label="Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Subject" name="subject" />
              <div>
                <label htmlFor="message" className="text-[10px] tracking-luxe text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-cocoa py-3.5 text-[10px] tracking-luxe text-cream transition-opacity hover:opacity-90"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] tracking-luxe text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 h-11 w-full rounded-sm border border-border bg-background px-4 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
