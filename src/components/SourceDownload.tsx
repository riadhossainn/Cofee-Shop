import { useState } from "react";
import JSZip from "jszip";
import { CheckIcon, SpinnerIcon } from "./Icons";

import rawPackage from "../../package.json?raw";
import rawViteConfig from "../../vite.config.js?raw";
import rawTsconfig from "../../tsconfig.json?raw";
import rawIndexHtml from "../../index.html?raw";
import rawMain from "../main.tsx?raw";
import rawViteEnv from "../vite-env.d.ts?raw";
import rawApp from "../App.tsx?raw";
import rawCss from "../index.css?raw";
import rawProducts from "../data/products.ts?raw";
import rawHeader from "./Header.tsx?raw";
import rawHero from "./Hero.tsx?raw";
import rawShop from "./Shop.tsx?raw";
import rawProductModal from "./ProductModal.tsx?raw";
import rawCartDrawer from "./CartDrawer.tsx?raw";
import rawCheckoutModal from "./CheckoutModal.tsx?raw";
import rawCraft from "./Craft.tsx?raw";
import rawFooter from "./Footer.tsx?raw";
import rawIcons from "./Icons.tsx?raw";
import rawReveal from "./Reveal.tsx?raw";
import rawSelf from "./SourceDownload.tsx?raw";

const FILES: [string, string][] = [
  ["package.json", rawPackage],
  ["vite.config.js", rawViteConfig],
  ["tsconfig.json", rawTsconfig],
  ["index.html", rawIndexHtml],
  ["src/main.tsx", rawMain],
  ["src/vite-env.d.ts", rawViteEnv],
  ["src/App.tsx", rawApp],
  ["src/index.css", rawCss],
  ["src/data/products.ts", rawProducts],
  ["src/components/Header.tsx", rawHeader],
  ["src/components/Hero.tsx", rawHero],
  ["src/components/Shop.tsx", rawShop],
  ["src/components/ProductModal.tsx", rawProductModal],
  ["src/components/CartDrawer.tsx", rawCartDrawer],
  ["src/components/CheckoutModal.tsx", rawCheckoutModal],
  ["src/components/Craft.tsx", rawCraft],
  ["src/components/Footer.tsx", rawFooter],
  ["src/components/Icons.tsx", rawIcons],
  ["src/components/Reveal.tsx", rawReveal],
  ["src/components/SourceDownload.tsx", rawSelf],
];

const README = `# Emberline Roasting Co.

Small-batch specialty coffee storefront — React 18 + Vite 6 + Tailwind CSS v4.

## Run locally

Requires Node.js 18 or newer.

    npm install
    npm run dev

Then open http://localhost:5173

## Production build

    npm run build
    npm run preview

## Notes

- Product photography is loaded from hosted image URLs defined in
  src/data/products.ts, so no local image assets are required.
- Fonts (Fraunces + Karla) are loaded from Google Fonts via index.html.
- The "Source .zip" button in the footer of the running app regenerates
  this exact archive in the browser (powered by JSZip).
- package-lock.json is intentionally omitted; npm install recreates it.
`;

const DownloadGlyph = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v10m0 0 4-4m-4 4-4-4" />
    <path d="M4.5 16.5v2A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5v-2" />
  </svg>
);

export default function SourceDownload() {
  const [state, setState] = useState<"idle" | "zipping" | "done">("idle");

  const download = async () => {
    if (state === "zipping") return;
    setState("zipping");
    try {
      const zip = new JSZip();
      const root = zip.folder("emberline-coffee");
      if (!root) throw new Error("zip failed");
      FILES.forEach(([path, content]) => root.file(path, content));
      root.file("README.md", README);
      const blob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 9 },
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "emberline-coffee.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      setState("done");
      setTimeout(() => setState("idle"), 3200);
    } catch {
      setState("idle");
    }
  };

  return (
    <button
      onClick={download}
      disabled={state === "zipping"}
      className="btn-ghost !rounded-full px-4 py-2 text-[0.78rem] !text-latte disabled:opacity-60"
      aria-label="Download full project source code as a zip file"
    >
      {state === "zipping" ? (
        <>
          <SpinnerIcon className="w-3.5 h-3.5 text-ember" /> Packing the zip…
        </>
      ) : state === "done" ? (
        <>
          <CheckIcon className="w-3.5 h-3.5 text-sage" /> Saved — check downloads
        </>
      ) : (
        <>
          <DownloadGlyph className="w-3.5 h-3.5" /> Source code .zip
        </>
      )}
    </button>
  );
}
