interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const BeanIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 3.2c4.6 0 7.6 3.9 7.6 8.8s-3 8.8-7.6 8.8-7.6-3.9-7.6-8.8 3-8.8 7.6-8.8Z" />
    <path d="M12 3.2c-2.1 2.6-2.1 5.6 0 8.8s2.1 6.2 0 8.8" />
  </svg>
);

export const SearchIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="10.5" cy="10.5" r="6.2" />
    <path d="m15.4 15.4 5 5" />
  </svg>
);

export const BagIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5.5 8h13l-1.1 12.2a1 1 0 0 1-1 .8H7.6a1 1 0 0 1-1-.8L5.5 8Z" />
    <path d="M9 8V6.4a3 3 0 0 1 6 0V8" />
  </svg>
);

export const PlusIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M5 12h14" />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M4 12h16m0 0-6-6m6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M7 17 17 7m0 0H8.5M17 7v8.5" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.2}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const TrashIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 7h14M10 7V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V7m-7.2 0 .7 12.1a1 1 0 0 0 1 .9h7a1 1 0 0 0 1-.9L17.2 7M10.2 11v5m3.6-5v5" />
  </svg>
);

export const FlameIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 3.5c.6 2.6-.9 4-2.2 5.5C8.3 10.7 7 12.3 7 14.6a5 5 0 0 0 10 0c0-1.6-.6-3-1.4-4.3-.4.9-1 1.5-1.9 1.9.4-2.6-.2-6-1.7-8.7Z" />
  </svg>
);

export const LeafIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M19.5 4.5c.3 6.8-2.6 12.9-9.2 13.4-3 .2-5.3-1.7-5.3-4.4 0-4.9 5.9-8.6 14.5-9Z" />
    <path d="M4.5 19.5c3-5.5 7-8.8 11.5-10.5" />
  </svg>
);

export const MountainIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m3 19 6-11 3.2 5.4L14.5 9l6.5 10H3Z" />
  </svg>
);

export const TruckIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M2.5 6h11v10h-11zM13.5 9.5h4.2l3 3.2V16h-7.2" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const CardIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3 10h18M6.5 14.5h4" />
  </svg>
);

export const LockIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </svg>
);

export const ThermoIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M10.5 4a1.8 1.8 0 0 1 3.6 0v9.2a4.2 4.2 0 1 1-3.6 0V4Z" />
    <path d="M12.3 9v7" />
  </svg>
);

export const CupIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4.5 9h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V9Z" />
    <path d="M16.5 10h1.6a2.4 2.4 0 0 1 0 4.8h-1.9M7.5 3.5c-.8 1-.8 1.8 0 2.8M11 3.5c-.8 1-.8 1.8 0 2.8" />
  </svg>
);

export const ChevronDownIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const SpinnerIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`${className} animate-spin`} {...base} strokeWidth={2.2}>
    <path d="M12 3a9 9 0 1 0 9 9" />
  </svg>
);

export const SteamCup = ({ className = "w-10 h-10" }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <g className="steam" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M18 14c-1.6-2.4-1.6-4.4 0-7" />
      <path d="M24 15c-1.6-2.6-1.6-5 0-8" />
      <path d="M30 14c-1.6-2.4-1.6-4.4 0-7" />
    </g>
    <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22h20v9a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8v-9Z" />
      <path d="M32 24h2.4a4 4 0 0 1 0 8h-2.8" />
      <path d="M9 43h26" />
    </g>
  </svg>
);

/** Rotating circular stamp — "SMALL BATCH · ROASTED WEEKLY ·" */
export const RoastStamp = ({ className = "w-28 h-28" }: IconProps) => (
  <svg viewBox="0 0 120 120" className={`${className} spin-slow`}>
    <defs>
      <path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
    </defs>
    <circle cx="60" cy="60" r="58" fill="var(--color-espresso)" opacity="0.85" />
    <circle cx="60" cy="60" r="58" fill="none" stroke="var(--color-ember)" strokeWidth="1" opacity="0.55" />
    <circle cx="60" cy="60" r="30" fill="none" stroke="var(--color-ember)" strokeWidth="1" opacity="0.55" />
    <text fontSize="11.5" letterSpacing="2.6" fill="var(--color-ember)" fontFamily="Karla, sans-serif" fontWeight="700">
      <textPath href="#stamp-circle">SMALL BATCH · ROASTED WEEKLY · SINCE 2019 ·</textPath>
    </text>
    <g transform="translate(48 46)" stroke="var(--color-ember)" strokeWidth="1.8" fill="none" strokeLinecap="round">
      <path d="M12 2.4c4.2 0 6.8 3.5 6.8 8s-2.6 8-6.8 8-6.8-3.5-6.8-8 2.6-8 6.8-8Z" />
      <path d="M12 2.4c-1.9 2.3-1.9 5 0 8s1.9 5.7 0 8" />
    </g>
  </svg>
);
