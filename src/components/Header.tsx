import { useEffect, useState } from "react";
import { BagIcon, BeanIcon, CloseIcon, SearchIcon } from "./Icons";

interface HeaderProps {
  cartCount: number;
  query: string;
  onQuery: (q: string) => void;
  onOpenCart: () => void;
}

export default function Header({ cartCount, query, onQuery, onOpenCart }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const searchField = (
    <div className="relative group">
      <SearchIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-chaff group-focus-within:text-ember transition-colors" />
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search roasts, origins, notes…"
        className="w-full bg-bark/70 border border-seam rounded-full pl-10 pr-9 py-2 text-sm text-foam placeholder:text-chaff focus:outline-none focus:border-ember/70 focus:bg-bark transition-all"
        aria-label="Search coffee"
      />
      {query && (
        <button
          onClick={() => onQuery("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-chaff hover:text-ember transition-colors"
        >
          <CloseIcon className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b ${
        scrolled
          ? "bg-espresso/90 backdrop-blur-md border-seam/80 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16 md:h-[4.5rem]">
          <a href="#top" className="flex items-center gap-2.5 shrink-0 group" aria-label="Emberline home">
            <span className="w-9 h-9 rounded-full bg-ember text-espresso grid place-items-center transition-transform duration-300 group-hover:rotate-[25deg]">
              <BeanIcon className="w-5 h-5" />
            </span>
            <span className="leading-none">
              <span className="font-display font-semibold text-lg tracking-tight text-foam block">Emberline</span>
              <span className="text-[0.6rem] uppercase tracking-[0.32em] text-chaff">Roasting Co.</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7 ml-8 text-sm font-semibold text-latte">
            <a href="#shelf" className="hover:text-ember transition-colors">The Shelf</a>
            <a href="#craft" className="hover:text-ember transition-colors">Our Craft</a>
            <a href="#visit" className="hover:text-ember transition-colors">Visit</a>
          </nav>

          <div className="hidden md:block w-full max-w-xs ml-auto">{searchField}</div>

          <button
            onClick={() => setMobileSearch((s) => !s)}
            className="md:hidden ml-auto w-10 h-10 grid place-items-center rounded-full border border-seam text-latte hover:text-ember hover:border-ember transition-colors"
            aria-label="Toggle search"
          >
            {mobileSearch ? <CloseIcon className="w-4.5 h-4.5" /> : <SearchIcon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 btn-ghost !rounded-full pl-3.5 pr-4 py-2 !border-seam"
            aria-label={`Open cart, ${cartCount} items`}
          >
            <BagIcon className="w-4.5 h-4.5" />
            <span className="hidden sm:inline text-sm">Cart</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="badge-pop absolute -top-1.5 -right-1.5 min-w-[1.35rem] h-[1.35rem] px-1 rounded-full bg-ember text-espresso text-[0.7rem] font-extrabold grid place-items-center"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {mobileSearch && (
          <div className="md:hidden pb-3 fade-in">{searchField}</div>
        )}
      </div>
    </header>
  );
}
