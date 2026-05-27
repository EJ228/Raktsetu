/* RaktSetu — extra primitives: AppShell, StatusBadge, KpiCard, Toggle, Avatar, QR, ProgressBar, Timeline */

/* ---------- StatusBadge for request states ---------- */
function StatusBadge({ status, className = "" }) {
  const config = {
    pending:   { label: "Pending",        bg: "#FEF3C7", fg: "#92400E", dot: "#F59E0B" },
    matched:   { label: "Matched",        bg: "#DBEAFE", fg: "#1E40AF", dot: "#3B82F6" },
    assigned:  { label: "Donor Assigned", bg: "#EDE9FE", fg: "#5B21B6", dot: "#7C3AED" },
    fulfilled: { label: "Fulfilled",      bg: "#D1FAE5", fg: "#065F46", dot: "#10B981" },
    cancelled: { label: "Cancelled",      bg: "#F3F4F6", fg: "#4B5563", dot: "#9CA3AF" },
  }[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${className}`}
      style={{ background: config.bg, color: config.fg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: config.dot }} />
      {config.label}
    </span>
  );
}

/* ---------- KPI Card ---------- */
function KpiCard({ icon, label, value, sub, trend, tone = "default", className = "" }) {
  const tones = {
    default: { bg: "white", iconBg: "#FAFAFA", iconFg: "#1A1A1A", border: "#E5E7EB" },
    danger:  { bg: "white", iconBg: "#FEE2E2", iconFg: "#DC2626", border: "#E5E7EB" },
    warning: { bg: "white", iconBg: "#FEF3C7", iconFg: "#92400E", border: "#E5E7EB" },
    success: { bg: "white", iconBg: "#D1FAE5", iconFg: "#065F46", border: "#E5E7EB" },
    info:    { bg: "white", iconBg: "#DBEAFE", iconFg: "#1E40AF", border: "#E5E7EB" },
  }[tone];
  return (
    <div
      className={`rounded-[14px] p-5 ${className}`}
      style={{
        background: tones.bg,
        border: `1px solid ${tones.border}`,
        boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className="h-9 w-9 rounded-[10px] grid place-items-center"
          style={{ background: tones.iconBg, color: tones.iconFg }}
        >
          <Icon name={icon} size={16} />
        </span>
        {trend && (
          <span
            className="text-[11px] font-semibold inline-flex items-center gap-1"
            style={{ color: trend.dir === "up" ? "#10B981" : trend.dir === "down" ? "#DC2626" : "#6B7280" }}
          >
            {trend.dir === "up" ? "↑" : trend.dir === "down" ? "↓" : "·"} {trend.label}
          </span>
        )}
      </div>
      <div
        className="font-bold text-[#1A1A1A] tracking-tight tabular-nums"
        style={{ fontSize: 30, letterSpacing: "-0.025em", lineHeight: 1 }}
      >
        {value}
      </div>
      <div className="mt-2 text-[13px] text-[#6B7280]">{label}</div>
      {sub && <div className="mt-1 text-[11px] text-[#9CA3AF]">{sub}</div>}
    </div>
  );
}

/* ---------- Toggle ---------- */
function Toggle({ on, onChange, size = "md" }) {
  const dims = size === "sm"
    ? { w: 32, h: 18, knob: 14 }
    : { w: 40, h: 22, knob: 18 };
  return (
    <button
      type="button"
      onClick={() => onChange && onChange(!on)}
      className="relative rounded-full transition-colors shrink-0"
      style={{
        width: dims.w,
        height: dims.h,
        background: on ? "#1A1A1A" : "#E5E7EB",
      }}
    >
      <span
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-transform"
        style={{
          width: dims.knob,
          height: dims.knob,
          left: 2,
          transform: `translateY(-50%) translateX(${on ? dims.w - dims.knob - 4 : 0}px)`,
          boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
        }}
      />
    </button>
  );
}

/* ---------- Avatar (initials) ---------- */
function Avatar({ name, size = 36, className = "" }) {
  const initials = name
    .split(" ")
    .map(s => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  // deterministic muted hue from name
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return (
    <span
      className={`inline-grid place-items-center rounded-full font-semibold tracking-tight shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `oklch(0.94 0.03 ${h})`,
        color: `oklch(0.35 0.06 ${h})`,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </span>
  );
}

/* ---------- ProgressBar ---------- */
function ProgressBar({ value, max, tone = "primary", showLabel = false, className = "" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const color = tone === "primary" ? "#C8232C" : tone === "success" ? "#10B981" : "#1A1A1A";
  return (
    <div className={className}>
      <div className="h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      {showLabel && (
        <div className="flex items-center justify-between mt-1.5 text-[11px] text-[#6B7280]">
          <span className="font-semibold text-[#1A1A1A] tabular-nums">{value} of {max} units</span>
          <span>{pct}%</span>
        </div>
      )}
    </div>
  );
}

/* ---------- Status Timeline (horizontal/vertical) ---------- */
function StatusTimeline({ steps, current, vertical = false, className = "" }) {
  if (vertical) {
    return (
      <ol className={`relative ${className}`}>
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const isLast = i === steps.length - 1;
          return (
            <li key={s.label} className="relative pl-9 pb-5">
              {!isLast && (
                <span
                  className="absolute left-[14px] top-7 bottom-0 w-px"
                  style={{ background: done ? "#1A1A1A" : "#E5E7EB" }}
                />
              )}
              <span
                className="absolute left-0 top-1 h-7 w-7 rounded-full grid place-items-center text-[11px] font-bold"
                style={{
                  background: done ? "#1A1A1A" : active ? "#C8232C" : "white",
                  color: done || active ? "white" : "#9CA3AF",
                  border: `1px solid ${done ? "#1A1A1A" : active ? "#C8232C" : "#E5E7EB"}`,
                }}
              >
                {done ? <Icon name="check" size={12} strokeWidth={3} /> : i + 1}
              </span>
              <div className="text-[13.5px] font-semibold text-[#1A1A1A]">{s.label}</div>
              {s.sub && <div className="text-[12px] text-[#6B7280] mt-0.5">{s.sub}</div>}
            </li>
          );
        })}
      </ol>
    );
  }
  return (
    <ol className={`flex items-start ${className}`}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === steps.length - 1;
        return (
          <li key={s.label} className="flex-1 relative">
            <div className="flex items-center">
              <span
                className="h-8 w-8 rounded-full grid place-items-center text-[12px] font-bold shrink-0"
                style={{
                  background: done ? "#1A1A1A" : active ? "#C8232C" : "white",
                  color: done || active ? "white" : "#9CA3AF",
                  border: `1px solid ${done ? "#1A1A1A" : active ? "#C8232C" : "#E5E7EB"}`,
                }}
              >
                {done ? <Icon name="check" size={12} strokeWidth={3} /> : i + 1}
              </span>
              {!isLast && (
                <span
                  className="flex-1 h-px ml-3 mr-3"
                  style={{ background: done ? "#1A1A1A" : "#E5E7EB" }}
                />
              )}
            </div>
            <div className="mt-3 pr-3">
              <div className="text-[13px] font-semibold text-[#1A1A1A]">{s.label}</div>
              {s.sub && <div className="text-[11.5px] text-[#6B7280] mt-0.5">{s.sub}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- AppShell (authenticated chrome) ---------- */
const ROLE_NAV = {
  donor: [
    { id: "dashboard", icon: "activity", label: "Dashboard" },
    { id: "requests",  icon: "droplet",  label: "Nearby requests", badge: 12 },
    { id: "history",   icon: "clock",    label: "Donation history" },
    { id: "profile",   icon: "user",     label: "Profile & settings" },
    { id: "notif",     icon: "bell",     label: "Notifications", badge: 3 },
  ],
  requester: [
    { id: "create",    icon: "plus",     label: "New request" },
    { id: "my",        icon: "heart",    label: "My requests" },
    { id: "search",    icon: "search",   label: "Find blood banks" },
    { id: "profile",   icon: "user",     label: "Profile" },
    { id: "notif",     icon: "bell",     label: "Notifications" },
  ],
  bank: [
    { id: "dashboard", icon: "activity", label: "Dashboard" },
    { id: "inventory", icon: "droplet",  label: "Inventory" },
    { id: "requests",  icon: "heart",    label: "Open requests", badge: 8 },
    { id: "pledges",   icon: "users",    label: "Donor pledges" },
    { id: "settings",  icon: "user",     label: "Settings" },
  ],
};

function AppShell({
  role = "donor",
  active,
  user,
  title,
  subtitle,
  actions,
  children,
  mobile = false,
}) {
  const nav = ROLE_NAV[role];

  if (mobile) {
    return (
      <div className="bg-[#FAFAFA] min-h-full pb-20">
        {/* mobile top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] h-14 flex items-center px-5">
          <Logo size={22} />
          <div className="ml-auto flex items-center gap-2">
            <button className="h-9 w-9 grid place-items-center rounded-[8px] border border-[#E5E7EB] relative">
              <Icon name="bell" size={16} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#C8232C]" />
            </button>
            <Avatar name={user.name} size={32} />
          </div>
        </header>

        <div className="px-5 pt-6 pb-2">
          {subtitle && <Eyebrow>{subtitle}</Eyebrow>}
          {title && (
            <h1
              className="font-bold text-[#1A1A1A] tracking-tight mt-1.5"
              style={{ fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              {title}
            </h1>
          )}
        </div>

        <div className="px-5 pb-6">{children}</div>

        {/* mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E5E7EB] flex items-center justify-around z-30">
          {nav.slice(0, 5).map(n => (
            <button
              key={n.id}
              className="flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md relative"
              style={{ color: active === n.id ? "#C8232C" : "#9CA3AF" }}
            >
              <Icon name={n.icon} size={20} strokeWidth={active === n.id ? 2.3 : 2} />
              <span className="text-[10px] font-semibold">{n.label.split(" ")[0]}</span>
              {n.badge && (
                <span className="absolute top-1 right-3 text-[9px] font-bold bg-[#C8232C] text-white rounded-full h-3.5 min-w-[14px] px-1 grid place-items-center">
                  {n.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // desktop
  return (
    <div className="flex bg-[#FAFAFA] min-h-full">
      {/* sidebar */}
      <aside className="w-[244px] shrink-0 border-r border-[#E5E7EB] bg-white flex flex-col">
        <div className="h-[72px] px-6 flex items-center border-b border-[#E5E7EB]">
          <Logo size={24} />
        </div>
        <nav className="p-3 flex-1">
          <div className="px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
            {role === "donor" ? "Donor" : role === "requester" ? "Requester" : "Blood bank"}
          </div>
          <ul className="flex flex-col gap-0.5">
            {nav.map(n => {
              const on = active === n.id;
              return (
                <li key={n.id}>
                  <a
                    href="#"
                    className="flex items-center gap-3 h-10 px-3 rounded-[8px] text-[13.5px] font-semibold relative"
                    style={{
                      background: on ? "#FCE9EA" : "transparent",
                      color: on ? "#C8232C" : "#1A1A1A",
                    }}
                  >
                    <Icon name={n.icon} size={16} strokeWidth={on ? 2.3 : 2} />
                    <span className="flex-1">{n.label}</span>
                    {n.badge && (
                      <span
                        className="text-[10.5px] font-bold rounded-full px-1.5 min-w-[20px] h-5 grid place-items-center"
                        style={{ background: on ? "#C8232C" : "#1A1A1A", color: "white" }}
                      >
                        {n.badge}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="px-3 py-2 mt-6 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
            Support
          </div>
          <ul className="flex flex-col gap-0.5">
            <li>
              <a href="#" className="flex items-center gap-3 h-10 px-3 rounded-[8px] text-[13.5px] font-medium text-[#6B7280] hover:bg-[#FAFAFA]">
                <Icon name="shield-check" size={16} /> Help & policies
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-3 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar name={user.name} size={36} />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#1A1A1A] truncate">{user.name}</div>
              <div className="text-[11px] text-[#6B7280] truncate">{user.email}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* topbar */}
        <header className="h-[72px] border-b border-[#E5E7EB] bg-white px-8 flex items-center gap-6">
          <div className="flex-1 min-w-0">
            {subtitle && <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">{subtitle}</div>}
            {title && (
              <h1
                className="font-bold text-[#1A1A1A] tracking-tight"
                style={{ fontSize: 22, letterSpacing: "-0.02em", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {title}
              </h1>
            )}
          </div>
          {actions}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2 h-10 px-3 rounded-[10px] border border-[#E5E7EB] bg-white w-[260px]">
              <Icon name="search" size={14} className="text-[#9CA3AF]" />
              <input
                placeholder="Search requests, donors, banks…"
                className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-[#9CA3AF]"
              />
              <span className="text-[10px] font-mono text-[#9CA3AF] border border-[#E5E7EB] rounded px-1">⌘K</span>
            </div>
            <button className="h-10 w-10 grid place-items-center rounded-[10px] border border-[#E5E7EB] relative">
              <Icon name="bell" size={16} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#C8232C]" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-8">
          <div className="max-w-[1200px] mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- QR placeholder (deterministic dots) ---------- */
function QrCode({ size = 140, seed = "raktsetu" }) {
  const N = 21;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 17 + seed.charCodeAt(i)) & 0xffffff;
  const grid = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      h = (h * 1103515245 + 12345) & 0x7fffffff;
      grid.push((h & 1) === 1);
    }
  }
  const cell = size / N;
  // 3 finder squares
  function inFinder(x, y) {
    const corners = [[0,0],[N-7,0],[0,N-7]];
    return corners.some(([cx,cy]) => x>=cx && x<cx+7 && y>=cy && y<cy+7);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-[8px] bg-white">
      <rect width={size} height={size} fill="white" />
      {grid.map((on, i) => {
        const x = i % N, y = Math.floor(i / N);
        if (inFinder(x, y)) return null;
        if (!on) return null;
        return <rect key={i} x={x*cell+0.5} y={y*cell+0.5} width={cell-1} height={cell-1} fill="#1A1A1A" rx={cell*0.18} />;
      })}
      {[[0,0],[N-7,0],[0,N-7]].map(([x,y], i) => (
        <g key={i}>
          <rect x={x*cell} y={y*cell} width={7*cell} height={7*cell} rx={6} fill="none" stroke="#1A1A1A" strokeWidth={cell} />
          <rect x={(x+2)*cell} y={(y+2)*cell} width={3*cell} height={3*cell} rx={3} fill="#1A1A1A" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- Section header ---------- */
function SectionHeader({ title, action, eyebrow }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2
          className="font-semibold text-[#1A1A1A] tracking-tight mt-1"
          style={{ fontSize: 18, letterSpacing: "-0.015em" }}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

Object.assign(window, {
  StatusBadge, KpiCard, Toggle, Avatar, ProgressBar,
  StatusTimeline, AppShell, QrCode, SectionHeader,
});
