import { HERO_IMAGE, PRODUCTS } from "../data/products";
import { ArrowRightIcon, BeanIcon, CupIcon, FlameIcon, RoastStamp, SteamCup, TruckIcon } from "./Icons";
import { CountUp, Reveal } from "./Reveal";

const TICKER = [
  "Roasted every Tuesday",
  "Free shipping over $45",
  "Small 12 kg batches",
  "Ethiopia Chelbesa back in stock",
  "Stamped with its roast date",
  "Six farms we can name",
];

function Ticker() {
  const row = TICKER.map((t, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.22em] whitespace-nowrap">{t}</span>
      <BeanIcon className="w-3.5 h-3.5 opacity-70" />
    </span>
  ));
  return (
    <div className="border-y border-espresso/20 bg-ember text-espresso overflow-hidden py-2.5">
      <div className="marquee-track gap-6" aria-hidden="true">
        <div className="flex gap-6">{row}</div>
        <div className="flex gap-6">{row}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const featured = PRODUCTS[0];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* words */}
          <div className="lg:col-span-7">
            <p className="mask-line">
              <span className="mask-inner flex items-center gap-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.3em] text-ember" style={{ ["--d" as never]: "0.05s" }}>
                <span className="w-8 h-px bg-ember inline-block" />
                Roastery · Portland, OR · Est. 2019
              </span>
            </p>

            <h1 className="font-display font-semibold text-foam leading-[0.98] tracking-tight mt-5 text-[clamp(2.9rem,8.2vw,5.9rem)]">
              <span className="mask-line">
                <span className="mask-inner" style={{ ["--d" as never]: "0.12s" }}>Drink the</span>
              </span>
              <span className="mask-line">
                <span className="mask-inner italic text-ember font-medium" style={{ ["--d" as never]: "0.24s" }}>season,</span>
              </span>
              <span className="mask-line">
                <span className="mask-inner" style={{ ["--d" as never]: "0.36s" }}>not the brand.</span>
              </span>
            </h1>

            <Reveal delay={500} className="mt-6 max-w-lg">
              <p className="text-latte text-base md:text-lg leading-relaxed">
                Six coffees on the shelf at any time — each bought from a farm we can name,
                roasted in 12-kilo batches every Tuesday, and at your door before the
                roast date is a week old.
              </p>
            </Reveal>

            <Reveal delay={620} className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#shelf" className="btn-ember px-7 py-3.5 text-sm">
                Shop the roasts
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a href="#craft" className="btn-ghost px-6 py-3.5 text-sm">
                How we roast
              </a>
            </Reveal>

            <Reveal delay={740} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl border-t border-seam pt-7">
              <div>
                <p className="font-display text-3xl md:text-4xl font-semibold text-foam">
                  <CountUp to={12} suffix=" kg" />
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-chaff mt-1.5 font-bold">Batch size</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-semibold text-foam">
                  <CountUp to={6} />
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-chaff mt-1.5 font-bold">Origins this season</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-semibold text-foam">
                  <CountUp to={48} suffix=" h" />
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-chaff mt-1.5 font-bold">Roast to doorstep</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-semibold text-foam">
                  <CountUp to={86} suffix="+" />
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-chaff mt-1.5 font-bold">SCA cup score</p>
              </div>
            </Reveal>
          </div>

          {/* image composition */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={300} className="relative">
              <div className="relative rounded-t-[10rem] rounded-b-2xl overflow-hidden border border-seam shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <img
                  src={HERO_IMAGE}
                  alt="Pour-over coffee brewing in the Emberline brew bar"
                  className="kenburns w-full h-[26rem] md:h-[32rem] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-espresso/10" />
                <div className="absolute inset-3 rounded-t-[9rem] rounded-b-xl border border-foam/15 pointer-events-none" />
              </div>

              <div className="absolute -top-6 -right-4 md:-right-8 w-24 md:w-32 drop-shadow-2xl">
                <RoastStamp className="w-full h-auto" />
              </div>

              {/* floating tasting card */}
              <div className="float-y absolute -bottom-7 -left-3 md:-left-10 bg-roast/95 backdrop-blur border border-seam rounded-xl p-4 w-60 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.85)]">
                <div className="flex items-center justify-between">
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-ember">On the cupping table</p>
                  <SteamCup className="w-7 h-7 text-ember" />
                </div>
                <p className="font-display text-foam text-lg font-semibold mt-1.5 leading-tight">{featured.name}</p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {featured.notes.map((n) => (
                    <span key={n} className="text-[0.68rem] font-bold text-latte border border-seam rounded-full px-2 py-0.5">
                      {n}
                    </span>
                  ))}
                </div>
                <p className="text-[0.68rem] text-chaff mt-2.5">Roasted Tue · ships within 48 h</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Ticker />

      {/* trust strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { icon: <FlameIcon className="w-4.5 h-4.5" />, title: "Roasted, never warehoused", copy: "Every bag leaves the roastery within 48 hours of the roast." },
          { icon: <TruckIcon className="w-4.5 h-4.5" />, title: "Free shipping over $45", copy: "Carbon-neutral post, tracked from our door to yours." },
          { icon: <CupIcon className="w-4.5 h-4.5" />, title: "Dial-in guarantee", copy: "Not brewing right? We'll troubleshoot or replace it, free." },
        ].map((t, i) => (
          <Reveal key={t.title} delay={i * 120} className="flex items-start gap-3.5">
            <span className="w-9 h-9 shrink-0 rounded-full border border-seam text-ember grid place-items-center mt-0.5">{t.icon}</span>
            <span>
              <span className="block font-bold text-foam text-sm">{t.title}</span>
              <span className="block text-latte/80 text-[0.82rem] mt-0.5 leading-relaxed">{t.copy}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
