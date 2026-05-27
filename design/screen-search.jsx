/* RaktSetu — Public Blood Search Results (Screen 2) */

const BANKS = [
  {
    name: "GMC Blood Bank",
    type: "Government · Govt. Medical College",
    distance: 1.2,
    rating: 4.8,
    reviews: 312,
    address: "Bhangagarh, Guwahati 781032",
    open: true,
    updated: "12 min ago",
    inventory: { "A+": 24, "A-": 6,  "B+": 18, "B-": 4,  "AB+": 9,  "AB-": 2, "O+": 31, "O-": 7 },
  },
  {
    name: "Apollo Hospitals Blood Centre",
    type: "Private · Multi-speciality",
    distance: 2.4,
    rating: 4.7,
    reviews: 256,
    address: "Christian Basti, Guwahati 781005",
    open: true,
    updated: "28 min ago",
    inventory: { "A+": 12, "A-": 2,  "B+": 9,  "B-": 1,  "AB+": 4,  "AB-": 0, "O+": 17, "O-": 3 },
  },
  {
    name: "Red Cross Society — Assam Branch",
    type: "Non-profit · Voluntary",
    distance: 3.1,
    rating: 4.9,
    reviews: 489,
    address: "GS Road, Six Mile, Guwahati 781022",
    open: true,
    updated: "1 hour ago",
    inventory: { "A+": 30, "A-": 11, "B+": 22, "B-": 6,  "AB+": 7,  "AB-": 3, "O+": 28, "O-": 12 },
  },
  {
    name: "Down Town Hospital Blood Bank",
    type: "Private · NABH accredited",
    distance: 4.6,
    rating: 4.6,
    reviews: 188,
    address: "Dispur, Guwahati 781006",
    open: false,
    updated: "3 hours ago",
    inventory: { "A+": 8,  "A-": 1,  "B+": 6,  "B-": 0,  "AB+": 2,  "AB-": 0, "O+": 11, "O-": 1 },
  },
  {
    name: "Nemcare Hospital Blood Centre",
    type: "Private · Multi-speciality",
    distance: 5.2,
    rating: 4.5,
    reviews: 142,
    address: "Bhangagarh, Guwahati 781032",
    open: true,
    updated: "44 min ago",
    inventory: { "A+": 15, "A-": 3,  "B+": 12, "B-": 2,  "AB+": 5,  "AB-": 1, "O+": 20, "O-": 4 },
  },
];

const ALL_GROUPS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

function FilterChip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 h-9 rounded-full text-[13px] font-semibold transition-colors"
      style={{
        background: active ? "#1A1A1A" : "white",
        color: active ? "white" : "#1A1A1A",
        border: `1px solid ${active ? "#1A1A1A" : "#E5E7EB"}`,
      }}
    >
      {children}
    </button>
  );
}

