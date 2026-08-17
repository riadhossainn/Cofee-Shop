import { FormEvent, useState } from "react";
import { ArrowRightIcon, BeanIcon, CheckIcon, SteamCup } from "./Icons";
import { Reveal } from "./Reveal";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().includes("@")) setSubscribed(true);
  };

  return (
    <footer id="visit" className="bg-espresso border-t border-seam relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(50rem 24rem at 50% 120%, rgba(226,153,58,0.07), transparent 70%)" }}
      />

      {/* newsletter band */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-b border-seam/70">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Reveal>
            <div className="flex items-center gap-3 text-ember">
              <SteamCup className="w-9 h-9" />
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-foam tracking-tight mt-4 leading-tight">
              The Roast Report, <span className="italic text-latte font-medium">every Tuesday.</span>
            </h2>
            <p className="text-latte/80 mt-3 max-w-md leading-relaxed text-[0.92rem]">
              What hit the drum, what scored highest on the cupping table, and first dibs on micro-lots before
              they reach the shelf. One email a week, no froth.
            </p>
          </Reveal>
          <Reveal delay={150}>
            {subscribed ? (
              <div className="flex items-center gap-4 bg-roast border border-sage/40 rounded-xl p-5 fade-in">
                <span className="w-11 h-11 shrink-0 rounded-full bg-sage/20 border border-sage/50 text-sage grid place-items-center">
                  <CheckIcon className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-display font-semibold text-foam text-lg">You're on the list.</p>
                  <p className="text-latte/80 text-sm mt-0.5">First Roast Report lands Tuesday, 6 a.m. sharp.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@morningperson.com"
                  className="field flex-1 !rounded-full !py-3.5 !px-5"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="btn-ember px-7 py-3.5 text-sm shrink-0">
                  Subscribe <ArrowRightIcon className="w-4 h-4" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      {/* main footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <a href="#top" className="flex items-center gap-2.5 group w-fit">
            <span className="w-10 h-10 rounded-full bg-ember text-espresso grid place-items-center transition-transform duration-300 group-hover:rotate-[25deg]">
              <BeanIcon className="w-5.5 h-5.5" />
            </span>
            <span className="leading-none">
              <span className="font-display font-semibold text-2xl tracking-tight text-foam block">Emberline</span>
              <span className="text-[0.62rem] uppercase tracking-[0.32em] text-chaff">Roasting Co.</span>
            </span>
          </a>
          <p className="text-latte/75 text-sm leading-relaxed mt-5 max-w-sm">
            A two-drum roastery on SE Ankeny Street, Portland. Roasting since 2019, cupping every batch,
            and shipping coffee the week it's roasted.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[0.7rem] font-extrabold uppercase tracking-[0.26em] text-chaff">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold text-latte">
            <li><a href="#shelf" className="hover:text-ember transition-colors">Single origins</a></li>
            <li><a href="#shelf" className="hover:text-ember transition-colors">Espresso blends</a></li>
            <li><a href="#shelf" className="hover:text-ember transition-colors">Decaf that earns it</a></li>
            <li><a href="#craft" className="hover:text-ember transition-colors">How we roast</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-[0.7rem] font-extrabold uppercase tracking-[0.26em] text-chaff">The roastery</h4>
          <address className="not-italic mt-4 text-sm text-latte leading-relaxed">
            214 SE Ankeny Street<br />Portland, OR 97214
          </address>
          <p className="text-sm text-latte mt-3 leading-relaxed">
            <span className="text-foam font-bold">Brew bar</span> — Thu–Sun, 8:00–15:00<br />
            <span className="text-foam font-bold">Public cuppings</span> — Wed, 10:00
          </p>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="relative overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <p className="font-display font-semibold text-foam/[0.05] text-[clamp(4rem,16vw,15rem)] leading-[0.8] tracking-tight text-center translate-y-[18%] whitespace-nowrap">
          Emberline
        </p>
      </div>

      <div className="relative border-t border-seam/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.74rem] text-chaff font-bold">
          <p>© 2026 Emberline Roasting Co. All beans reserved.</p>
          <p className="flex items-center gap-2">
            <BeanIcon className="w-3.5 h-3.5 text-ember" />
            Made with patience, and slightly too much caffeine.
          </p>
        </div>
      </div>
    </footer>
  );
}
