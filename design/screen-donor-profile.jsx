/* RaktSetu — Donor Profile & Settings (Screen 6) */

const DONOR_USER = window.DONOR_USER || (window.DONOR_USER = {
  name: "Anushka Bhattacharya",
  email: "anushka.b@gmail.com",
  group: "O+",
  city: "Guwahati",
});

function ProfileHeader({ mobile }) {
  return (
    <Card className={mobile ? "p-5" : "p-7"}>
      <div className={mobile ? "flex flex-col items-center text-center" : "flex items-start gap-6"}>
        <div className="relative">
          <Avatar name="Anushka Bhattacharya" size={mobile ? 80 : 96} />
          <button
            className="absolute -bottom-1 -right-1 h-7 w-7 grid place-items-center rounded-full bg-white border border-[#E5E7EB]"
            title="Upload photo"
          >
            <Icon name="plus" size={14} className="text-[#1A1A1A]" />
          </button>
        </div>
        <div className={`flex-1 ${mobile ? "mt-4" : ""}`}>
          <div className={`flex items-center gap-3 ${mobile ? "justify-center" : ""}`}>
            <h2
              className="font-bold text-[#1A1A1A] tracking-tight"
              style={{ fontSize: mobile ? 22 : 26, letterSpacing: "-0.02em" }}
            >
              Anushka Bhattacharya
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-[#D1FAE5] text-[#065F46]">
              <Icon name="check-circle" size={11} /> Verified
            </span>
          </div>
          <div className={`mt-2 flex items-center gap-3 ${mobile ? "justify-center flex-wrap" : ""} text-[13px] text-[#6B7280]`}>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="map-pin" size={13} /> Bhangagarh, Guwahati
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" size={13} /> Donor since Aug 2024
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="droplet" size={13} /> 5 donations
            </span>
          </div>
          <div className={`mt-4 flex gap-2 ${mobile ? "justify-center flex-wrap" : ""}`}>
            <Button variant="secondary" size="sm" icon="user">Edit profile</Button>
            <Button variant="ghost" size="sm" icon="share">Share donor card</Button>
          </div>
        </div>
        <div className={`${mobile ? "mt-5" : "shrink-0"}`}>
          <div
            className="rounded-[14px] p-4 text-center"
            style={{ background: "linear-gradient(180deg,#C8232C 0%,#8B1A20 100%)", color: "white" }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-80">Blood group</div>
            <div className="font-bold tracking-tight mt-1" style={{ fontSize: 44, letterSpacing: "-0.03em", lineHeight: 1 }}>
              O+
            </div>
            <div className="mt-1.5 text-[11px] font-medium opacity-90">Universal Rh+ donor</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SettingsTabs({ active, setActive, mobile }) {
  const tabs = [
    { id: "personal", label: "Personal", icon: "user" },
    { id: "medical", label: "Medical", icon: "shield-check" },
    { id: "availability", label: "Availability", icon: "clock" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "security", label: "Security", icon: "shield-check" },
  ];
  return (
    <div className={`flex ${mobile ? "gap-1 overflow-x-auto -mx-5 px-5 pb-1" : "gap-1 border-b border-[#E5E7EB]"}`}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`h-10 px-4 inline-flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap ${
              mobile ? "rounded-full border" : "border-b-2 -mb-px"
            }`}
            style={
              mobile
                ? {
                    background: on ? "#1A1A1A" : "white",
                    color: on ? "white" : "#1A1A1A",
                    borderColor: on ? "#1A1A1A" : "#E5E7EB",
                  }
                : {
                    color: on ? "#1A1A1A" : "#6B7280",
                    borderColor: on ? "#C8232C" : "transparent",
                  }
            }
          >
            <Icon name={t.icon} size={14} /> {t.label}
          </button>
        );
      })}
    </div>
  );
}

