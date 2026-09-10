import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-cocoa text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl text-cream">Cocoa &amp; Co.</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
            Small-batch chocolate made in our Antwerp atelier since 2009. Single-origin cacao,
            slow conching, and nothing that does not belong.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-luxe text-gold">Shop</p>
          <ul className="mt-5 space-y-3 text-sm text-cream/70">
            <li><Link to="/shop" className="hover:text-cream">All chocolate</Link></li>
            <li><Link to="/shop" className="hover:text-cream">Gift sets</Link></li>
            <li><Link to="/cart" className="hover:text-cream">Your cart</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-luxe text-gold">Maison</p>
          <ul className="mt-5 space-y-3 text-sm text-cream/70">
            <li><Link to="/about" className="hover:text-cream">About us</Link></li>
            <li><Link to="/contact" className="hover:text-cream">Contact</Link></li>
            <li className="text-cream/45">Hoogstraat 14, Antwerp</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-[11px] text-cream/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Cocoa &amp; Co. All rights reserved.</span>
          <span>Demo shop — checkout is simulated, no payment is taken.</span>
        </div>
      </div>
    </footer>
  );
}
