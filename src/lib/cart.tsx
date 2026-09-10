import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export interface CartLine {
  slug: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  detailedLines: Array<{ product: Product; quantity: number; lineTotal: number }>;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cocoa-co-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((slug: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [...prev, { slug, quantity }];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, quantity: Math.min(quantity, 99) } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const detailedLines = lines
      .map((line) => {
        const product = products.find((p) => p.slug === line.slug);
        return product ? { product, quantity: line.quantity, lineTotal: product.price * line.quantity } : null;
      })
      .filter((l): l is { product: Product; quantity: number; lineTotal: number } => l !== null);

    const subtotal = detailedLines.reduce((sum, l) => sum + l.lineTotal, 0);
    const shipping = subtotal === 0 || subtotal >= 60 ? 0 : 6;

    return {
      lines,
      detailedLines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQuantity,
      remove,
      clear: () => setLines([]),
    };
  }, [lines, isOpen, add, setQuantity, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
