import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { QuantityStepper } from "@/components/QuantityStepper";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Cocoa & Co." },
      {
        name: "description",
        content: "Review your chocolate selection, adjust quantities and complete a simulated checkout.",
      },
      { property: "og:title", content: "Your Cart — Cocoa & Co." },
      { property: "og:description", content: "Review your chocolate selection and check out." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailedLines, subtotal, shipping, total, setQuantity, remove, clear } = useCart();
  const [stage, setStage] = useState<"cart" | "checkout" | "done">("cart");
  const [placing, setPlacing] = useState(false);

  if (stage === "done") {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/25">
          <Check className="h-6 w-6 text-gold-foreground" />
        </div>
        <h1 className="mt-8 font-display text-5xl">Order confirmed</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Thank you. A confirmation would normally arrive by email — this is a demo shop, so no payment was
          taken and nothing will ship.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-block rounded-full bg-cocoa px-8 py-3.5 text-[10px] tracking-luxe text-cream"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (detailedLines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-5xl">Your cart is empty</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Every good evening begins with a bar of something dark.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-block rounded-full bg-cocoa px-8 py-3.5 text-[10px] tracking-luxe text-cream"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-5xl sm:text-6xl">{stage === "cart" ? "Your cart" : "Checkout"}</h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_360px]">
        <section>
          {stage === "cart" ? (
            <>
              {detailedLines.map(({ product, quantity, lineTotal }) => (
                <div key={product.slug} className="flex gap-5 border-b border-border py-6 first:border-t">
                  <Link to="/product/$slug" params={{ slug: product.slug }} className="shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={900}
                      height={900}
                      className="h-28 w-28 rounded-sm object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-wrap justify-between gap-3">
                      <div>
                        <Link
                          to="/product/$slug"
                          params={{ slug: product.slug }}
                          className="font-display text-2xl leading-tight hover:text-gold"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {product.chocolateType} · {product.weight}
                        </p>
                      </div>
                      <span className="font-display text-xl tabular-nums">{formatPrice(lineTotal)}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <QuantityStepper size="sm" value={quantity} onChange={(q) => setQuantity(product.slug, q)} />
                      <button
                        onClick={() => remove(product.slug)}
                        className="text-[10px] tracking-luxe text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clear}
                className="mt-6 text-[10px] tracking-luxe text-muted-foreground hover:text-destructive"
              >
                Empty cart
              </button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPlacing(true);
                setTimeout(() => {
                  clear();
                  setPlacing(false);
                  setStage("done");
                }, 900);
              }}
              className="space-y-8"
            >
              <fieldset>
                <legend className="text-[10px] tracking-luxe text-gold">Delivery details</legend>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="First name" name="first" />
                  <Field label="Last name" name="last" />
                  <Field label="Email" name="email" type="email" className="sm:col-span-2" />
                  <Field label="Address" name="address" className="sm:col-span-2" />
                  <Field label="City" name="city" />
                  <Field label="Postal code" name="zip" />
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-[10px] tracking-luxe text-gold">Payment</legend>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="Card number" name="card" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
                  <Field label="Expiry" name="expiry" placeholder="12 / 29" />
                  <Field label="CVC" name="cvc" placeholder="123" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Simulated checkout — no card details are sent or stored.
                </p>
              </fieldset>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setStage("cart")}
                  className="rounded-full border border-border px-7 py-3.5 text-[10px] tracking-luxe hover:border-gold"
                >
                  Back to cart
                </button>
                <button
                  type="submit"
                  disabled={placing}
                  className="flex-1 rounded-full bg-cocoa px-8 py-3.5 text-[10px] tracking-luxe text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {placing ? "Placing order…" : `Pay ${formatPrice(total)}`}
                </button>
              </div>
            </form>
          )}
        </section>

        <aside className="h-fit rounded-sm border border-border bg-card p-8 lg:sticky lg:top-28">
          <h2 className="text-[10px] tracking-luxe text-muted-foreground">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="tabular-nums">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-4 font-display text-2xl">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
          </div>
          {stage === "cart" && (
            <button
              onClick={() => setStage("checkout")}
              className="mt-8 w-full rounded-full bg-cocoa py-3.5 text-[10px] tracking-luxe text-cream transition-opacity hover:opacity-90"
            >
              Proceed to checkout
            </button>
          )}
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Complimentary shipping over {formatPrice(60)}. Insulated packaging on every order.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-[10px] tracking-luxe text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-sm border border-border bg-background px-4 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
