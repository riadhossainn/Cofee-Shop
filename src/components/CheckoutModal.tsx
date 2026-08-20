import { FormEvent, useEffect, useState } from "react";
import {
  FLAT_SHIPPING,
  FREE_SHIPPING_AT,
  CartLine,
  money,
  productById,
} from "../data/products";
import {
  ArrowRightIcon,
  BeanIcon,
  CardIcon,
  CheckIcon,
  CloseIcon,
  LockIcon,
  SpinnerIcon,
  TruckIcon,
} from "./Icons";

type Step = "details" | "payment" | "processing" | "success";

interface Props {
  lines: CartLine[];
  onClose: () => void;
  onComplete: () => void; // clears the cart
}

type Details = {
  email: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
};

type Payment = {
  card: string;
  expiry: string;
  cvc: string;
};

const rotatingMsgs = [
  "Confirming with the roaster…",
  "Stamping roast dates…",
  "Warming the drum…",
  "Packing your beans…",
];

export default function CheckoutModal({ lines, onClose, onComplete }: Props) {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<Details>({
    email: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });
  const [payment, setPayment] = useState<Payment>({ card: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [snapshot, setSnapshot] = useState<CartLine[]>(lines);
  const [orderNo, setOrderNo] = useState("");
  const [eta, setEta] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);

  const subtotal = snapshot.reduce((s, l) => s + productById(l.productId).price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_AT ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  useEffect(() => {
    if (step !== "processing") return;
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % rotatingMsgs.length), 700);
    return () => clearInterval(t);
  }, [step]);

  const validate = (fields: string[], values: Record<string, string>) => {
    const next: Record<string, boolean> = {};
    fields.forEach((f) => {
      next[f] = !values[f] || values[f].trim().length === 0;
    });
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const submitDetails = (e: FormEvent) => {
    e.preventDefault();
    if (!validate(["email", "name", "address", "city", "zip"], details)) return;
    setStep("payment");
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const submitPayment = (e: FormEvent) => {
    e.preventDefault();
    const cardOk = payment.card.replace(/\s/g, "").length === 16;
    const expOk = /^\d{2}\/\d{2}$/.test(payment.expiry);
    const cvcOk = payment.cvc.length >= 3;
    setErrors({ card: !cardOk, expiry: !expOk, cvc: !cvcOk });
    if (!cardOk || !expOk || !cvcOk) return;

    setSnapshot(lines);
    setOrderNo(`EMB-${Math.floor(1000 + Math.random() * 9000)}`);
    const d = new Date();
    d.setDate(d.getDate() + 4);
    setEta(d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }));
    setStep("processing");
    window.setTimeout(() => {
      setStep("success");
      onComplete();
    }, 2200);
  };

  const steps: { id: Step; label: string }[] = [
    { id: "details", label: "Delivery" },
    { id: "payment", label: "Payment" },
    { id: "success", label: "Done" },
  ];
  const stepIndex = step === "processing" ? 1 : steps.findIndex((s) => s.id === step);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        className="absolute inset-0 bg-espresso/85 backdrop-blur-sm fade-in cursor-default"
        onClick={() => step !== "processing" && onClose()}
        aria-label="Close checkout"
      />

      <div className="scale-in relative w-full sm:max-w-3xl max-h-[94vh] overflow-y-auto nice-scroll bg-roast border border-seam sm:rounded-2xl rounded-t-2xl shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)]">
        {/* header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-5 border-b border-seam bg-roast/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <LockIcon className="w-4.5 h-4.5 text-ember" />
            <h2 className="font-display font-semibold text-xl text-foam">
              {step === "success" ? "Order confirmed" : "Checkout"}
            </h2>
          </div>
          {step !== "processing" && (
            <button
              onClick={onClose}
              className="w-10 h-10 grid place-items-center rounded-full border border-seam text-latte hover:text-ember hover:border-ember transition-colors"
              aria-label="Close checkout"
            >
              <CloseIcon className="w-4.5 h-4.5" />
            </button>
          )}
        </header>

        {/* step indicator */}
        {step !== "success" && step !== "processing" && (
          <div className="flex items-center gap-2 px-6 md:px-8 pt-5">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1 last:flex-none">
                <span
                  className={`flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] ${
                    i <= stepIndex ? "text-ember" : "text-chaff"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full grid place-items-center text-[0.68rem] border transition-colors ${
                      i < stepIndex
                        ? "bg-ember border-ember text-espresso"
                        : i === stepIndex
                          ? "border-ember text-ember"
                          : "border-seam text-chaff"
                    }`}
                  >
                    {i < stepIndex ? <CheckIcon className="w-3 h-3" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
                {i < steps.length - 1 && <span className={`h-px flex-1 ${i < stepIndex ? "bg-ember" : "bg-seam"}`} />}
              </div>
            ))}
          </div>
        )}

        {/* body */}
        <div className="p-6 md:p-8">
          {(step === "details" || step === "payment") && (
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                {step === "details" ? (
                  <form onSubmit={submitDetails} noValidate>
                    <h3 className="font-display font-semibold text-2xl text-foam">Where are the beans headed?</h3>
                    <div className="grid grid-cols-2 gap-3.5 mt-5">
                      <div className="col-span-2">
                        <input
                          className={`field ${errors.email ? "field-error" : ""}`}
                          placeholder="Email address"
                          type="email"
                          value={details.email}
                          onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          className={`field ${errors.name ? "field-error" : ""}`}
                          placeholder="Full name"
                          value={details.name}
                          onChange={(e) => setDetails({ ...details, name: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          className={`field ${errors.address ? "field-error" : ""}`}
                          placeholder="Street address"
                          value={details.address}
                          onChange={(e) => setDetails({ ...details, address: e.target.value })}
                        />
                      </div>
                      <input
                        className={`field ${errors.city ? "field-error" : ""}`}
                        placeholder="City"
                        value={details.city}
                        onChange={(e) => setDetails({ ...details, city: e.target.value })}
                      />
                      <input
                        className={`field ${errors.zip ? "field-error" : ""}`}
                        placeholder="ZIP / Postcode"
                        value={details.zip}
                        onChange={(e) => setDetails({ ...details, zip: e.target.value })}
                      />
                      <div className="col-span-2 relative">
                        <select
                          className="field appearance-none cursor-pointer"
                          value={details.country}
                          onChange={(e) => setDetails({ ...details, country: e.target.value })}
                        >
                          {["United States", "Canada", "United Kingdom", "Germany", "Australia", "Japan"].map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {Object.values(errors).some(Boolean) && (
                      <p className="text-copper text-[0.78rem] font-bold mt-3">Please fill in the highlighted fields.</p>
                    )}
                    <button type="submit" className="btn-ember w-full py-4 text-sm mt-6">
                      Continue to payment <ArrowRightIcon className="w-4 h-4" />
                    </button>
                    <p className="text-[0.72rem] text-chaff mt-3 text-center">
                      This is a simulated checkout — no real order or charge happens.
                    </p>
                  </form>
                ) : (
                  <form onSubmit={submitPayment} noValidate>
                    <h3 className="font-display font-semibold text-2xl text-foam">Payment</h3>
                    <p className="text-latte/80 text-sm mt-1.5">
                      Shipping to <span className="text-foam font-bold">{details.city || "your city"}</span> — use any test numbers, e.g. 4242 4242 4242 4242.
                    </p>
                    <div className="grid grid-cols-2 gap-3.5 mt-5">
                      <div className="col-span-2 relative">
                        <CardIcon className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-chaff" />
                        <input
                          className={`field !pl-11 tabular-nums ${errors.card ? "field-error" : ""}`}
                          placeholder="Card number"
                          inputMode="numeric"
                          value={payment.card}
                          onChange={(e) => setPayment({ ...payment, card: formatCard(e.target.value) })}
                        />
                      </div>
                      <input
                        className={`field tabular-nums ${errors.expiry ? "field-error" : ""}`}
                        placeholder="MM/YY"
                        inputMode="numeric"
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                      />
                      <input
                        className={`field tabular-nums ${errors.cvc ? "field-error" : ""}`}
                        placeholder="CVC"
                        inputMode="numeric"
                        maxLength={4}
                        value={payment.cvc}
                        onChange={(e) => setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, "") })}
                      />
                    </div>
                    {Object.values(errors).some(Boolean) && (
                      <p className="text-copper text-[0.78rem] font-bold mt-3">Check the highlighted payment fields.</p>
                    )}
                    <div className="flex gap-3 mt-6">
                      <button type="button" onClick={() => setStep("details")} className="btn-ghost px-5 py-3.5 text-sm shrink-0">
                        Back
                      </button>
                      <button type="submit" className="btn-ember flex-1 py-3.5 text-sm">
                        <LockIcon className="w-4 h-4" /> Pay {money(total)}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* order summary */}
              <aside className="md:col-span-2 bg-bark/60 border border-seam rounded-xl p-5 h-fit">
                <h4 className="text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-chaff">Order summary</h4>
                <ul className="mt-4 space-y-3.5">
                  {lines.map((l) => {
                    const p = productById(l.productId);
                    return (
                      <li key={l.key} className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-md overflow-hidden border border-seam shrink-0">
                          <img src={p.image} alt="" className="w-full h-full object-cover" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[0.82rem] font-bold text-foam truncate">{p.name}</span>
                          <span className="block text-[0.68rem] text-chaff">{l.qty} × {l.grind}</span>
                        </span>
                        <span className="text-[0.82rem] font-bold text-latte tabular-nums">{money(p.price * l.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-seam mt-4 pt-4 space-y-2 text-[0.82rem]">
                  <div className="flex justify-between text-latte">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-latte">
                    <span className="flex items-center gap-1.5">
                      <TruckIcon className="w-3.5 h-3.5" /> Shipping
                    </span>
                    <span className={`tabular-nums ${shipping === 0 ? "text-sage font-bold" : ""}`}>
                      {shipping === 0 ? "Free" : money(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-seam">
                    <span className="font-bold text-foam">Total</span>
                    <span className="font-display font-semibold text-xl text-ember tabular-nums">{money(total)}</span>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {step === "processing" && (
            <div className="py-16 text-center fade-in">
              <div className="relative w-20 h-20 mx-auto">
                <SpinnerIcon className="w-20 h-20 text-ember" />
                <BeanIcon className="w-7 h-7 absolute inset-0 m-auto text-latte" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-foam mt-7">{rotatingMsgs[msgIdx]}</h3>
              <p className="text-latte/75 text-sm mt-2">Hold on — this is the fun part.</p>
            </div>
          )}

          {step === "success" && (
            <div className="py-8 text-center fade-in">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-sage grid place-items-center">
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="var(--color-sage)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path className="draw-check" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-3xl md:text-4xl text-foam mt-6 tracking-tight">
                The drum is spinning for you.
              </h3>
              <p className="text-latte/85 max-w-md mx-auto mt-3 leading-relaxed">
                Order <span className="text-ember font-extrabold">{orderNo}</span> is confirmed. Your beans will be
                roasted Tuesday and should land by <span className="text-foam font-bold">{eta}</span>. A confirmation
                is on its way to <span className="text-foam font-bold">{details.email || "your inbox"}</span>.
              </p>

              <div className="max-w-sm mx-auto mt-7 bg-bark/60 border border-seam rounded-xl p-5 text-left">
                <ul className="space-y-2">
                  {snapshot.map((l) => {
                    const p = productById(l.productId);
                    return (
                      <li key={l.key} className="flex justify-between text-[0.85rem]">
                        <span className="text-latte">
                          {l.qty} × {p.name} <span className="text-chaff">({l.grind})</span>
                        </span>
                        <span className="text-foam font-bold tabular-nums">{money(p.price * l.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex justify-between border-t border-seam mt-3 pt-3 text-sm">
                  <span className="font-bold text-foam">Total paid</span>
                  <span className="font-display font-semibold text-lg text-ember tabular-nums">{money(total)}</span>
                </div>
              </div>

              <button onClick={onClose} className="btn-ember px-8 py-3.5 text-sm mt-8">
                Back to the shelf <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
