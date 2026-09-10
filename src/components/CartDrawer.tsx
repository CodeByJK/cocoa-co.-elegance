import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect } from "react";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { QuantityStepper } from "@/components/QuantityStepper";

export function CartDrawer() {
  const { isOpen, closeCart, detailedLines, subtotal, shipping, total, setQuantity, remove } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 bg-cocoa/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-[11px] tracking-luxe">Your cart</h2>
          <button onClick={closeCart} aria-label="Close cart" className="rounded-full p-1.5 hover:bg-secondary">
            <X className="h-4 w-4" />
          </button>
        </div>

        {detailedLines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-display text-2xl">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Every good evening begins with a bar of something dark.</p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="rounded-full bg-cocoa px-7 py-3 text-[10px] tracking-luxe text-cream"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {detailedLines.map(({ product, quantity, lineTotal }) => (
                <div key={product.slug} className="flex gap-4 border-b border-border/70 py-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="h-20 w-20 shrink-0 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-3">
                      <Link
                        to="/product/$slug"
                        params={{ slug: product.slug }}
                        onClick={closeCart}
                        className="font-display text-lg leading-tight hover:text-gold"
                      >
                        {product.name}
                      </Link>
                      <span className="text-sm tabular-nums">{formatPrice(lineTotal)}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{product.weight}</p>
                    <div className="mt-3 flex items-center gap-3">
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
            </div>

            <div className="border-t border-border px-6 py-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="tabular-nums">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 font-display text-xl">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                to="/cart"
                onClick={closeCart}
                className="mt-5 block rounded-full bg-cocoa py-3.5 text-center text-[10px] tracking-luxe text-cream transition-opacity hover:opacity-90"
              >
                View cart &amp; checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
