/* RaktSetu — shared UI primitives, icons, badges, buttons, inputs */

/* ---------- Icon system (lucide-equivalent inline SVG) ---------- */
const ICON_PATHS = {
  droplet: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  "map-pin": (
    <g>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </g>
  ),
  search: (
    <g>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </g>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  "check-circle": (
    <g>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </g>
  ),
  clock: (
    <g>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </g>
  ),
  "shield-check": (
    <g>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </g>
  ),
  "chevron-right": <path d="m9 18 6-6-6-6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-left": <path d="m15 18-6-6 6-6" />,
  "arrow-right": (
    <g>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </g>
  ),
  "arrow-left": (
    <g>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </g>
  ),
  menu: (
    <g>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </g>
  ),
  x: (
    <g>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </g>
  ),
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  mail: (
    <g>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </g>
  ),
  user: (
    <g>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </g>
  ),
  users: (
    <g>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </g>
  ),
  calendar: (
    <g>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </g>
  ),
  building: (
    <g>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
      <path d="M12 14h.01" />
    </g>
  ),
  activity: <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.5.5 0 0 1-.96 0L8.91 5.18a.5.5 0 0 0-.96 0l-2.35 8.36A2 2 0 0 1 3.66 14H2" />,
  eye: (
    <g>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  ),
  "eye-off": (
    <g>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <path d="m2 2 20 20" />
    </g>
  ),
  share: (
    <g>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98" />
      <path d="m15.41 6.51-6.82 3.98" />
    </g>
  ),
  bell: (
    <g>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </g>
  ),
  sliders: (
    <g>
      <path d="M4 21v-7" />
      <path d="M4 10V3" />
      <path d="M12 21v-9" />
      <path d="M12 8V3" />
      <path d="M20 21v-5" />
      <path d="M20 12V3" />
      <path d="M2 14h4" />
      <path d="M10 8h4" />
      <path d="M18 16h4" />
    </g>
  ),
  map: (
    <g>
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </g>
  ),
  plus: (
    <g>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </g>
  ),
  globe: (
    <g>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </g>
  ),
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  hospital: (
    <g>
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </g>
  ),
  star: <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />,
};

function Icon({ name, size = 20, className = "", strokeWidth = 2, ...rest }) {
  const inner = ICON_PATHS[name];
  if (!inner) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {inner}
    </svg>
  );
}

/* ---------- Logo ---------- */
function Logo({ size = 28, light = false }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="grid place-items-center rounded-[8px]"
        style={{
          width: size,
          height: size,
          background: "#C8232C",
          color: "white",
        }}
      >
        <Icon name="droplet" size={size * 0.6} strokeWidth={2.4} />
      </span>
      <span
        className="font-semibold tracking-tight"
        style={{
          fontSize: size * 0.72,
          color: light ? "#FAFAFA" : "#1A1A1A",
          letterSpacing: "-0.01em",
        }}
      >
        Rakt<span style={{ color: "#C8232C" }}>Setu</span>
      </span>
    </div>
  );
}

/* ---------- Blood group badge ---------- */
function BloodBadge({ group, variant = "solid", size = "md", className = "" }) {
  const sizes = {
    sm: "text-[11px] px-2 py-[3px] min-w-[34px]",
    md: "text-[13px] px-2.5 py-1 min-w-[44px]",
    lg: "text-[15px] px-3 py-1.5 min-w-[56px]",
    xl: "text-[28px] px-5 py-2 min-w-[88px]",
  };
  const base =
    "inline-flex items-center justify-center rounded-full font-bold tracking-tight tabular-nums " +
    sizes[size];
  if (variant === "outline") {
    return (
      <span
        className={`${base} ${className}`}
        style={{
          color: "#C8232C",
          border: "1.5px solid #C8232C",
          background: "white",
        }}
      >
        {group}
      </span>
    );
  }
  if (variant === "ghost") {
    return (
      <span
        className={`${base} ${className}`}
        style={{
          color: "#C8232C",
          background: "#FCE9EA",
        }}
      >
        {group}
      </span>
    );
  }
  return (
    <span
      className={`${base} ${className}`}
      style={{ color: "white", background: "#C8232C" }}
    >
      {group}
    </span>
  );
}

