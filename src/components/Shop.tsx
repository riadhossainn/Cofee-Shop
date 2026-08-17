import { useMemo, useState } from "react";
import {
  CATEGORY_LABEL,
  Category,
  Product,
  PRODUCTS,
  money,
} from "../data/products";
import {
  ArrowUpRightIcon,
  BagIcon,
  BeanIcon,
  ChevronDownIcon,
  CloseIcon,
  FlameIcon,
  LeafIcon,
  MountainIcon,
} from "./Icons";
import { Reveal } from "./Reveal";

type Sort = "featured" | "price-asc" | "price-desc" | "roast";

interface ShopProps {
  query: string;
  onClearQuery: () => void;
  onQuickAdd: (p: Product) => void;
  onOpen: (p: Product) => void;
}

function RoastMeter({ roast, label }: { roast: number; label: string }) {
  return (
    <div className="flex items-center gap-2" title={`Roast level: ${label}`}>
      <FlameIcon className="w-3.5 h-3.5 text-ember" />
      <div className="flex gap-[3px]">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`w-[7px] h-[7px] rounded-full transition-colors ${
              i <= roast ? "bg-ember" : "bg-seam"
            }`}
          />
        ))}
      </div>
      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-chaff">{label}</span>
    </div>
  );
}

function ProductCard({
  product,
  index,
  onQuickAdd,
  onOpen,
}: {
  product: Product;
  index: number;
  onQuickAdd: (p: Product) => void;
  onOpen: (p: Product) => void;
}) {
  return (
    <Reveal as="li" delay={(index % 3) * 110}>
      <article
        className="group relative h-full flex flex-col bg-roast border border-seam rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-ember/50 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]"
        onClick={() => onOpen(product)}
      >
        {/* image */}
        <div className="relative aspect-[4/3.4] overflow-hidden bg-bark">
          <div
            className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(70% 70% at 50% 42%, ${product.glow}, transparent 75%)` }}
          />
          <img
            src={product.image}
            alt={`${product.name} coffee bag`}
            loading="lazy"
            className="relative w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] bg-espresso/85 backdrop-blur text-ember border border-seam rounded-full px-2.5 py-1">
              {CATEGORY_LABEL[product.category]}
            </span>
            {product.badge && (
              <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] bg-ember text-espresso rounded-full px-2.5 py-1 w-fit">
                {product.badge}
              </span>
            )}
          </div>
          <span className="absolute top-3 right-3 text-[0.62rem] font-bold text-latte bg-espresso/85 backdrop-blur border border-seam rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <BeanIcon className="w-3 h-3 text-ember" /> SCA {product.score}
          </span>
          <span className="absolute bottom-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-foam text-espresso opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRightIcon className="w-4 h-4" />
          </span>
        </div>

        {/* body */}
        <div className="flex flex-col flex-1 p-5">
          <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.26em] text-ember">{product.origin}</p>
          <h3 className="font-display font-semibold text-xl text-foam mt-1.5 leading-snug group-hover:text-ember transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-[0.78rem] text-chaff mt-0.5">{product.region}</p>

          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {product.notes.map((n) => (
              <span key={n} className="chip text-[0.68rem] font-bold px-2.5 py-1">
                {n}
              </span>
            ))}
          </div>

          <div className="mt-4 mb-5">
            <RoastMeter roast={product.roast} label={product.roastLabel} />
          </div>

          <div className="mt-auto pt-5 flex items-center justify-between border-t border-seam/70">
            <div>
              <p className="font-display text-[1.4rem] font-semibold text-foam leading-none">{money(product.price)}</p>
              <p className="text-[0.7rem] text-chaff mt-1">{product.weight} bag</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product);
              }}
              className="btn-ember px-4.5 py-2.5 text-[0.78rem]"
              aria-label={`Add ${product.name} to cart`}
            >
              <BagIcon className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Shop({ query, onClearQuery, onQuickAdd, onOpen }: ShopProps) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const categories: { id: Category | "all"; label: string; count: number }[] = [
    { id: "all", label: "Everything", count: PRODUCTS.length },
    ...(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => ({
      id: c,
      label: CATEGORY_LABEL[c],
      count: PRODUCTS.filter((p) => p.category === c).length,
    })),
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCat = category === "all" || p.category === category;
      if (!inCat) return false;
      if (!q) return true;
      const hay = [p.name, p.origin, p.region, p.process, p.varietal, p.roastLabel, CATEGORY_LABEL[p.category], ...p.notes]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((word) => hay.includes(word));
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "roast") list = [...list].sort((a, b) => a.roast - b.roast);
    return list;
  }, [query, category, sort]);

  return (
    <section id="shelf" className="relative scroll-mt-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(60rem 30rem at 50% 0%, rgba(226,153,58,0.05), transparent 65%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal>
            <p className="flex items-center gap-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.3em] text-ember">
              <span className="w-8 h-px bg-ember inline-block" />
              This week's shelf
            </p>
            <h2 className="font-display font-semibold text-foam text-4xl md:text-5xl tracking-tight mt-3">
              Six coffees. <span className="italic text-latte font-medium">No filler.</span>
            </h2>
          </Reveal>
          <Reveal delay={150} className="flex items-center gap-3">
            <label htmlFor="sort" className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-chaff shrink-0">
              Sort
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="appearance-none bg-bark border border-seam rounded-full pl-4 pr-9 py-2.5 text-sm font-bold text-foam focus:outline-none focus:border-ember/70 cursor-pointer transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price · low to high</option>
                <option value="price-desc">Price · high to low</option>
                <option value="roast">Roast · light to dark</option>
              </select>
              <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-chaff pointer-events-none" />
            </div>
          </Reveal>
        </div>

        {/* category pills */}
        <Reveal delay={100} className="mt-8 flex flex-wrap items-center gap-2.5">
          {categories.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-full px-4 py-2 text-[0.8rem] font-bold border transition-all duration-300 ${
                  active
                    ? "bg-ember text-espresso border-ember shadow-[0_10px_25px_-12px_rgba(226,153,58,0.7)]"
                    : "border-seam text-latte hover:border-ember hover:text-ember"
                }`}
              >
                {c.label}
                <span className={`ml-2 text-[0.68rem] font-extrabold ${active ? "text-espresso/70" : "text-chaff"}`}>
                  {c.count}
                </span>
              </button>
            );
          })}
          {query.trim() && (
            <span className="flex items-center gap-2 text-[0.8rem] text-latte ml-1">
              <span className="text-chaff">Results for</span>
              <span className="chip !text-ember !border-ember/60 px-3 py-1 font-bold">
                “{query.trim()}”
                <button onClick={onClearQuery} aria-label="Clear search" className="hover:text-foam">
                  <CloseIcon className="w-3 h-3" />
                </button>
              </span>
            </span>
          )}
        </Reveal>

        {/* grid */}
        {filtered.length > 0 ? (
          <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mt-10">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onQuickAdd={onQuickAdd} onOpen={onOpen} />
            ))}
          </ul>
        ) : (
          <div className="mt-10 border border-dashed border-seam rounded-xl py-20 px-6 text-center fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-bark border border-seam grid place-items-center text-chaff">
              <BeanIcon className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foam mt-5">No beans match that brew</h3>
            <p className="text-latte/80 text-sm mt-2 max-w-sm mx-auto">
              Nothing on the shelf fits “{query.trim()}”. Try an origin like <em>Ethiopia</em>, a note like{" "}
              <em>chocolate</em>, or clear your search.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={onClearQuery} className="btn-ember px-5 py-2.5 text-sm">
                Clear search
              </button>
              <button onClick={() => setCategory("all")} className="btn-ghost px-5 py-2.5 text-sm">
                Show everything
              </button>
            </div>
          </div>
        )}

        {/* provenance strip */}
        <Reveal className="mt-14 grid sm:grid-cols-3 gap-px bg-seam border border-seam rounded-xl overflow-hidden">
          {[
            { icon: <MountainIcon className="w-4.5 h-4.5" />, title: "Traceable to the farm gate", copy: "Lot codes on every bag lead back to the washing station and harvest week." },
            { icon: <LeafIcon className="w-4.5 h-4.5" />, title: "Paid well above C-price", copy: "We publish what we pay — average 2.4× the commodity price this year." },
            { icon: <FlameIcon className="w-4.5 h-4.5" />, title: "Roasted by hand, by ear", copy: "Two roasters, one drum, and a first crack we listen for every time." },
          ].map((t) => (
            <div key={t.title} className="bg-roast p-6 flex items-start gap-4 hover:bg-bark transition-colors duration-300">
              <span className="w-10 h-10 shrink-0 rounded-full border border-seam text-ember grid place-items-center">{t.icon}</span>
              <span>
                <span className="block font-bold text-foam text-sm">{t.title}</span>
                <span className="block text-latte/75 text-[0.82rem] mt-1 leading-relaxed">{t.copy}</span>
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
