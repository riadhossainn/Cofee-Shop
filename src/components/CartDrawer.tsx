import { useEffect } from "react";
import {
  FREE_SHIPPING_AT,
  CartLine,
  money,
  productById,
} from "../data/products";
import { ArrowRightIcon, BagIcon, CloseIcon, TrashIcon, TruckIcon } from "./Icons";

interface Props {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onUpdateQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, lines, onClose, onUpdateQty, onRemove, onCheckout }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const subtotal = lines.reduce((s, l) => s + productById(l.productId).price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-espresso/80 backdrop-blur-sm transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-roast border-l border-seam flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-seam">
          <div className="flex items-center gap-3">
            <BagIcon className="w-5 h-5 text-ember" />
            <h2 className="font-display font-semibold text-xl text-foam">
              Your cart {count > 0 && <span className="text-latte font-body text-sm font-bold">· {count} {count === 1 ? "bag" : "bags"}</span>}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 grid place-items-center rounded-full border border-seam text-latte hover:text-ember hover:border-ember transition-colors"
            aria-label="Close cart"
          >
            <CloseIcon className="w-4.5 h-4.5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex-1 grid place-items-center px-8 text-center">
            <div>
              <div className="w-20 h-20 mx-auto rounded-full bg-bark border border-seam grid place-items-center text-chaff">
                <BagIcon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foam mt-6">Nothing brewing yet</h3>
              <p className="text-latte/80 text-sm mt-2 leading-relaxed">
                Your cart is empty. The shelf, however, is full of things roasted four days ago.
              </p>
              <button onClick={onClose} className="btn-ember px-6 py-3 text-sm mt-7">
                Browse the shelf <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* free shipping progress */}
            <div className="px-6 py-4 border-b border-seam bg-bark/40">
              <div className="flex items-center gap-2.5 text-[0.78rem] font-bold">
                <TruckIcon className="w-4.5 h-4.5 text-ember shrink-0" />
                {remaining > 0 ? (
                  <span className="text-latte">
                    Add <span className="text-ember">{money(remaining)}</span> more for free shipping
                  </span>
                ) : (
                  <span className="text-sage">Free shipping unlocked — nice.</span>
                )}
              </div>
              <div className="mt-2.5 h-1.5 rounded-full bg-seam overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ember-deep to-ember transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* lines */}
            <ul className="flex-1 overflow-y-auto nice-scroll divide-y divide-seam/70">
              {lines.map((line) => {
                const p = productById(line.productId);
                return (
                  <li key={line.key} className="flex gap-4 px-6 py-5 fade-in">
                    <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-seam bg-bark">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display font-semibold text-foam leading-tight">{p.name}</p>
                          <p className="text-[0.72rem] text-chaff mt-0.5">
                            {line.grind} · {p.weight} · {money(p.price)} each
                          </p>
                        </div>
                        <button
                          onClick={() => onRemove(line.key)}
                          className="text-chaff hover:text-copper transition-colors shrink-0 mt-0.5"
                          aria-label={`Remove ${p.name}`}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-seam rounded-full overflow-hidden">
                          <button
                            onClick={() => onUpdateQty(line.key, line.qty - 1)}
                            className="w-8 h-8 grid place-items-center text-latte hover:text-ember hover:bg-bark transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm font-extrabold text-foam tabular-nums">{line.qty}</span>
                          <button
                            onClick={() => onUpdateQty(line.key, line.qty + 1)}
                            className="w-8 h-8 grid place-items-center text-latte hover:text-ember hover:bg-bark transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-display font-semibold text-foam tabular-nums">{money(p.price * line.qty)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* footer */}
            <footer className="border-t border-seam px-6 py-5 bg-bark/40">
              <div className="flex items-center justify-between">
                <span className="text-sm text-latte font-bold">Subtotal</span>
                <span className="font-display font-semibold text-2xl text-foam tabular-nums">{money(subtotal)}</span>
              </div>
              <p className="text-[0.72rem] text-chaff mt-1">
                {remaining > 0 ? `Shipping calculated at checkout — flat ${money(6.5)} under ${money(FREE_SHIPPING_AT)}.` : "Shipping is on us."}
              </p>
              <button onClick={onCheckout} className="btn-ember w-full py-4 text-sm mt-4">
                Checkout <ArrowRightIcon className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="w-full text-center text-[0.78rem] font-bold text-chaff hover:text-ember transition-colors mt-3.5">
                Keep browsing the shelf
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