/* ---------- Urgency badge ---------- */
function UrgencyBadge({ level = "normal", className = "" }) {
  const config = {
    normal: { label: "Normal", bg: "#F3F4F6", fg: "#4B5563", dot: "#9CA3AF" },
    urgent: { label: "Urgent", bg: "#FEF3C7", fg: "#92400E", dot: "#F59E0B" },
    critical: { label: "Critical", bg: "#FEE2E2", fg: "#991B1B", dot: "#DC2626" },
  }[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${className}`}
      style={{ background: config.bg, color: config.fg }}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          level === "critical" ? "rs-pulse" : ""
        }`}
        style={{ background: config.dot }}
      />
      {config.label}
    </span>
  );
}

/* ---------- Buttons ---------- */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className = "",
  ...props
}) {
  const sizes = {
    sm: "h-9 px-3.5 text-[13px] gap-1.5",
    md: "h-11 px-5 text-[14px] gap-2",
    lg: "h-[52px] px-6 text-[15px] gap-2",
  };
  const variants = {
    primary:
      "text-white font-semibold rs-btn-primary",
    secondary:
      "bg-white text-[#1A1A1A] font-semibold border border-[#E5E7EB] hover:border-[#1A1A1A]/30 hover:bg-[#FAFAFA]",
    ghost:
      "bg-transparent text-[#1A1A1A] font-semibold hover:bg-[#F3F4F6]",
    dark:
      "bg-[#1A1A1A] text-white font-semibold hover:bg-black",
    outlineDanger:
      "bg-white text-[#C8232C] font-semibold border border-[#C8232C]/40 hover:bg-[#FCE9EA]",
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[10px] transition-all whitespace-nowrap ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <Icon name={icon} size={size === "lg" ? 18 : 16} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 18 : 16} />}
    </button>
  );
}

/* ---------- Form primitives ---------- */
function Field({ label, hint, required, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[13px] font-medium text-[#1A1A1A]">
        {label}
        {required && <span className="text-[#C8232C] ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="text-[12px] text-[#6B7280]">{hint}</span>}
    </label>
  );
}

function TextInput({ icon, type = "text", className = "", ...rest }) {
  return (
    <div
      className={`flex items-center gap-2 h-11 rounded-[10px] border border-[#E5E7EB] bg-white px-3.5 focus-within:border-[#1A1A1A] focus-within:ring-2 focus-within:ring-[#1A1A1A]/5 transition-colors ${className}`}
    >
      {icon && <Icon name={icon} size={16} className="text-[#9CA3AF]" />}
      <input
        type={type}
        className="flex-1 bg-transparent text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none"
        {...rest}
      />
    </div>
  );
}

function SelectInput({ icon, children, className = "", ...rest }) {
  return (
    <div
      className={`flex items-center gap-2 h-11 rounded-[10px] border border-[#E5E7EB] bg-white px-3.5 focus-within:border-[#1A1A1A] ${className}`}
    >
      {icon && <Icon name={icon} size={16} className="text-[#9CA3AF]" />}
      <select
        className="flex-1 bg-transparent text-[14px] text-[#1A1A1A] outline-none appearance-none"
        {...rest}
      >
        {children}
      </select>
      <Icon name="chevron-down" size={16} className="text-[#9CA3AF]" />
    </div>
  );
}

/* ---------- Card ---------- */
function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`bg-white rounded-[14px] border border-[#E5E7EB] ${className}`}
      style={{ boxShadow: "0 1px 2px rgba(16,24,40,0.04)", ...style }}
    >
      {children}
    </div>
  );
}

/* ---------- Label/eyebrow ---------- */
function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280] ${className}`}
    >
      {children}
    </span>
  );
}

Object.assign(window, {
  Icon, Logo, BloodBadge, UrgencyBadge, Button,
  Field, TextInput, SelectInput, Card, Eyebrow,
});
