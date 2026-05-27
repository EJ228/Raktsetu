/* RaktSetu — Request Detail / Pledge page, donor view (Screen 7) */

const DONOR_USER = window.DONOR_USER || (window.DONOR_USER = {
  name: "Anushka Bhattacharya",
  email: "anushka.b@gmail.com",
  group: "O+",
  city: "Guwahati",
});

function PledgeMap({ mobile }) {
  return (
    <div
      className={`relative rounded-[14px] overflow-hidden border border-[#E5E7EB]`}
      style={{ background: "#F3F4F6", height: mobile ? 200 : 260 }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pledgeGrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#E5E7EB" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pledgeGrid)" />
        <path d="M 40 220 Q 200 80 360 200 T 720 140" stroke="#C7DDF0" strokeWidth="28" fill="none" strokeLinecap="round" />
        <path d="M -20 180 L 720 240" stroke="#FFFFFF" strokeWidth="5" fill="none" />
      </svg>

      {/* route line from you → hospital */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 15% 70% Q 38% 50% 50% 45% Q 70% 30% 80% 28%"
          stroke="#C8232C"
          strokeWidth="3"
          strokeDasharray="6 6"
          fill="none"
        />
      </svg>

      {/* you */}
      <div className="absolute" style={{ top: "70%", left: "15%", transform: "translate(-50%, -50%)" }}>
        <div className="relative">
          <div className="rs-ping absolute inset-0 rounded-full bg-[#1A1A1A]/20" />
          <div className="h-4 w-4 rounded-full bg-[#1A1A1A] border-2 border-white relative" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }} />
        </div>
        <div className="text-[10.5px] font-semibold text-[#1A1A1A] bg-white rounded px-1.5 py-0.5 mt-1 inline-block" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
          You
        </div>
      </div>

      {/* hospital */}
      <div className="absolute" style={{ top: "28%", left: "80%", transform: "translate(-50%, -100%)" }}>
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-2 flex items-center gap-2 whitespace-nowrap" style={{ boxShadow: "0 6px 14px -4px rgba(0,0,0,0.15)" }}>
          <span className="h-6 w-6 grid place-items-center rounded-[6px] bg-[#C8232C]">
            <Icon name="droplet" size={11} className="text-white" />
          </span>
          <div>
            <div className="text-[11.5px] font-semibold text-[#1A1A1A] leading-none">GMC Hospital</div>
            <div className="text-[9.5px] text-[#6B7280] mt-0.5">Bhangagarh · 1.2 km</div>
          </div>
        </div>
        <div className="flex justify-center mt-1">
          <div className="h-3 w-3 rounded-full bg-[#C8232C] border-2 border-white" style={{ boxShadow: "0 4px 8px rgba(200,35,44,0.4)" }} />
        </div>
      </div>

      {/* distance/eta tags */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 border border-[#E5E7EB]" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <Icon name="map-pin" size={12} className="text-[#1A1A1A]" />
          <span className="text-[11.5px] font-semibold">1.2 km</span>
          <span className="text-[11px] text-[#6B7280]">· by road</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 border border-[#E5E7EB]" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <Icon name="clock" size={12} className="text-[#1A1A1A]" />
          <span className="text-[11.5px] font-semibold">~ 12 min</span>
          <span className="text-[11px] text-[#6B7280]">· moderate traffic</span>
        </div>
      </div>
    </div>
  );
}

function CompatibilityCallout() {
  return (
    <Card className="p-5 border-l-4 border-l-[#10B981]" style={{ borderLeftColor: "#10B981" }}>
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-[#D1FAE5] grid place-items-center shrink-0">
          <Icon name="check-circle" size={18} className="text-[#10B981]" strokeWidth={2.2} />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#065F46]">
            Compatibility confirmed
          </div>
          <h4 className="text-[15px] font-semibold text-[#1A1A1A] mt-0.5">
            Your O+ blood is compatible with this A+ recipient.
          </h4>
          <p className="text-[12.5px] text-[#6B7280] mt-1.5 leading-[1.55]">
            O+ donors can give to all Rh-positive groups. The blood bank will perform a final cross-match before transfusion.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <BloodBadge group="O+" size="sm" /> 
            <Icon name="arrow-right" size={14} className="text-[#9CA3AF]" />
            <BloodBadge group="A+" size="sm" variant="ghost" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function RequestSummary() {
  const facts = [
    { label: "Blood group needed", value: <BloodBadge group="A+" size="md" /> },
    { label: "Units needed",       value: <span className="font-semibold text-[#1A1A1A]">2 units</span> },
    { label: "Component",          value: <span className="font-semibold text-[#1A1A1A]">Whole blood</span> },
    { label: "Needed by",          value: <span className="font-semibold text-[#1A1A1A]">Today, 6:00 PM</span> },
    { label: "Patient",            value: <span className="font-semibold text-[#1A1A1A]">Anonymous · 42 y / M</span> },
    { label: "Condition",          value: <span className="font-semibold text-[#1A1A1A]">Cardiac surgery</span> },
  ];
  return (
    <Card className="p-6">
      <SectionHeader eyebrow="Request #RS-29481" title="What's needed" />
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {facts.map(f => (
          <div key={f.label} className="flex items-center justify-between gap-4">
            <span className="text-[12.5px] text-[#6B7280]">{f.label}</span>
            {f.value}
          </div>
        ))}
      </div>
    </Card>
  );
}

function BankCard({ mobile }) {
  return (
    <Card className={mobile ? "p-5" : "p-6"}>
      <SectionHeader eyebrow="Where to go" title="GMC Blood Bank" />
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-[10px] bg-[#FAFAFA] grid place-items-center shrink-0">
          <Icon name="hospital" size={18} className="text-[#1A1A1A]" />
        </div>
        <div className="flex-1">
          <div className="text-[14.5px] font-semibold text-[#1A1A1A]">Govt. Medical College, Bhangagarh</div>
          <div className="text-[12.5px] text-[#6B7280] mt-0.5">
            Old GMCH Road, Bhangagarh, Guwahati 781032
          </div>
          <div className="text-[12px] text-[#6B7280] mt-2 flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" /> Open 24 / 7 · Reception desk 2
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="phone" size={12} /> +91 361 252 8417
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="secondary" size="sm" icon="phone">Call bank</Button>
        <Button variant="secondary" size="sm" icon="map">Open in Maps</Button>
      </div>
    </Card>
  );
}

function NextSteps({ mobile }) {
  const steps = [
    { label: "Pledge here on RaktSetu", sub: "1-tap, lets the bank know to expect you." },
    { label: "Carry a govt. ID & your donor card", sub: "Aadhaar or PAN works. Donor card is on your profile." },
    { label: "Reach the bank by 5:00 PM today", sub: "The patient is scheduled for transfusion at 6 PM." },
    { label: "Donation takes ~ 30 minutes",      sub: "You'll be observed for 10 mins after. Drink water." },
  ];
  return (
    <Card className={mobile ? "p-5" : "p-6"}>
      <SectionHeader eyebrow="What happens next" title="Four small steps" />
      <StatusTimeline
        steps={steps}
        current={0}
        vertical={true}
      />
    </Card>
  );
}

function StickyPledgeBar({ mobile }) {
  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-5 py-3 flex items-center gap-3 z-30">
        <div className="flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">Critical</div>
          <div className="text-[13px] font-semibold text-[#1A1A1A]">2 units of A+ · 1.2 km</div>
        </div>
        <Button variant="primary" size="md" className="flex-1">I can donate</Button>
      </div>
    );
  }
  return null;
}

function OtherDonors() {
  const others = [
    { name: "Vikram Singh", group: "O-", distance: 0.8, time: "3 min ago" },
    { name: "Priya Menon",  group: "A+", distance: 2.1, time: "11 min ago" },
    { name: "Rohan Das",    group: "O+", distance: 3.4, time: "26 min ago" },
  ];
  return (
    <Card className="p-6">
      <SectionHeader
        eyebrow="Others responding"
        title="3 donors have pledged so far"
        action={<span className="text-[11px] text-[#9CA3AF]">Live · updates every 10s</span>}
      />
      <div className="grid gap-3">
        {others.map(o => (
          <div key={o.name} className="flex items-center gap-3 py-2 border-b border-[#E5E7EB] last:border-0">
            <Avatar name={o.name} size={36} />
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-semibold text-[#1A1A1A] truncate">{o.name}</div>
              <div className="text-[11.5px] text-[#6B7280]">{o.distance} km away · pledged {o.time}</div>
            </div>
            <BloodBadge group={o.group} size="sm" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-[#6B7280] leading-[1.55]">
        The bank usually accepts the first 2–3 confirmed donors. Pledging early helps the team plan, even if not every donor is finally needed.
      </p>
    </Card>
  );
}

function ScreenPledge({ mobile }) {
  return (
    <AppShell
      role="donor"
      active="requests"
      user={DONOR_USER}
      mobile={mobile}
      subtitle="Request · posted 8 min ago"
      title="2 units of A+ at GMC Hospital"
      actions={
        !mobile && (
          <>
            <Button variant="ghost" size="md" icon="share">Share</Button>
            <Button variant="secondary" size="md" icon="arrow-left">Back to list</Button>
          </>
        )
      }
    >
      <div className={mobile ? "grid gap-5 pb-20" : "grid grid-cols-12 gap-6"}>
        <div className={mobile ? "" : "col-span-8 grid gap-6"}>
          {/* hero block */}
          <Card className={mobile ? "p-5" : "p-7"}>
            <div className="flex items-start gap-5">
              <BloodBadge group="A+" size="xl" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <UrgencyBadge level="critical" />
                  <span className="text-[11px] text-[#9CA3AF]">posted 8 min ago by Dr. Rashmi Sharma</span>
                </div>
                <h1
                  className="font-bold text-[#1A1A1A] tracking-tight mt-2.5"
                  style={{ fontSize: mobile ? 24 : 30, letterSpacing: "-0.025em", lineHeight: 1.15 }}
                >
                  Patient needs 2 units before 6 PM today
                </h1>
                <p className="text-[14px] text-[#6B7280] mt-2.5 leading-[1.6] max-w-[560px]">
                  A 42-year-old male is scheduled for emergency cardiac surgery this evening. The hospital has 1 unit on hand and needs 2 more A+ units secured before they can begin.
                </p>
                {!mobile && (
                  <div className="mt-5 flex gap-3">
                    <Button variant="primary" size="lg" icon="droplet">
                      I can donate
                    </Button>
                    <Button variant="secondary" size="lg" icon="share">
                      Share this request
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <CompatibilityCallout />
          <RequestSummary />

          <Card className={mobile ? "p-5" : "p-6"}>
            <SectionHeader eyebrow="Getting there" title="Route &amp; ETA" />
            <PledgeMap mobile={mobile} />
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF] font-semibold">Distance</div>
                <div className="text-[18px] font-bold text-[#1A1A1A] mt-1">1.2 km</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF] font-semibold">ETA</div>
                <div className="text-[18px] font-bold text-[#1A1A1A] mt-1">~ 12 min</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF] font-semibold">Best mode</div>
                <div className="text-[18px] font-bold text-[#1A1A1A] mt-1">Auto / cab</div>
              </div>
            </div>
          </Card>

          <NextSteps mobile={mobile} />
        </div>

        <aside className={mobile ? "" : "col-span-4 grid gap-6"}>
          <BankCard mobile={mobile} />
          <OtherDonors />

          {!mobile && (
            <Card className="p-5 bg-[#FAFAFA]">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-white grid place-items-center border border-[#E5E7EB] shrink-0">
                  <Icon name="shield-check" size={14} className="text-[#10B981]" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#1A1A1A]">Your identity stays private</div>
                  <p className="text-[12px] text-[#6B7280] mt-1 leading-[1.55]">
                    The patient or their family won't see your phone number unless you choose to share it. Hospital staff get only what's needed to coordinate your donation.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </aside>
      </div>
      <StickyPledgeBar mobile={mobile} />
    </AppShell>
  );
}

Object.assign(window, { ScreenPledge });