function FilterBar({ mobile, activeGroup, setActiveGroup, view, setView }) {
  return (
    <div className={mobile ? "px-5 py-4 bg-white border-b border-[#E5E7EB] sticky top-0 z-10" : "bg-white border-b border-[#E5E7EB] sticky top-0 z-10"}>
      <div className={mobile ? "" : "max-w-[1200px] mx-auto px-8 py-5"}>
        {!mobile && (
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1
                className="font-bold text-[#1A1A1A] tracking-tight"
                style={{ fontSize: 28, letterSpacing: "-0.02em" }}
              >
                Blood banks near Guwahati
              </h1>
              <p className="text-[13px] text-[#6B7280] mt-1">
                Showing 5 results within 10 km · Updated 12 minutes ago
              </p>
            </div>
            <div className="inline-flex rounded-[10px] border border-[#E5E7EB] p-1 bg-white">
              <button
                onClick={() => setView("list")}
                className="px-3.5 py-1.5 rounded-[7px] text-[13px] font-semibold inline-flex items-center gap-1.5"
                style={{
                  background: view === "list" ? "#1A1A1A" : "transparent",
                  color: view === "list" ? "white" : "#1A1A1A",
                }}
              >
                <Icon name="sliders" size={14} /> List
              </button>
              <button
                onClick={() => setView("map")}
                className="px-3.5 py-1.5 rounded-[7px] text-[13px] font-semibold inline-flex items-center gap-1.5"
                style={{
                  background: view === "map" ? "#1A1A1A" : "transparent",
                  color: view === "map" ? "white" : "#1A1A1A",
                }}
              >
                <Icon name="map" size={14} /> Map
              </button>
            </div>
          </div>
        )}

        {mobile && (
          <div className="flex items-center justify-between mb-3">
            <button className="h-9 w-9 grid place-items-center rounded-[8px] border border-[#E5E7EB]">
              <Icon name="arrow-left" size={16} />
            </button>
            <div className="text-[14px] font-semibold">Guwahati · 5 banks</div>
            <button className="h-9 w-9 grid place-items-center rounded-[8px] border border-[#E5E7EB]">
              <Icon name="map" size={16} />
            </button>
          </div>
        )}

        <div className={mobile ? "flex gap-2 overflow-x-auto -mx-5 px-5 pb-1" : "flex flex-wrap items-center gap-2"}>
          <FilterChip active={activeGroup === "all"} onClick={() => setActiveGroup("all")}>
            All groups
          </FilterChip>
          {ALL_GROUPS.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className="h-9 px-1 rounded-full transition-all"
            >
              <BloodBadge
                group={g}
                size="md"
                variant={activeGroup === g ? "solid" : "outline"}
              />
            </button>
          ))}
          {!mobile && <span className="h-6 w-px bg-[#E5E7EB] mx-1" />}
          {!mobile && (
            <>
              <SelectInput defaultValue="Guwahati" icon="map-pin" className="!h-9 min-w-[160px]">
                {["Guwahati","Mumbai","Delhi","Bengaluru","Kolkata","Chennai"].map(c => <option key={c}>{c}</option>)}
              </SelectInput>
              <SelectInput defaultValue="Whole blood" className="!h-9 min-w-[160px]">
                {["Whole blood","Plasma","Platelets","RBC concentrate"].map(c => <option key={c}>{c}</option>)}
              </SelectInput>
              <SelectInput defaultValue="Nearest first" className="!h-9 min-w-[160px]">
                {["Nearest first","Most units available","Recently updated","Highest rated"].map(c => <option key={c}>{c}</option>)}
              </SelectInput>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InventoryGrid({ inventory, activeGroup, mobile }) {
  return (
    <div className={`grid gap-1.5 ${mobile ? "grid-cols-4" : "grid-cols-8"}`}>
      {ALL_GROUPS.map(g => {
        const n = inventory[g];
        const isActive = activeGroup === g;
        const low = n > 0 && n < 5;
        const empty = n === 0;
        return (
          <div
            key={g}
            className="rounded-[8px] py-2 px-1.5 text-center"
            style={{
              background: isActive ? "#FCE9EA" : empty ? "#FAFAFA" : "white",
              border: `1px solid ${isActive ? "#C8232C" : "#E5E7EB"}`,
            }}
          >
            <div
              className="text-[11px] font-bold tracking-tight"
              style={{ color: isActive ? "#C8232C" : "#6B7280" }}
            >
              {g}
            </div>
            <div
              className="text-[16px] font-bold tabular-nums mt-0.5"
              style={{
                color: empty ? "#9CA3AF" : low ? "#F59E0B" : "#1A1A1A",
              }}
            >
              {n}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BankCard({ bank, activeGroup, mobile }) {
  return (
    <Card className={mobile ? "p-5" : "p-6"}>
      <div className={mobile ? "" : "grid grid-cols-12 gap-6"}>
        <div className={mobile ? "" : "col-span-7"}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[11px] font-semibold inline-flex items-center gap-1 ${
                    bank.open ? "text-[#10B981]" : "text-[#9CA3AF]"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: bank.open ? "#10B981" : "#9CA3AF" }}
                  />
                  {bank.open ? "Open now" : "Closed · opens 8:00 AM"}
                </span>
              </div>
              <h3
                className="font-semibold text-[#1A1A1A] tracking-tight"
                style={{ fontSize: mobile ? 18 : 20, letterSpacing: "-0.015em" }}
              >
                {bank.name}
              </h3>
              <p className="text-[13px] text-[#6B7280] mt-0.5">{bank.type}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[15px] font-semibold text-[#1A1A1A]">{bank.distance} km</div>
              <div className="text-[11px] text-[#9CA3AF] mt-0.5">~ {Math.round(bank.distance * 3)} min</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 text-[12px] text-[#6B7280]">
            <span className="inline-flex items-center gap-1">
              <Icon name="map-pin" size={12} /> {bank.address}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-4 text-[12px] text-[#6B7280]">
            <span className="inline-flex items-center gap-1">
              <Icon name="star" size={12} className="text-[#F59E0B]" strokeWidth={0} fill="#F59E0B" /> {bank.rating} ({bank.reviews})
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="clock" size={12} /> Updated {bank.updated}
            </span>
          </div>
        </div>

        <div className={mobile ? "mt-5 pt-5 border-t border-[#E5E7EB]" : "col-span-5 border-l border-[#E5E7EB] pl-6"}>
          <div className="flex items-center justify-between mb-2.5">
            <Eyebrow>Units available</Eyebrow>
            <span className="text-[11px] text-[#9CA3AF]">whole blood</span>
          </div>
          <InventoryGrid inventory={bank.inventory} activeGroup={activeGroup} mobile={mobile} />
          <div className={`mt-5 flex ${mobile ? "flex-col" : ""} gap-2`}>
            <Button variant="primary" size="md" className={mobile ? "w-full" : "flex-1"}>
              Request from this bank
            </Button>
            <Button variant="secondary" size="md" icon="phone" className={mobile ? "w-full" : ""}>
              Call
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MapPanel({ mobile }) {
  return (
    <div
      className={`relative rounded-[14px] overflow-hidden border border-[#E5E7EB] ${
        mobile ? "h-[260px] mx-5" : "h-full min-h-[600px] sticky top-[180px]"
      }`}
      style={{ background: "#F3F4F6" }}
    >
      {/* faux map grid */}
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
        {/* a fake river */}
        <path d="M -20 200 Q 200 140 360 220 T 720 180" stroke="#C7DDF0" strokeWidth="36" fill="none" strokeLinecap="round" />
        {/* a fake road */}
        <path d="M -20 360 L 740 280" stroke="#F3F4F6" strokeWidth="6" fill="none" />
        <path d="M 80 -20 L 200 800" stroke="#F3F4F6" strokeWidth="4" fill="none" />
      </svg>

      {/* pins */}
      {[
        { top: "32%", left: "26%", label: "1.2 km", primary: true },
        { top: "48%", left: "54%", label: "2.4 km" },
        { top: "22%", left: "68%", label: "3.1 km" },
        { top: "68%", left: "42%", label: "4.6 km" },
        { top: "60%", left: "78%", label: "5.2 km" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: p.top, left: p.left }}
        >
          <div
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap mb-1"
            style={{
              background: p.primary ? "#C8232C" : "white",
              color: p.primary ? "white" : "#1A1A1A",
              border: p.primary ? "none" : "1px solid #E5E7EB",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            {p.label}
          </div>
          <div className="flex justify-center">
            <div
              className="h-6 w-6 rounded-full grid place-items-center border-2 border-white"
              style={{
                background: p.primary ? "#C8232C" : "#1A1A1A",
                boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              <Icon name="droplet" size={11} className="text-white" />
            </div>
          </div>
        </div>
      ))}

      <div className="absolute top-3 right-3 flex flex-col bg-white rounded-[8px] border border-[#E5E7EB] overflow-hidden">
        <button className="h-9 w-9 grid place-items-center border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
          <Icon name="plus" size={14} />
        </button>
        <button className="h-9 w-9 grid place-items-center hover:bg-[#FAFAFA] text-[#6B7280] text-[16px] font-bold">
          −
        </button>
      </div>
    </div>
  );
}

function ScreenSearch({ mobile }) {
  const [activeGroup, setActiveGroup] = React.useState("A+");
  const [view, setView] = React.useState("list");
  return (
    <div className="bg-[#FAFAFA] min-h-full">
      <LandingNav mobile={mobile} />
      <FilterBar mobile={mobile} activeGroup={activeGroup} setActiveGroup={setActiveGroup} view={view} setView={setView} />

      {mobile && <MapPanel mobile />}

      <div className={mobile ? "px-5 py-6" : "max-w-[1200px] mx-auto px-8 py-8"}>
        <div className={mobile ? "grid gap-4" : "grid grid-cols-12 gap-6"}>
          <div className={mobile ? "" : "col-span-7 grid gap-4"}>
            {BANKS.map(b => (
              <BankCard key={b.name} bank={b} activeGroup={activeGroup} mobile={mobile} />
            ))}

            {/* empty state demo (hidden behind a divider) */}
            <Card className={mobile ? "p-6 text-center" : "p-10 text-center"}>
              <div className="mx-auto h-14 w-14 rounded-full bg-[#FCE9EA] grid place-items-center mb-4">
                <Icon name="search" size={22} className="text-[#C8232C]" />
              </div>
              <h3 className="font-semibold text-[#1A1A1A] text-[18px] tracking-tight">
                Need a rarer group?
              </h3>
              <p className="text-[14px] text-[#6B7280] mt-1.5 max-w-[420px] mx-auto">
                If you can't find AB− or O− nearby, post a request — RaktSetu will broadcast it to compatible donors in real time.
              </p>
              <div className={`mt-5 inline-flex ${mobile ? "flex-col" : ""} gap-2`}>
                <Button variant="primary" size="md" iconRight="arrow-right">Post a blood request</Button>
                <Button variant="ghost" size="md">Widen search radius</Button>
              </div>
            </Card>
          </div>
          {!mobile && (
            <div className="col-span-5">
              <MapPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenSearch });
