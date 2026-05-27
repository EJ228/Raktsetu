/* RaktSetu — Donor Dashboard (Screen 5) */

const DONOR_USER = window.DONOR_USER || (window.DONOR_USER = {
  name: "Anushka Bhattacharya",
  email: "anushka.b@gmail.com",
  group: "O+",
  city: "Guwahati",
});

const URGENT_NEAR = [
  {
    group: "A+",
    units: 2,
    level: "critical",
    hospital: "GMC Hospital",
    location: "Bhangagarh, Guwahati",
    distance: 1.2,
    eta: 12,
    posted: "8 min ago",
    by: "Dr. Rashmi Sharma",
    note: "Post-surgical patient, surgery in 4 hours.",
  },
  {
    group: "O+",
    units: 1,
    level: "urgent",
    hospital: "Apollo Hospitals Blood Centre",
    location: "Christian Basti, Guwahati",
    distance: 2.4,
    eta: 18,
    posted: "32 min ago",
    by: "Apollo blood bank",
    note: "Thalassaemia patient · regular monthly transfusion.",
  },
  {
    group: "B+",
    units: 3,
    level: "urgent",
    hospital: "Down Town Hospital",
    location: "Dispur, Guwahati",
    distance: 4.6,
    eta: 22,
    posted: "1 hr ago",
    by: "Down Town blood bank",
    note: "Accident victim · ICU.",
  },
  {
    group: "AB+",
    units: 1,
    level: "normal",
    hospital: "Nemcare Hospital",
    location: "Bhangagarh, Guwahati",
    distance: 5.2,
    eta: 26,
    posted: "3 hrs ago",
    by: "Nemcare blood bank",
    note: "Scheduled chemotherapy patient.",
  },
];

const DONATIONS = [
  { date: "12 Feb 2026", place: "Red Cross Society · Guwahati", group: "O+", units: 1, status: "Completed" },
  { date: "21 Oct 2025", place: "GMC Hospital · Guwahati",     group: "O+", units: 1, status: "Completed" },
  { date: "04 Jun 2025", place: "Apollo Hospitals · Bengaluru", group: "O+", units: 1, status: "Completed" },
  { date: "02 Feb 2025", place: "Voluntary drive · IIT Guwahati", group: "O+", units: 1, status: "Completed" },
  { date: "16 Aug 2024", place: "Red Cross Society · Guwahati", group: "O+", units: 1, status: "Completed" },
];

