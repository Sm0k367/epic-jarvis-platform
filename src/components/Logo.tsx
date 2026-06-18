interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = '', size = 28, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="JARVIS"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="hsl(188 96% 55%)" />
            <stop offset="1" stopColor="hsl(265 92% 67%)" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="hsl(240 18% 5%)" />
        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="url(#logo-grad)" strokeWidth="1" opacity="0.4" />
        {/* Stylized "J" mark */}
        <path
          d="M9 7 L9 18 Q9 22 13 22 L23 22"
          stroke="url(#logo-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="23" cy="22" r="1.5" fill="url(#logo-grad)" />
      </svg>
      {showText && (
        <span className="font-display text-xl tracking-tight text-text">
          JARVIS
        </span>
      )}
    </div>
  );
}
