/* RaktSetu — Single Request Detail, requester view (Screen 10) */

const REQUESTER_USER_10 = window.REQUESTER_USER || (window.REQUESTER_USER = {
  name: "Rohit Sharma",
  email: "rohit.sharma@gmail.com",
});

const TIMELINE_STEPS = [
  { label: "Pending",        sub: "Posted to RaktSetu" },
  { label: "Matched",        sub: "Donors responding" },
  { label: "Donor Assigned", sub: "Bank confirms 2 of 2" },
  { label: "Fulfilled",      sub: "Transfusion done" },
];

const PLEDGED_DONORS = [
  { name: "Vikram Singh",   group: "O-", distance: 0.8, pledged: "8 min ago",  eta: 12, state: "confirmed" },
  { name: "Priya Menon",    group: "A+", distance: 2.1, pledged: "23 min ago", eta: 18, state: "confirmed" },
  { name: "Rohan Das",      group: "O+", distance: 3.4, pledged: "1 hr ago",   eta: 24, state: "waiting" },
  { name: "Sneha Patel",    group: "A-", distance: 4.2, pledged: "1 hr ago",   eta: 28, state: "waiting" },
];

const ACTIVITY = [
  { when: "Just now",  icon: "users", tone: "#7C3AED", text: <>Sneha Patel (A−) pledged from <strong>4.2 km</strong> away — 4th donor responding.</> },
  { when: "12 min",    icon: "check-circle", tone: "#10B981", text: <>GMC Blood Bank confirmed <strong>Vikram Singh (O−)</strong> as assigned donor for unit 1.</> },
  { when: "23 min",    icon: "users", tone: "#7C3AED", text: <>Priya Menon (A+) pledged from <strong>2.1 km</strong> away.</> },
  { when: "32 min",    icon: "hospital", tone: "#3B82F6", text: <>GMC Blood Bank reserved <strong>1 unit of A+</strong> from on-hand inventory.</> },
  { when: "44 min",    icon: "bell", tone: "#F59E0B", text: <>Request escalated to <strong>Critical</strong> · push + SMS sent to 28 donors within 5 km.</> },
  { when: "1 hr",      icon: "droplet", tone: "#C8232C", text: <>Request created and matched with <strong>GMC Blood Bank</strong>.</> },
];

