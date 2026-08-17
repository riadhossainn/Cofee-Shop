import { useCallback, useEffect, useRef, useState } from "react";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Craft from "./components/Craft";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { ArrowRightIcon, CheckIcon } from "./components/Icons";
import ProductModal from "./components/ProductModal";
import Shop from "./components/Shop";
import { CartLine, Grind, Product } from "./data/products";

interface Toast {
  id: number;
  title: string;
  sub: string;
}

let toastId = 0;

export default function App() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  const pushToast = useCallback((title: string, sub: string) => {
    const id = ++toastId;
    setToasts((t) => [...t.slice(-2), { id, title, sub }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback(
    (product: Product, grind: Grind, qty: number) => {
      const key = `${product.id}:${grind}`;
      setCart((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(12, l.qty + qty) } : l));
        }
        return [...prev, { key, productId: product.id, grind, qty }];
      });
      pushToast(`${product.name} × ${qty}`, `${grind} · added to cart`);
    },
    [pushToast]
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(12, qty) } : l))
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setCart((prev) => prev.filter((l) => l.key !== key));
  }, []);

  // when a search begins, bring the shelf into view
  const prevQuery = useRef("");
  useEffect(() => {
    const wasEmpty = prevQuery.current.trim() === "";
    prevQuery.current = query;
    if (wasEmpty && query.trim() !== "") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("shelf")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  }, [query]);

  // lock body scroll while any overlay is open
  useEffect(() => {
    const locked = cartOpen || checkoutOpen || !!selected;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, checkoutOpen, selected]);

  return (
    <div className="min-h-screen font-body">
      <Header cartCount={cartCount} query={query} onQuery={setQuery} onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Shop
          query={query}
          onClearQuery={() => setQuery("")}
          onQuickAdd={(p) => addToCart(p, "Whole bean", 1)}
          onOpen={setSelected}
        />
        <Craft />
      </main>

      <Footer />

      {/* overlays */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />
      )}

      <CartDrawer
        open={cartOpen}
        lines={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {checkoutOpen && (
        <CheckoutModal
          lines={cart}
          onClose={() => setCheckoutOpen(false)}
          onComplete={() => setCart([])}
        />
      )}

      {/* toasts */}
      <div className="fixed bottom-5 left-5 z-[70] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-in pointer-events-auto flex items-center gap-3.5 bg-roast/95 backdrop-blur border border-seam border-l-2 border-l-ember rounded-lg pl-4 pr-3 py-3 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.85)] max-w-xs"
          >
            <span className="w-8 h-8 shrink-0 rounded-full bg-ember/15 border border-ember/40 text-ember grid place-items-center">
              <CheckIcon className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.82rem] font-extrabold text-foam truncate">{t.title}</p>
              <p className="text-[0.72rem] text-chaff font-bold truncate">{t.sub}</p>
            </div>
            <button
              onClick={() => {
                setToasts((ts) => ts.filter((x) => x.id !== t.id));
                setCartOpen(true);
              }}
              className="ml-1 w-7 h-7 shrink-0 grid place-items-center rounded-full text-latte hover:text-ember hover:bg-bark transition-colors"
              aria-label="Open cart"
            >
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