function EligibilityCard({ mobile }) {
  return (
    <div
      className={`relative rounded-[16px] overflow-hidden ${mobile ? "p-6" : "p-8"}`}
      style={{
        background: "linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%)",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
      }}
    >
      <div className={mobile ? "" : "flex items-center gap-8"}>
        <div className={mobile ? "flex items-center gap-4 mb-4" : "shrink-0"}>
          <div
            className="h-16 w-16 rounded-full grid place-items-center"
            style={{ background: "#D1FAE5", color: "#065F46" }}
          >
            <Icon name="check-circle" size={28} strokeWidth={2.4} />
          </div>
          {mobile && (
            <div>
              <Eyebrow className="!text-[#065F46]">Eligibility · Cleared</Eyebrow>
              <div className="text-[18px] font-bold text-[#1A1A1A] tracking-tight mt-0.5">
                You can donate today
              </div>
            </div>
          )}
        </div>
        {!mobile && (
          <div className="flex-1">
            <Eyebrow className="!text-[#065F46]">Eligibility · Cleared</Eyebrow>
            <h2
              className="font-bold text-[#1A1A1A] tracking-tight mt-1.5"
              style={{ fontSize: 28, letterSpacing: "-0.02em" }}
            >
              You're eligible to donate today.
            </h2>
            <p className="text-[14px] text-[#6B7280] mt-2 max-w-[520px]">
              It's been <strong className="text-[#1A1A1A]">94 days</strong> since your last donation at Red Cross Society. The minimum gap is 90 days for whole blood.
            </p>
          </div>
        )}
        <div className={mobile ? "" : "shrink-0 flex flex-col items-end gap-3"}>
          <div className={`flex items-center gap-3 ${mobile ? "" : "justify-end"}`}>
            <BloodBadge group={DONOR_USER.group} size="lg" />
            <div className={mobile ? "text-left" : "text-right"}>
              <div className="text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF] font-semibold">Your group</div>
              <div className="text-[14px] font-semibold text-[#1A1A1A]">Universal plasma donor</div>
            </div>
          </div>
          <div className={`flex gap-2 ${mobile ? "mt-4 w-full" : ""}`}>
            <Button variant="primary" size="md" className={mobile ? "flex-1" : ""}>
              Find a drive near me
            </Button>
            <Button variant="secondary" size="md" icon="calendar">
              Pause requests
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactStrip({ mobile }) {
  return (
    <div className={`grid gap-4 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}>
      <KpiCard
        icon="droplet"
        value="5"
        label="Lifetime donations"
        sub="≈ 2,250 ml whole blood given"
        trend={{ dir: "up", label: "+1 this quarter" }}
      />
      <KpiCard
        icon="heart"
        value="14"
        label="Lives potentially impacted"
        sub="Each unit can help up to 3 patients"
        trend={{ dir: "up", label: "Top 4% of donors" }}
      />
      <KpiCard
        icon="map-pin"
        value="0.9 km"
        label="Nearest blood drive"
        sub="IIT Guwahati · Sat, 16 May · 10:00 AM"
      />
    </div>
  );
}

function UrgentRequestCard({ r, mobile }) {
  const groupTone = r.level === "critical" ? "#DC2626" : r.level === "urgent" ? "#F59E0B" : "#9CA3AF";
  return (
    <Card className="p-5 hover:border-[#1A1A1A]/25 transition-colors">
      <div className="flex items-start gap-4">
        <div className="shrink-0 flex flex-col items-center">
          <BloodBadge group={r.group} size="lg" />
          <div className="mt-2 text-[11px] text-[#9CA3AF] font-medium">{r.units}u needed</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <UrgencyBadge level={r.level} />
            <span className="text-[11px] text-[#9CA3AF]">posted {r.posted}</span>
            {r.level === "critical" && (
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: groupTone }}
              >
                · Compatibility match
              </span>
            )}
          </div>
          <h4 className="text-[15px] font-semibold text-[#1A1A1A] leading-snug">
            {r.units} unit{r.units > 1 ? "s" : ""} of {r.group} at {r.hospital}
          </h4>
          <p className="text-[13px] text-[#6B7280] mt-1 leading-snug">
            {r.note}
          </p>
          <div className={`mt-3 flex items-center gap-4 text-[12px] text-[#6B7280] ${mobile ? "flex-wrap" : ""}`}>
            <span className="inline-flex items-center gap-1">
              <Icon name="map-pin" size={12} /> {r.location} · {r.distance} km
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="clock" size={12} /> ~ {r.eta} min away
            </span>
          </div>
        </div>
        {!mobile && (
          <div className="shrink-0 flex flex-col gap-2 items-end">
            <Button variant="primary" size="md">View &amp; pledge</Button>
            <button className="text-[12px] text-[#6B7280] hover:text-[#1A1A1A] font-medium">
              Share request →
            </button>
          </div>
        )}
      </div>
      {mobile && (
        <div className="mt-4 flex gap-2">
          <Button variant="primary" size="md" className="flex-1">View &amp; pledge</Button>
          <Button variant="secondary" size="md" icon="share">Share</Button>
        </div>
      )}
    </Card>
  );
}

function DonationHistoryItem({ d, mobile }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#E5E7EB] last:border-0">
      <div className="h-10 w-10 rounded-full bg-[#FCE9EA] grid place-items-center shrink-0">
        <Icon name="droplet" size={14} className="text-[#C8232C]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-[#1A1A1A] truncate">{d.place}</div>
        <div className="text-[11.5px] text-[#6B7280] flex items-center gap-2">
          <span>{d.date}</span>
          <span>·</span>
          <span>{d.units} unit</span>
        </div>
      </div>
      <button
        className="h-8 w-8 grid place-items-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A1A]"
        title="Download certificate"
      >
        <Icon name="arrow-right" size={14} />
      </button>
    </div>
  );
}

function ScreenDonorDashboard({ mobile }) {
  return (
    <AppShell
      role="donor"
      active="dashboard"
      user={DONOR_USER}
      mobile={mobile}
      subtitle="Good evening"
      title="Anushka, your help is needed nearby."
      actions={
        !mobile && (
          <Button variant="primary" size="md" icon="droplet">
            Log a donation
          </Button>
        )
      }
    >
      <div className={`grid gap-${mobile ? "5" : "6"}`}>
        <EligibilityCard mobile={mobile} />
        <ImpactStrip mobile={mobile} />

        <div className={mobile ? "grid gap-6" : "grid grid-cols-12 gap-6"}>
          <section className={mobile ? "" : "col-span-8"}>
            <SectionHeader
              eyebrow="Real-time · 4 matches in your radius"
              title="Urgent requests near you"
              action={
                !mobile && (
                  <a href="#" className="text-[13px] font-semibold text-[#1A1A1A] inline-flex items-center gap-1">
                    See all 12 <Icon name="arrow-right" size={14} />
                  </a>
                )
              }
            />
            <div className="grid gap-3">
              {URGENT_NEAR.map((r, i) => (
                <UrgentRequestCard key={i} r={r} mobile={mobile} />
              ))}
            </div>
          </section>

          <aside className={mobile ? "" : "col-span-4 flex flex-col gap-6"}>
            <Card className="p-5">
              <SectionHeader
                title="Donation history"
                action={
                  <a href="#" className="text-[12px] font-semibold text-[#1A1A1A]">
                    All
                  </a>
                }
              />
              <div className="grid">
                {DONATIONS.map((d, i) => (
                  <DonationHistoryItem key={i} d={d} mobile={mobile} />
                ))}
              </div>
              <Button variant="secondary" size="sm" className="w-full mt-4" icon="check-circle">
                Download donor card
              </Button>
            </Card>

            {!mobile && (
              <Card className="p-5">
                <SectionHeader title="Your donor streak" />
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {Array.from({ length: 42 }).map((_, i) => {
                    const active = [3, 5, 8, 10, 12, 14, 20, 22, 25, 31, 35, 38].includes(i);
                    return (
                      <div
                        key={i}
                        className="aspect-square rounded-[4px]"
                        style={{
                          background: active ? "#C8232C" : "#F3F4F6",
                          opacity: active ? 0.4 + (i % 5) * 0.15 : 1,
                        }}
                      />
                    );
                  })}
                </div>
                <p className="text-[12px] text-[#6B7280] leading-[1.55]">
                  You've donated <strong className="text-[#1A1A1A]">3 times in the past 6 months</strong> — well above the national median of 1.2.
                </p>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

Object.assign(window, { ScreenDonorDashboard });