function RequesterMap({ mobile }) {
  return (
    <div
      className="relative rounded-[12px] overflow-hidden border border-[#E5E7EB]"
      style={{ background: "#F3F4F6", height: mobile ? 180 : 220 }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="rgrid10" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#E5E7EB" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rgrid10)" />
        <path d="M -20 140 Q 200 60 400 100 T 720 80" stroke="#C7DDF0" strokeWidth="22" fill="none" />
      </svg>
      <div className="absolute" style={{ top: "55%", left: "50%", transform: "translate(-50%,-100%)" }}>
        <div className="bg-white rounded-lg border border-[#E5E7EB] px-2.5 py-1.5 flex items-center gap-2 whitespace-nowrap" style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <span className="h-5 w-5 grid place-items-center rounded bg-[#C8232C]">
            <Icon name="droplet" size={10} className="text-white" />
          </span>
          <div>
            <div className="text-[11px] font-semibold text-[#1A1A1A] leading-none">GMC Blood Bank</div>
            <div className="text-[9.5px] text-[#6B7280] mt-0.5">Bhangagarh · 1.2 km</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestSummaryCard() {
  const facts = [
    ["Patient",  "Ayesha · 42y / Female"],
    ["Condition","Emergency cardiac surgery"],
    ["Component","Whole blood"],
    ["Needed by","Today, 6:00 PM"],
    ["Hospital", "GMC Hospital, Bhangagarh"],
    ["Posted",   "1 hour ago · #RS-29481"],
  ];
  return (
    <Card className="p-6">
      <SectionHeader eyebrow="Request" title="Summary" action={<button className="text-[12px] font-semibold text-[#6B7280] hover:text-[#1A1A1A]">Edit</button>} />
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {facts.map(([k, v]) => (
          <div key={k}>
            <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#9CA3AF]">{k}</div>
            <div className="text-[13.5px] font-semibold text-[#1A1A1A] mt-1">{v}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MatchedDonorsCard({ mobile }) {
  return (
    <Card className="p-6">
      <SectionHeader
        eyebrow="Donors responding · live"
        title="4 donors have pledged"
        action={<span className="text-[11px] text-[#9CA3AF] inline-flex items-center gap-1.5"><span className="rs-pulse h-1.5 w-1.5 rounded-full bg-[#10B981]" /> updates every 10s</span>}
      />
      <div className="grid gap-2">
        {PLEDGED_DONORS.map(d => (
          <div key={d.name} className="flex items-center gap-3 py-3 border-b border-[#E5E7EB] last:border-0">
            <Avatar name={d.name} size={40} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-[13.5px] font-semibold text-[#1A1A1A] truncate">{d.name}</div>
                {d.state === "confirmed" && (
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46]">
                    <Icon name="check" size={10} strokeWidth={3} /> Bank confirmed
                  </span>
                )}
                {d.state === "waiting" && (
                  <span className="text-[10.5px] text-[#9CA3AF] font-medium">awaiting confirm</span>
                )}
              </div>
              <div className="text-[11.5px] text-[#6B7280] mt-0.5 flex items-center gap-3">
                <span>{d.distance} km away</span>
                <span>·</span>
                <span>ETA ~ {d.eta} min</span>
                <span>·</span>
                <span>pledged {d.pledged}</span>
              </div>
            </div>
            <BloodBadge group={d.group} size="sm" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-[#6B7280] inline-flex items-center gap-1.5">
        <Icon name="shield-check" size={13} className="text-[#10B981]" />
        Donor identities stay with the bank · you'll only see them after a successful transfusion.
      </p>
    </Card>
  );
}

function BankContactCard({ mobile }) {
  return (
    <Card className="p-6">
      <SectionHeader eyebrow="Coordinating" title="GMC Blood Bank" />
      <RequesterMap mobile={mobile} />
      <div className="mt-4 grid gap-3">
        <div className="flex items-start gap-3">
          <Icon name="map-pin" size={14} className="text-[#6B7280] mt-0.5" />
          <div className="text-[13px] text-[#1A1A1A]">
            Old GMCH Road, Bhangagarh, Guwahati 781032
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="phone" size={14} className="text-[#6B7280] mt-0.5" />
          <div className="text-[13px] text-[#1A1A1A]">
            +91 361 252 8417
            <span className="text-[11.5px] text-[#6B7280]"> · 24 / 7 reception</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="user" size={14} className="text-[#6B7280] mt-0.5" />
          <div className="text-[13px] text-[#1A1A1A]">
            Coordinator: <span className="font-semibold">Dr. Rashmi Sharma</span>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button variant="primary" size="md" icon="phone">Call coordinator</Button>
        <Button variant="secondary" size="md" icon="map">Open in Maps</Button>
      </div>
    </Card>
  );
}

function ActivityFeed({ mobile }) {
  return (
    <Card className="p-6">
      <SectionHeader
        eyebrow="Activity"
        title="What's happening"
        action={<button className="text-[12px] font-semibold text-[#6B7280] hover:text-[#1A1A1A]">All updates</button>}
      />
      <ol className="relative">
        {ACTIVITY.map((a, i) => {
          const isLast = i === ACTIVITY.length - 1;
          return (
            <li key={i} className="relative pl-9 pb-4 last:pb-0">
              {!isLast && (
                <span className="absolute left-[14px] top-7 bottom-0 w-px bg-[#E5E7EB]" />
              )}
              <span
                className="absolute left-0 top-0.5 h-7 w-7 rounded-full grid place-items-center"
                style={{ background: `${a.tone}1a`, color: a.tone }}
              >
                <Icon name={a.icon} size={13} />
              </span>
              <div className="text-[13px] text-[#1A1A1A] leading-snug">{a.text}</div>
              <div className="text-[11.5px] text-[#9CA3AF] mt-0.5">{a.when} ago</div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

function ScreenRequestDetail({ mobile }) {
  return (
    <AppShell
      role="requester"
      active="my"
      user={REQUESTER_USER_10}
      mobile={mobile}
      subtitle="Request · #RS-29481 · posted 1 hr ago"
      title="2 units of A+ for Ayesha"
      actions={
        !mobile && (
          <>
            <Button variant="ghost" size="md" icon="share">Share</Button>
            <Button variant="secondary" size="md" icon="arrow-left">Back to list</Button>
          </>
        )
      }
    >
      <div className="grid gap-6">
        {/* status timeline */}
        <Card className={mobile ? "p-5" : "p-7"}>
          <div className={mobile ? "" : "flex items-start gap-8"}>
            <div className={mobile ? "mb-5" : "shrink-0"}>
              <Eyebrow>Progress</Eyebrow>
              <div className="mt-2 flex items-baseline gap-3">
                <BloodBadge group="A+" size="lg" />
                <div>
                  <div className="font-bold text-[#1A1A1A] tracking-tight" style={{ fontSize: 24, letterSpacing: "-0.02em" }}>
                    1 of 2 units
                  </div>
                  <div className="text-[12.5px] text-[#6B7280]">secured · 1 more needed</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <StatusBadge status="matched" />
                <UrgencyBadge level="critical" />
              </div>
            </div>
            <div className="flex-1 pt-1">
              {mobile ? (
                <StatusTimeline steps={TIMELINE_STEPS} current={1} vertical />
              ) : (
                <StatusTimeline steps={TIMELINE_STEPS} current={1} />
              )}
            </div>
          </div>
        </Card>

        <div className={mobile ? "grid gap-6" : "grid grid-cols-12 gap-6"}>
          <div className={mobile ? "" : "col-span-8 grid gap-6"}>
            <RequestSummaryCard />
            <MatchedDonorsCard mobile={mobile} />
            <ActivityFeed mobile={mobile} />
          </div>
          <aside className={mobile ? "" : "col-span-4 grid gap-6"}>
            <BankContactCard mobile={mobile} />
            <Card className="p-5 bg-[#FAFAFA]">
              <SectionHeader eyebrow="Need to stop" title="Cancel this request" />
              <p className="text-[12.5px] text-[#6B7280] leading-[1.55]">
                Only cancel if blood is no longer needed. We'll notify pledged donors immediately and free up reserved units for other patients.
              </p>
              <Button variant="outlineDanger" size="md" className="w-full mt-4">
                Cancel request
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

Object.assign(window, { ScreenRequestDetail });
