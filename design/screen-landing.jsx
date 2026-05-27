/* RaktSetu — Landing page (Screen 1) */

const LANDING_STATS = [
  { value: "1,28,540", label: "Donors registered" },
  { value: "3,612", label: "Units available right now" },
  { value: "847", label: "Lives saved this month" },
];

const URGENT_FEED = [
  { group: "A+", city: "Guwahati", when: "2 hours ago", hospital: "GMC Hospital", level: "critical" },
  { group: "O-", city: "Mumbai", when: "5 hours ago", hospital: "Hinduja Hospital", level: "urgent" },
  { group: "B+", city: "Delhi", when: "today, 09:14", hospital: "AIIMS", level: "urgent" },
  { group: "AB-", city: "Bengaluru", when: "yesterday", hospital: "Manipal", level: "normal" },
];

const STEPS = [
  {
    icon: "user",
    title: "Register in 90 seconds",
    body: "Tell us your blood group, city, and how to reach you. We verify quickly and respectfully.",
  },
  {
    icon: "zap",
    title: "Get matched in real time",
    body: "When a compatible request appears near you, we send a single, clear notification — never spam.",
  },
  {
    icon: "heart",
    title: "Save a life nearby",
    body: "Pledge with one tap, walk into the partner blood bank, and you're done. We handle the paperwork.",
  },
];

const COMPAT_GROUPS = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];
// donor row → recipient col: 1 if compatible
const COMPAT_MATRIX = {
  "O-":  [1,1,1,1,1,1,1,1],
  "O+":  [0,1,0,1,0,1,0,1],
  "A-":  [0,0,1,1,0,0,1,1],
  "A+":  [0,0,0,1,0,0,0,1],
  "B-":  [0,0,0,0,1,1,1,1],
  "B+":  [0,0,0,0,0,1,0,1],
  "AB-": [0,0,0,0,0,0,1,1],
  "AB+": [0,0,0,0,0,0,0,1],
};

function LandingNav({ mobile = false }) {
  const [open, setOpen] = React.useState(false);
  if (mobile) {
    return (
      <header className="flex items-center justify-between px-5 h-16 border-b border-[#E5E7EB] bg-white">
        <Logo size={24} />
        <button
          onClick={() => setOpen(!open)}
          className="h-9 w-9 grid place-items-center rounded-[8px] border border-[#E5E7EB]"
        >
          <Icon name={open ? "x" : "menu"} size={18} />
        </button>
      </header>
    );
  }
  return (
    <header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur">
      <div className="max-w-[1200px] mx-auto px-8 h-[72px] flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-1">
          {["How it works", "Find blood", "Become a donor", "For blood banks"].map(l => (
            <a
              key={l}
              href="#"
              className="px-3.5 py-2 text-[14px] font-medium text-[#1A1A1A]/80 hover:text-[#1A1A1A] rounded-md hover:bg-[#FAFAFA]"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">Log in</Button>
          <Button variant="dark" size="sm">Register</Button>
        </div>
      </div>
    </header>
  );
}

function LandingHero({ mobile }) {
  return (
    <section
      className={mobile ? "px-5 pt-10 pb-12" : "max-w-[1200px] mx-auto px-8 pt-20 pb-16"}
    >
      <div className={mobile ? "" : "grid grid-cols-12 gap-12 items-center"}>
        <div className={mobile ? "" : "col-span-7"}>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FCE9EA] text-[#8B1A20] px-3 py-1.5 text-[12px] font-semibold mb-6">
            <span className="rs-pulse h-1.5 w-1.5 rounded-full bg-[#C8232C]" />
            Live network · 412 active requests right now
          </div>
          <h1
            className="font-bold tracking-tight text-[#1A1A1A]"
            style={{
              fontSize: mobile ? 38 : 60,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
            }}
          >
            Every drop counts.
            <br />
            Every donor matters.
          </h1>
          <p
            className="mt-6 text-[#6B7280] max-w-[520px]"
            style={{ fontSize: mobile ? 16 : 18, lineHeight: 1.6 }}
          >
            RaktSetu connects donors, patients, and blood banks across India in
            real time — so the right unit reaches the right person in the hour
            it matters most.
          </p>
          <div className={`mt-8 flex ${mobile ? "flex-col" : "flex-row"} gap-3`}>
            <Button variant="primary" size="lg" iconRight="arrow-right">
              Become a donor
            </Button>
            <Button variant="secondary" size="lg">
              Request blood
            </Button>
          </div>
          <div className="mt-7 flex items-center gap-5 text-[12px] text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="shield-check" size={14} /> Verified by NBTC
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check-circle" size={14} /> 100% free for donors
            </span>
          </div>
        </div>

        {!mobile && (
          <div className="col-span-5">
            <HeroVisual />
          </div>
        )}
        {mobile && (
          <div className="mt-10">
            <HeroVisual mobile />
          </div>
        )}
      </div>
    </section>
  );
}

function HeroVisual({ mobile = false }) {
  return (
    <div className="relative">
      <div
        className="relative rounded-[20px] overflow-hidden border border-[#E5E7EB] bg-[#FAFAFA]"
        style={{
          height: mobile ? 280 : 460,
          boxShadow: "0 18px 50px -20px rgba(16,24,40,0.18)",
        }}
      >
        {/* faint map grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.5]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#E5E7EB" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* concentric pulse */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rs-ping absolute -inset-24 rounded-full" style={{ border: "1px solid rgba(200,35,44,0.25)" }} />
          <div className="rs-ping-slow absolute -inset-44 rounded-full" style={{ border: "1px solid rgba(200,35,44,0.15)" }} />
          <div className="rs-ping-slower absolute -inset-64 rounded-full" style={{ border: "1px solid rgba(200,35,44,0.08)" }} />
          <div
            className="relative h-14 w-14 rounded-full grid place-items-center"
            style={{ background: "#C8232C", boxShadow: "0 8px 28px rgba(200,35,44,0.4)" }}
          >
            <Icon name="droplet" size={26} className="text-white" />
          </div>
        </div>

        {/* floating donor pins */}
        <FloatingPin top="18%" left="18%" group="O+" delay={0} />
        <FloatingPin top="28%" left="78%" group="B-" delay={1.2} />
        <FloatingPin top="68%" left="22%" group="A+" delay={0.6} />
        <FloatingPin top="74%" left="72%" group="AB+" delay={1.8} />
        <FloatingPin top="48%" left="88%" group="O-" delay={0.3} small />
        <FloatingPin top="58%" left="10%" group="A-" delay={1.5} small />

        {/* live request toast */}
        <div className="absolute left-5 bottom-5 right-5 sm:left-6 sm:right-auto sm:bottom-6 sm:w-[280px]">
          <div
            className="rounded-[12px] bg-white border-l-4 border-l-[#DC2626] border-y border-r border-[#E5E7EB] px-3.5 py-3 flex items-start gap-3"
            style={{ boxShadow: "0 12px 30px -12px rgba(16,24,40,0.15)" }}
          >
            <div className="h-8 w-8 rounded-full bg-[#FEE2E2] grid place-items-center shrink-0">
              <Icon name="droplet" size={14} className="text-[#C8232C]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DC2626]">
                  Critical
                </span>
                <span className="text-[11px] text-[#9CA3AF]">· now</span>
              </div>
              <p className="text-[13px] text-[#1A1A1A] leading-snug">
                <span className="font-semibold">2 units of A+</span> needed at GMC Hospital, Guwahati
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingPin({ top, left, group, delay, small }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 rs-float"
      style={{ top, left, animationDelay: `${delay}s` }}
    >
      <BloodBadge group={group} size={small ? "sm" : "md"} variant="ghost" />
    </div>
  );
}

function LiveStatsStrip({ mobile }) {
  return (
    <section
      className={
        mobile
          ? "mx-5 -mt-2 mb-10"
          : "max-w-[1200px] mx-auto px-8 -mt-2 mb-20"
      }
    >
      <div
        className="rounded-[16px] border border-[#E5E7EB] bg-white grid grid-cols-3 divide-x divide-[#E5E7EB] overflow-hidden"
        style={{ boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}
      >
        {LANDING_STATS.map(s => (
          <div key={s.label} className={mobile ? "p-4" : "p-7"}>
            <div
              className="font-bold text-[#1A1A1A] tracking-tight tabular-nums"
              style={{ fontSize: mobile ? 22 : 32, letterSpacing: "-0.02em" }}
            >
              {s.value}
            </div>
            <div
              className="text-[#6B7280] mt-1"
              style={{ fontSize: mobile ? 11 : 13 }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickSearch({ mobile }) {
  return (
    <section
      className={mobile ? "px-5 mb-14" : "max-w-[1200px] mx-auto px-8 mb-24"}
    >
      <div
        className={`rounded-[18px] border border-[#E5E7EB] bg-white p-${mobile ? "5" : "8"}`}
        style={{ boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}
      >
        <div className={mobile ? "" : "flex items-end justify-between mb-6"}>
          <div>
            <Eyebrow>Find blood now</Eyebrow>
            <h3
              className="mt-2 font-semibold text-[#1A1A1A] tracking-tight"
              style={{ fontSize: mobile ? 22 : 28, letterSpacing: "-0.02em" }}
            >
              Search across {mobile ? "1,200+" : "1,200+"} partner blood banks
            </h3>
          </div>
          {!mobile && (
            <a href="#" className="text-[13px] font-semibold text-[#C8232C] inline-flex items-center gap-1">
              See full directory <Icon name="arrow-right" size={14} />
            </a>
          )}
        </div>
        <div className={mobile ? "mt-5 grid gap-3" : "grid grid-cols-12 gap-3 items-end"}>
          <div className={mobile ? "" : "col-span-3"}>
            <Field label="Blood group">
              <SelectInput icon="droplet" defaultValue="A+">
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </SelectInput>
            </Field>
          </div>
          <div className={mobile ? "" : "col-span-4"}>
            <Field label="City">
              <SelectInput icon="map-pin" defaultValue="Guwahati">
                {["Guwahati","Mumbai","Delhi","Bengaluru","Kolkata","Chennai","Hyderabad","Pune"].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </SelectInput>
            </Field>
          </div>
          <div className={mobile ? "" : "col-span-3"}>
            <Field label="Component">
              <SelectInput icon="sliders">
                {["Whole blood","Plasma","Platelets","RBC concentrate"].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </SelectInput>
            </Field>
          </div>
          <div className={mobile ? "" : "col-span-2"}>
            <Button variant="primary" size="lg" icon="search" className="w-full">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ mobile }) {
  return (
    <section
      className={
        mobile
          ? "px-5 py-14 bg-[#FAFAFA] border-y border-[#E5E7EB]"
          : "py-24 bg-[#FAFAFA] border-y border-[#E5E7EB]"
      }
    >
      <div className={mobile ? "" : "max-w-[1200px] mx-auto px-8"}>
        <div className={mobile ? "mb-8" : "mb-14 max-w-[640px]"}>
          <Eyebrow>How it works</Eyebrow>
          <h2
            className="mt-2 font-bold text-[#1A1A1A] tracking-tight"
            style={{ fontSize: mobile ? 30 : 44, lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            Three small steps. One profound outcome.
          </h2>
        </div>
        <div className={mobile ? "grid gap-4" : "grid grid-cols-3 gap-6"}>
          {STEPS.map((s, i) => (
            <Card key={s.title} className={mobile ? "p-6" : "p-8"}>
              <div className="flex items-center justify-between mb-6">
                <span
                  className="h-11 w-11 rounded-[10px] grid place-items-center"
                  style={{ background: "#FCE9EA", color: "#C8232C" }}
                >
                  <Icon name={s.icon} size={20} />
                </span>
                <span
                  className="font-bold tabular-nums text-[#E5E7EB]"
                  style={{ fontSize: 36, letterSpacing: "-0.05em" }}
                >
                  0{i + 1}
                </span>
              </div>
              <h3
                className="font-semibold text-[#1A1A1A] tracking-tight mb-2"
                style={{ fontSize: 20, letterSpacing: "-0.015em" }}
              >
                {s.title}
              </h3>
              <p className="text-[14px] text-[#6B7280] leading-[1.6]">
                {s.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompatibilityChart({ mobile }) {
  return (
    <section className={mobile ? "px-5 py-14" : "max-w-[1200px] mx-auto px-8 py-24"}>
      <div className={mobile ? "" : "grid grid-cols-12 gap-12 items-center"}>
        <div className={mobile ? "mb-8" : "col-span-5"}>
          <Eyebrow>Compatibility</Eyebrow>
          <h2
            className="mt-2 font-bold text-[#1A1A1A] tracking-tight"
            style={{ fontSize: mobile ? 30 : 40, lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            Who can give to whom.
          </h2>
          <p
            className="mt-4 text-[#6B7280] leading-[1.6]"
            style={{ fontSize: mobile ? 15 : 16 }}
          >
            Rows are donors, columns are recipients. O− is a universal donor; AB+ is a universal recipient. RaktSetu's matching engine handles this for you automatically — this chart is just for the curious.
          </p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-[#6B7280]">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm" style={{ background: "#C8232C" }} /> Compatible
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm border border-[#E5E7EB]" /> Not compatible
            </span>
          </div>
        </div>
        <div className={mobile ? "" : "col-span-7"}>
          <Card className={mobile ? "p-4" : "p-6"}>
            <div className="grid" style={{ gridTemplateColumns: `auto repeat(8, 1fr)`, gap: mobile ? 4 : 6 }}>
              <div />
              {COMPAT_GROUPS.map(g => (
                <div key={"h"+g} className="text-center text-[11px] font-semibold text-[#6B7280] py-1">{g}</div>
              ))}
              {COMPAT_GROUPS.map(donor => (
                <React.Fragment key={donor}>
                  <div className="text-right text-[11px] font-semibold text-[#6B7280] pr-2 self-center">{donor}</div>
                  {COMPAT_MATRIX[donor].map((c, ci) => (
                    <div
                      key={donor + ci}
                      className="aspect-square rounded-[6px] grid place-items-center"
                      style={{
                        background: c ? "#C8232C" : "white",
                        border: c ? "none" : "1px solid #E5E7EB",
                      }}
                    >
                      {c ? <Icon name="check" size={mobile ? 12 : 14} className="text-white" strokeWidth={3} /> : null}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function UrgentFeed({ mobile }) {
  return (
    <section className={mobile ? "px-5 py-14 bg-[#FAFAFA] border-y border-[#E5E7EB]" : "py-20 bg-[#FAFAFA] border-y border-[#E5E7EB]"}>
      <div className={mobile ? "" : "max-w-[1200px] mx-auto px-8"}>
        <div className={mobile ? "mb-6" : "mb-8 flex items-end justify-between"}>
          <div>
            <Eyebrow>Live · Anonymized</Eyebrow>
            <h2
              className="mt-2 font-bold text-[#1A1A1A] tracking-tight"
              style={{ fontSize: mobile ? 26 : 36, lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              Recent urgent requests
            </h2>
          </div>
          {!mobile && (
            <a href="#" className="text-[13px] font-semibold text-[#1A1A1A] inline-flex items-center gap-1">
              See all 412 active <Icon name="arrow-right" size={14} />
            </a>
          )}
        </div>
        <div className={mobile ? "grid gap-3" : "grid grid-cols-4 gap-4"}>
          {URGENT_FEED.map((r, i) => (
            <Card key={i} className="p-5 hover:border-[#1A1A1A]/30 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-4">
                <BloodBadge group={r.group} size="lg" />
                <UrgencyBadge level={r.level} />
              </div>
              <div className="text-[15px] font-semibold text-[#1A1A1A] leading-snug">
                {r.group} needed in {r.city}
              </div>
              <div className="text-[13px] text-[#6B7280] mt-1">{r.hospital}</div>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[12px] text-[#9CA3AF]">
                  <Icon name="clock" size={12} /> {r.when}
                </span>
                <span className="text-[12px] font-semibold text-[#C8232C]">View →</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandingFooter({ mobile }) {
  const cols = [
    { title: "Product", items: ["How it works", "Find blood", "Become a donor", "For blood banks", "Pricing"] },
    { title: "Resources", items: ["Help center", "Eligibility guide", "Blood facts", "Compatibility chart", "Blog"] },
    { title: "Company", items: ["About us", "Partners", "Press", "Careers", "Contact"] },
    { title: "Legal", items: ["Privacy", "Terms", "Data protection", "NBTC compliance"] },
  ];
  return (
    <footer className={mobile ? "px-5 py-12 bg-white" : "bg-white"}>
      <div className={mobile ? "" : "max-w-[1200px] mx-auto px-8 py-16"}>
        <div className={mobile ? "" : "grid grid-cols-12 gap-10 mb-12"}>
          <div className={mobile ? "mb-10" : "col-span-4"}>
            <Logo />
            <p className="mt-5 text-[14px] text-[#6B7280] leading-[1.6] max-w-[320px]">
              A non-profit blood matching network connecting donors, patients and accredited blood banks across India.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FAFAFA] border border-[#E5E7EB] px-3 py-1.5 text-[12px] text-[#6B7280]">
              <Icon name="shield-check" size={14} className="text-[#10B981]" />
              Verified by National Blood Transfusion Council
            </div>
          </div>
          <div className={mobile ? "grid grid-cols-2 gap-8" : "col-span-8 grid grid-cols-4 gap-8"}>
            {cols.map(c => (
              <div key={c.title}>
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A] mb-3">
                  {c.title}
                </h4>
                <ul className="space-y-2.5">
                  {c.items.map(i => (
                    <li key={i}>
                      <a href="#" className="text-[13px] text-[#6B7280] hover:text-[#1A1A1A]">{i}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={`pt-8 border-t border-[#E5E7EB] flex ${mobile ? "flex-col gap-3" : "items-center justify-between"}`}>
          <p className="text-[12px] text-[#9CA3AF]">
            © 2026 RaktSetu Foundation. Made with care in Bengaluru and Guwahati.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5"><Icon name="globe" size={14} /> English</span>
            <span>•</span>
            <a href="#" className="hover:text-[#1A1A1A]">हिन्दी</a>
            <a href="#" className="hover:text-[#1A1A1A]">বাংলা</a>
            <a href="#" className="hover:text-[#1A1A1A]">தமிழ்</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScreenLanding({ mobile }) {
  return (
    <div className="bg-white">
      <LandingNav mobile={mobile} />
      <LandingHero mobile={mobile} />
      <LiveStatsStrip mobile={mobile} />
      <QuickSearch mobile={mobile} />
      <HowItWorks mobile={mobile} />
      <CompatibilityChart mobile={mobile} />
      <UrgentFeed mobile={mobile} />
      <LandingFooter mobile={mobile} />
    </div>
  );
}

Object.assign(window, { ScreenLanding });