function PersonalPanel({ mobile }) {
  const GROUPS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
  return (
    <div className="grid gap-6">
      <Card className={mobile ? "p-5" : "p-6"}>
        <SectionHeader eyebrow="Identity" title="Basic information" />
        <div className={`grid gap-5 ${mobile ? "" : "grid-cols-2"}`}>
          <Field label="Full name"><TextInput defaultValue="Anushka Bhattacharya" icon="user" /></Field>
          <Field label="Email"><TextInput defaultValue="anushka.b@gmail.com" icon="mail" /></Field>
          <Field label="Phone (verified)"><TextInput defaultValue="+91 98640 22184" icon="phone" /></Field>
          <Field label="Date of birth"><TextInput defaultValue="14 / 08 / 1997" icon="calendar" /></Field>
        </div>
      </Card>

      <Card className={mobile ? "p-5" : "p-6"}>
        <SectionHeader eyebrow="Address" title="Where to reach you" />
        <div className={`grid gap-5 ${mobile ? "" : "grid-cols-2"}`}>
          <Field label="Address" className={mobile ? "" : "col-span-2"}>
            <TextInput defaultValue="Flat 304, Anandalok Apartments, Bhangagarh" icon="map-pin" />
          </Field>
          <Field label="City"><SelectInput defaultValue="Guwahati" icon="map-pin">{["Guwahati","Mumbai","Delhi","Bengaluru","Kolkata"].map(c => <option key={c}>{c}</option>)}</SelectInput></Field>
          <Field label="Pincode"><TextInput defaultValue="781032" /></Field>
        </div>
      </Card>

      <Card className={mobile ? "p-5" : "p-6"}>
        <SectionHeader eyebrow="Blood group" title="Update with care — this affects matching" />
        <div className={`grid gap-2 ${mobile ? "grid-cols-4" : "grid-cols-8"}`}>
          {GROUPS.map((g, i) => (
            <button
              key={g}
              className="h-14 rounded-[10px] font-bold tracking-tight transition-all"
              style={{
                background: i === 6 ? "#C8232C" : "white",
                color: i === 6 ? "white" : "#1A1A1A",
                border: `1.5px solid ${i === 6 ? "#C8232C" : "#E5E7EB"}`,
                fontSize: 18,
              }}
            >
              {g}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-[#6B7280] inline-flex items-center gap-1.5">
          <Icon name="shield-check" size={12} className="text-[#10B981]" /> Verified against report from Pathkind Labs, Aug 2024.
        </p>
      </Card>
    </div>
  );
}

function AvailabilityPanel({ mobile }) {
  return (
    <div className="grid gap-6">
      <Card className={mobile ? "p-5" : "p-6"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <SectionHeader eyebrow="Master switch" title="Available for emergency calls" />
            <p className="text-[13px] text-[#6B7280] max-w-[480px] leading-[1.55]">
              When on, we'll send you a single SMS and push notification for nearby compatible requests. Turn off when traveling, unwell, or for personal reasons — your account stays active.
            </p>
          </div>
          <Toggle on={true} />
        </div>
        <div className="mt-5 pt-5 border-t border-[#E5E7EB] grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13.5px] font-semibold text-[#1A1A1A]">Critical requests only</div>
              <div className="text-[12px] text-[#6B7280]">Limit alerts to critical urgency level.</div>
            </div>
            <Toggle on={false} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13.5px] font-semibold text-[#1A1A1A]">Quiet hours · 10 PM — 7 AM</div>
              <div className="text-[12px] text-[#6B7280]">Critical requests will still ring through.</div>
            </div>
            <Toggle on={true} />
          </div>
        </div>
      </Card>

      <Card className={mobile ? "p-5" : "p-6"}>
        <SectionHeader eyebrow="Search radius" title="How far you're willing to travel" />
        <div className="flex items-center gap-4 mb-3">
          <div className="text-[28px] font-bold text-[#1A1A1A] tabular-nums tracking-tight">12</div>
          <div className="text-[13px] text-[#6B7280]">km radius from Bhangagarh</div>
        </div>
        <div className="h-2 rounded-full bg-[#F3F4F6] relative">
          <div className="h-full rounded-full bg-[#1A1A1A]" style={{ width: "48%" }} />
          <div className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border-2 border-[#1A1A1A]" style={{ left: "calc(48% - 8px)" }} />
        </div>
        <div className="flex justify-between mt-2 text-[11px] text-[#9CA3AF]">
          <span>1 km</span>
          <span>10 km</span>
          <span>25 km</span>
          <span>50 km</span>
        </div>
      </Card>

      <Card className={mobile ? "p-5" : "p-6"}>
        <SectionHeader eyebrow="Pause" title="Take a break from emergency requests" />
        <div className={`grid gap-2 ${mobile ? "" : "grid-cols-4"}`}>
          {[
            { label: "1 week", sub: "until 19 May" },
            { label: "1 month", sub: "until 12 Jun" },
            { label: "Until I turn it back on", sub: "indefinite" },
            { label: "Custom date", sub: "pick one" },
          ].map((p, i) => (
            <button
              key={p.label}
              className="text-left p-4 rounded-[10px] border bg-white hover:border-[#1A1A1A]/30"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div className="text-[13.5px] font-semibold text-[#1A1A1A]">{p.label}</div>
              <div className="text-[11.5px] text-[#6B7280] mt-0.5">{p.sub}</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function NotificationsPanel({ mobile }) {
  const channels = [
    { id: "sms", label: "SMS", sub: "+91 98640 22184", icon: "phone" },
    { id: "push", label: "Push notifications", sub: "iPhone · this device", icon: "bell" },
    { id: "email", label: "Email", sub: "anushka.b@gmail.com", icon: "mail" },
    { id: "whatsapp", label: "WhatsApp", sub: "+91 98640 22184", icon: "share" },
  ];
  const rows = [
    { label: "New urgent request near me",  sms: true, push: true, email: false, whatsapp: true },
    { label: "Critical request (any group)",sms: true, push: true, email: false, whatsapp: true },
    { label: "Request you pledged updated", sms: true, push: true, email: true,  whatsapp: false },
    { label: "Eligibility window opens",    sms: false,push: true, email: true,  whatsapp: false },
    { label: "Monthly impact summary",      sms: false,push: false,email: true,  whatsapp: false },
  ];

  return (
    <div className="grid gap-6">
      <Card className={mobile ? "p-5" : "p-6"}>
        <SectionHeader eyebrow="Channels" title="How we reach you" />
        <div className="grid gap-3">
          {channels.map(c => (
            <div key={c.id} className="flex items-center gap-4 py-2.5">
              <div className="h-9 w-9 rounded-[10px] grid place-items-center" style={{ background: "#FAFAFA" }}>
                <Icon name={c.icon} size={14} className="text-[#1A1A1A]" />
              </div>
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold text-[#1A1A1A]">{c.label}</div>
                <div className="text-[12px] text-[#6B7280]">{c.sub}</div>
              </div>
              <Toggle on={c.id !== "email"} />
            </div>
          ))}
        </div>
      </Card>

      {!mobile && (
        <Card className="p-6">
          <SectionHeader eyebrow="Granular" title="Which events on which channels" />
          <div className="rounded-[12px] border border-[#E5E7EB] overflow-hidden">
            <div className="grid grid-cols-[1fr_repeat(4,80px)] bg-[#FAFAFA] border-b border-[#E5E7EB]">
              <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Event</div>
              {channels.map(c => (
                <div key={c.id} className="px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">
                  {c.label.split(" ")[0]}
                </div>
              ))}
            </div>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[1fr_repeat(4,80px)] items-center border-t border-[#E5E7EB] first:border-0">
                <div className="px-4 py-3 text-[13px] text-[#1A1A1A]">{r.label}</div>
                {["sms","push","email","whatsapp"].map(k => (
                  <div key={k} className="px-2 py-3 grid place-items-center">
                    <Toggle on={r[k]} size="sm" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function DonorCardWidget({ mobile }) {
  return (
    <Card className={mobile ? "p-5" : "p-6"}>
      <SectionHeader
        eyebrow="Digital donor card"
        title="Carry this with you"
        action={
          <Button variant="secondary" size="sm" icon="arrow-right">Download PDF</Button>
        }
      />
      <div
        className="relative rounded-[14px] overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #1A1A1A 0%, #2B2B2B 100%)",
        }}
      >
        {/* watermark droplet */}
        <Icon name="droplet" size={220} className="absolute -right-12 -bottom-16 opacity-[0.04]" />
        <div className="relative p-6 flex items-start gap-5">
          <QrCode size={mobile ? 100 : 120} seed="ANB-OPOS-2024-781032" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center rounded-[6px]" style={{ width: 22, height: 22, background: "#C8232C" }}>
                <Icon name="droplet" size={12} className="text-white" />
              </span>
              <span className="text-[12px] font-semibold tracking-tight">RaktSetu</span>
              <span className="text-[10px] uppercase tracking-[0.14em] opacity-50 ml-auto">Donor card · v1</span>
            </div>
            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-[0.14em] opacity-50 font-semibold">Name</div>
              <div className="text-[16px] font-semibold mt-0.5">Anushka Bhattacharya</div>
            </div>
            <div className="mt-3 flex items-center gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.14em] opacity-50 font-semibold">Group</div>
                <div className="text-[18px] font-bold mt-0.5" style={{ color: "#FF6E76" }}>O+</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.14em] opacity-50 font-semibold">ID</div>
                <div className="text-[13px] font-mono mt-0.5">RKT-AS-481204</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.14em] opacity-50 font-semibold">Since</div>
                <div className="text-[13px] mt-0.5">Aug 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[12px] text-[#6B7280]">
        Show this card at any partner blood bank to verify identity and pull your medical history. Refreshes automatically every 30 days.
      </p>
    </Card>
  );
}

function ScreenDonorProfile({ mobile }) {
  const [tab, setTab] = React.useState("personal");
  return (
    <AppShell
      role="donor"
      active="profile"
      user={DONOR_USER}
      mobile={mobile}
      subtitle="Account"
      title="Profile &amp; settings"
      actions={!mobile && <Button variant="secondary" size="md">Sign out</Button>}
    >
      <div className="grid gap-6">
        <ProfileHeader mobile={mobile} />
        <SettingsTabs active={tab} setActive={setTab} mobile={mobile} />

        <div className={mobile ? "grid gap-6" : "grid grid-cols-12 gap-6"}>
          <div className={mobile ? "" : "col-span-8"}>
            {tab === "personal" && <PersonalPanel mobile={mobile} />}
            {tab === "medical" && <PersonalPanel mobile={mobile} />}
            {tab === "availability" && <AvailabilityPanel mobile={mobile} />}
            {tab === "notifications" && <NotificationsPanel mobile={mobile} />}
            {tab === "security" && (
              <Card className="p-6">
                <SectionHeader eyebrow="Security" title="Password &amp; 2-factor" />
                <p className="text-[13px] text-[#6B7280]">Security settings are managed elsewhere in this prototype.</p>
              </Card>
            )}
          </div>
          <div className={mobile ? "" : "col-span-4 flex flex-col gap-6"}>
            <DonorCardWidget mobile={mobile} />
            <Card className={mobile ? "p-5" : "p-6"}>
              <SectionHeader eyebrow="Danger zone" title="Account actions" />
              <div className="grid gap-2">
                <Button variant="secondary" size="md" className="w-full justify-start">Export my data</Button>
                <Button variant="secondary" size="md" className="w-full justify-start">Pause my account</Button>
                <Button variant="outlineDanger" size="md" className="w-full justify-start">Delete account</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

Object.assign(window, { ScreenDonorProfile });
