import { useEffect, useState } from "react";
import {
  CATEGORY_LABEL,
  GRINDS,
  Grind,
  Product,
  money,
} from "../data/products";
import {
  BagIcon,
  BeanIcon,
  CheckIcon,
  CloseIcon,
  CupIcon,
  FlameIcon,
  LeafIcon,
  MountainIcon,
  ThermoIcon,
} from "./Icons";

interface Props {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, grind: Grind, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: Props) {
  const [grind, setGrind] = useState<Grind>("Whole bean");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setGrind("Whole bean");
    setQty(1);
    setAdded(false);
  }, [product.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleAdd = () => {
    onAdd(product, grind, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const meta = [
    { icon: <LeafIcon className="w-4 h-4" />, label: "Process", value: product.process },
    { icon: <MountainIcon className="w-4 h-4" />, label: "Elevation", value: product.elevation },
    { icon: <BeanIcon className="w-4 h-4" />, label: "Varietal", value: product.varietal },
    { icon: <ThermoIcon className="w-4 h-4" />, label: "Cup score", value: `${product.score} SCA` },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <button className="absolute inset-0 bg-espresso/80 backdrop-blur-sm fade-in cursor-default" onClick={onClose} aria-label="Close" />

      <div className="scale-in relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto nice-scroll bg-roast border border-seam sm:rounded-2xl rounded-t-2xl shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 grid place-items-center rounded-full bg-espresso/80 backdrop-blur border border-seam text-latte hover:text-ember hover:border-ember transition-colors"
          aria-label="Close details"
        >
          <CloseIcon className="w-4.5 h-4.5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* image side */}
          <div className="relative aspect-square md:aspect-auto md:min-h-[36rem] overflow-hidden bg-bark">
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(75% 75% at 50% 45%, ${product.glow}, transparent 78%)` }}
            />
            <img src={product.image} alt={`${product.name} coffee bag`} className="relative w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] bg-espresso/85 backdrop-blur text-ember border border-seam rounded-full px-2.5 py-1">
                {CATEGORY_LABEL[product.category]}
              </span>
              {product.badge && (
                <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] bg-ember text-espresso rounded-full px-2.5 py-1">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* details side */}
          <div className="p-6 md:p-9">
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.28em] text-ember">
              {product.origin} · {product.region}
            </p>
            <h3 className="font-display font-semibold text-3xl md:text-4xl text-foam mt-2.5 leading-tight tracking-tight">
              {product.name}
            </h3>
            <p className="text-latte/85 leading-relaxed mt-4 text-[0.92rem]">{product.description}</p>

            {/* tasting notes */}
            <div className="mt-5">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-chaff mb-2.5">On the palate</p>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((n) => (
                  <span key={n} className="chip px-3.5 py-1.5 text-[0.78rem] font-bold">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* meta */}
            <div className="grid grid-cols-2 gap-px bg-seam border border-seam rounded-lg overflow-hidden mt-6">
              {meta.map((m) => (
                <div key={m.label} className="bg-bark px-4 py-3 flex items-center gap-3">
                  <span className="text-ember shrink-0">{m.icon}</span>
                  <span>
                    <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-chaff">{m.label}</span>
                    <span className="block text-[0.82rem] font-bold text-foam mt-0.5">{m.value}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* roast level */}
            <div className="flex items-center gap-3 mt-6">
              <FlameIcon className="w-4.5 h-4.5 text-ember" />
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={`h-1.5 w-7 rounded-full transition-colors ${i <= product.roast ? "bg-ember" : "bg-seam"}`} />
                ))}
              </div>
              <span className="text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-latte">{product.roastLabel} roast</span>
            </div>

            {/* grind */}
            <div className="mt-6">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-chaff mb-2.5">Grind — we mill to order</p>
              <div className="flex flex-wrap gap-2">
                {GRINDS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`rounded-full px-4 py-2 text-[0.8rem] font-bold border transition-all duration-200 ${
                      grind === g
                        ? "bg-foam text-espresso border-foam"
                        : "border-seam text-latte hover:border-ember hover:text-ember"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* qty + price + add */}
            <div className="mt-7 pt-6 border-t border-seam flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-seam rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 grid place-items-center text-latte hover:text-ember hover:bg-bark transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-9 text-center font-extrabold text-foam tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(12, q + 1))}
                  className="w-10 h-11 grid place-items-center text-latte hover:text-ember hover:bg-bark transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 min-w-[13rem] py-3.5 rounded-full text-sm font-extrabold transition-all duration-300 ${
                  added
                    ? "bg-sage text-espresso"
                    : "btn-ember"
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckIcon className="w-4 h-4" /> Added to cart
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <BagIcon className="w-4 h-4" />
                    Add {qty} · {money(product.price * qty)}
                  </span>
                )}
              </button>
            </div>

            <div className="mt-5 flex items-start gap-2.5 text-[0.78rem] text-latte/80 leading-relaxed">
              <CupIcon className="w-4.5 h-4.5 text-ember shrink-0 mt-0.5" />
              <p>
                <span className="font-bold text-foam">Brew note — </span>
                {product.brewTip}
              </p>
            </div>

            <p className="mt-4 text-[0.72rem] text-chaff">
              Roasted this Tuesday · {product.weight} bag · roasted date stamped on every label
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
