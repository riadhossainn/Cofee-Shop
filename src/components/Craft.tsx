import { CRAFT_IMAGE } from "../data/products";
import { BeanIcon, FlameIcon } from "./Icons";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Sourced from six farms we can name",
    copy: "We buy small lots directly — or through importers who share our receipts — from producers like the Benítez family in Cauca and the Gichathaini co-op in Nyeri. Every contract is published, every price paid above commodity.",
  },
  {
    n: "02",
    title: "Roasted in 12 kg batches, by ear and probe",
    copy: "Tuesday is roast day. Our Loring runs all morning: charge, turning point, a first crack we listen for rather than assume. Curves are logged per batch and cupped blind the next day before anything earns a label.",
  },
  {
    n: "03",
    title: "Rested, stamped, and out the door",
    copy: "Beans rest 24–48 hours, then bags are stamped with the roast date and sealed with a one-way valve. Orders leave the roastery within two days of the roast — coffee this fresh is a short window, and that's the point.",
  },
];

export default function Craft() {
  return (
    <section id="craft" className="scroll-mt-16 bg-paper text-ink relative overflow-hidden">
      {/* subtle paper texture lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(38,23,10,0.025) 3px, rgba(38,23,10,0.025) 4px)" }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* sticky image column */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Reveal>
              <p className="flex items-center gap-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.3em] text-copper">
                <span className="w-8 h-px bg-copper inline-block" />
                The craft
              </p>
              <h2 className="font-display font-semibold text-ink text-4xl md:text-5xl tracking-tight mt-3 leading-[1.05]">
                Twelve kilos at a time,
                <span className="italic font-medium text-copper"> never more.</span>
              </h2>
            </Reveal>
            <Reveal delay={150} className="mt-8 relative">
              <div className="rounded-xl overflow-hidden border border-paperline shadow-[0_35px_70px_-30px_rgba(38,23,10,0.5)]">
                <img
                  src={CRAFT_IMAGE}
                  alt="The copper drum roaster inside the Emberline roastery"
                  loading="lazy"
                  className="kenburns w-full h-[24rem] md:h-[30rem] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-3 md:-right-6 bg-espresso text-crema rounded-lg px-4 py-3 shadow-xl flex items-center gap-3">
                <FlameIcon className="w-5 h-5 text-ember" />
                <div>
                  <p className="font-display font-semibold text-foam leading-none">212.4 °C</p>
                  <p className="text-[0.62rem] uppercase tracking-[0.18em] text-chaff mt-1 font-bold">Drop temp, batch #1,204</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* scrolling steps */}
          <div className="flex flex-col justify-center gap-0">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 120} className="group relative pl-16 md:pl-20 py-8 border-b border-paperline last:border-b-0">
                <span className="absolute left-0 top-7 font-display font-semibold text-[2.6rem] md:text-[3.2rem] leading-none text-copper/25 group-hover:text-copper transition-colors duration-500">
                  {s.n}
                </span>
                <span className="absolute left-[4.1rem] md:left-[5.1rem] top-10 bottom-10 w-px bg-paperline last:hidden" aria-hidden="true" />
                <h3 className="font-display font-semibold text-2xl text-ink leading-snug group-hover:text-copper transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-ink/70 leading-relaxed mt-3 text-[0.95rem] max-w-lg">{s.copy}</p>
              </Reveal>
            ))}

            <Reveal delay={360} className="mt-8 bg-espresso text-crema rounded-xl p-7 md:p-8 relative overflow-hidden">
              <BeanIcon className="w-24 h-24 absolute -right-6 -bottom-6 text-ember/15" />
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.26em] text-ember">From the cupping log</p>
              <blockquote className="font-display italic text-xl md:text-2xl text-foam leading-snug mt-3">
                “Chelbesa, day 5 — apricot jam, bergamot peel, finish that lasts a full conversation. Bottled lightning.”
              </blockquote>
              <p className="text-[0.78rem] text-chaff font-bold mt-4">— Mara O., head roaster · batch #1,198</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
