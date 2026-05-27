/* RaktSetu — Create Blood Request, requester multi-step (Screen 8) */

const REQ_STEPS = [
  { id: "patient", label: "Patient", icon: "user" },
  { id: "need",    label: "Blood need", icon: "droplet" },
  { id: "bank",    label: "Blood bank", icon: "hospital" },
  { id: "urgency", label: "Urgency", icon: "clock" },
  { id: "confirm", label: "Confirm", icon: "check" },
];

const REQUESTER_USER = {
  name: "Rohit Sharma",
  email: "rohit.sharma@gmail.com",
};

const BLOOD_GROUPS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

const REQ_BANK_LIST = [
  { name: "GMC Blood Bank", type: "Government · NABH", units: { "A+": 24 }, distance: 1.2, open: true },
  { name: "Apollo Hospitals Blood Centre", type: "Private · multi-speciality", units: { "A+": 12 }, distance: 2.4, open: true },
  { name: "Red Cross Society — Assam Branch", type: "Non-profit · voluntary", units: { "A+": 30 }, distance: 3.1, open: true },
  { name: "Nemcare Hospital Blood Centre", type: "Private · multi-speciality", units: { "A+": 15 }, distance: 5.2, open: true },
  { name: "Down Town Hospital Blood Bank", type: "Private · NABH", units: { "A+": 8 }, distance: 4.6, open: false },
];

/* ---------- step 1 ---------- */
function StepPatient({ mobile, data, setData }) {
  return (
    <div className="grid gap-6">
      <header>
        <Eyebrow>Step 1 of 5</Eyebrow>
        <h2 className="mt-1.5 font-bold text-[#1A1A1A] tracking-tight" style={{ fontSize: mobile ? 26 : 32, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
          Who is this request for?
        </h2>
        <p className="text-[14px] text-[#6B7280] mt-2 max-w-[560px] leading-[1.55]">
          We use a patient's first name and age for context only. Their full details stay private to the hospital and the blood bank.
        </p>
      </header>

      <Card className={mobile ? "p-5" : "p-7"}>
        <div className="grid gap-5">
          <Field label="Patient name (first name only is fine)" required>
            <TextInput icon="user" placeholder="e.g. Ayesha" defaultValue={data.patient.name} />
          </Field>
          <div className={`grid gap-5 ${mobile ? "" : "grid-cols-3"}`}>
            <Field label="Age" required><TextInput placeholder="42" defaultValue={data.patient.age} /></Field>
            <Field label="Gender" required>
              <SelectInput defaultValue={data.patient.gender}>
                {["Female","Male","Other","Prefer not to say"].map(c => <option key={c}>{c}</option>)}
              </SelectInput>
            </Field>
            <Field label="Blood group" required>
              <SelectInput icon="droplet" defaultValue={data.patient.group}>
                {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
              </SelectInput>
            </Field>
          </div>
          <Field label="Reason / condition (optional)" hint="Helps donors empathize. Stays anonymous on the public feed.">
            <TextInput placeholder="e.g. emergency cardiac surgery" defaultValue={data.patient.reason} />
          </Field>
          <Field label="Your relationship to the patient" required>
            <SelectInput defaultValue={data.patient.relation}>
              {["Self","Spouse","Parent","Child","Sibling","Friend","Hospital staff","Other"].map(c => <option key={c}>{c}</option>)}
            </SelectInput>
          </Field>
        </div>
      </Card>
    </div>
  );
}

/* ---------- step 2 ---------- */
function StepNeed({ mobile, data, setData }) {
  return (
    <div className="grid gap-6">
      <header>
        <Eyebrow>Step 2 of 5</Eyebrow>
        <h2 className="mt-1.5 font-bold text-[#1A1A1A] tracking-tight" style={{ fontSize: mobile ? 26 : 32, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
          What exactly is needed?
        </h2>
        <p className="text-[14px] text-[#6B7280] mt-2 max-w-[560px] leading-[1.55]">
          We'll match you with banks that have inventory, and notify compatible donors nearby.
        </p>
      </header>

      <Card className={mobile ? "p-5" : "p-7"}>
        <div className="grid gap-6">
          <Field label="Blood component" required>
            <div className={`grid gap-2 ${mobile ? "grid-cols-2" : "grid-cols-4"}`}>
              {[
                { id: "whole", label: "Whole blood", sub: "Most common" },
                { id: "rbc", label: "RBC concentrate", sub: "Anaemia, surgery" },
                { id: "plasma", label: "Plasma", sub: "Burns, clotting disorders" },
                { id: "platelets", label: "Platelets", sub: "Cancer, dengue" },
              ].map(c => {
                const on = data.need.component === c.id;
                return (
                  <button
                    key={c.id}
                    className="text-left p-4 rounded-[12px] bg-white"
                    style={{
                      border: `1.5px solid ${on ? "#C8232C" : "#E5E7EB"}`,
                      boxShadow: on ? "0 4px 12px -4px rgba(200,35,44,0.2)" : "none",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon name="droplet" size={14} className={on ? "text-[#C8232C]" : "text-[#6B7280]"} />
                      {on && <Icon name="check-circle" size={14} className="text-[#C8232C] ml-auto" />}
                    </div>
                    <div className="text-[14px] font-semibold text-[#1A1A1A]">{c.label}</div>
                    <div className="text-[11.5px] text-[#6B7280] mt-0.5">{c.sub}</div>
                  </button>
                );
              })}
            </div>
          </Field>

          <div className={`grid gap-5 ${mobile ? "" : "grid-cols-2"}`}>
            <Field label="Units needed" required>
              <div className="flex items-center gap-2 h-11 rounded-[10px] border border-[#E5E7EB] bg-white px-2 w-fit">
                <button className="h-7 w-7 grid place-items-center rounded-[6px] hover:bg-[#FAFAFA] text-[#1A1A1A]">−</button>
                <span className="text-[18px] font-bold tabular-nums w-10 text-center">{data.need.units}</span>
                <button className="h-7 w-7 grid place-items-center rounded-[6px] hover:bg-[#FAFAFA] text-[#1A1A1A]">+</button>
              </div>
            </Field>
            <Field label="Needed by" required hint="The deadline drives urgency suggestions.">
              <TextInput icon="calendar" defaultValue="Today · 6:00 PM" />
            </Field>
          </div>

          <Field label="Hospital / location of patient" required>
            <TextInput icon="map-pin" defaultValue="Govt. Medical College Hospital, Bhangagarh, Guwahati" />
          </Field>
        </div>
      </Card>

      <Card className="p-5 bg-[#FAFAFA]">
        <div className="flex items-start gap-3">
          <Icon name="shield-check" size={16} className="text-[#10B981] mt-0.5 shrink-0" />
          <p className="text-[12.5px] text-[#6B7280] leading-[1.6]">
            Based on compatibility, donors with <strong className="text-[#1A1A1A]">A+, A−, O+ or O−</strong> can give to this patient. We'll automatically broadcast to all four groups within your search radius.
          </p>
        </div>
      </Card>
    </div>
  );
}

/* ---------- step 3 ---------- */
function StepBank({ mobile, data, setData }) {
  return (
    <div className="grid gap-6">
      <header>
        <Eyebrow>Step 3 of 5</Eyebrow>
        <h2 className="mt-1.5 font-bold text-[#1A1A1A] tracking-tight" style={{ fontSize: mobile ? 26 : 32, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
          Choose a blood bank to coordinate with
        </h2>
        <p className="text-[14px] text-[#6B7280] mt-2 max-w-[560px] leading-[1.55]">
          Pick one that has stock now, or has a working relationship with the hospital. RaktSetu will reserve units on your behalf.
        </p>
      </header>

      <Card className={mobile ? "p-5" : "p-6"}>
        <div className="flex items-center gap-3 h-11 rounded-[10px] border border-[#E5E7EB] bg-white px-3.5">
          <Icon name="search" size={15} className="text-[#9CA3AF]" />
          <input placeholder="Search by bank name or city…" className="flex-1 bg-transparent outline-none text-[14px]" />
          <span className="text-[11px] text-[#6B7280]">5 results · within 10 km</span>
        </div>

        <div className="mt-4 grid gap-3">
          {REQ_BANK_LIST.map((b, i) => {
            const selected = data.bank === b.name;
            return (
              <button
                key={b.name}
                className="text-left p-4 rounded-[12px] bg-white"
                style={{
                  border: `1.5px solid ${selected ? "#C8232C" : "#E5E7EB"}`,
                  boxShadow: selected ? "0 6px 18px -8px rgba(200,35,44,0.25)" : "none",
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-[10px] grid place-items-center shrink-0" style={{ background: "#FAFAFA" }}>
                    <Icon name="hospital" size={18} className="text-[#1A1A1A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-[14.5px] font-semibold text-[#1A1A1A] truncate">{b.name}</div>
                      {selected && <Icon name="check-circle" size={14} className="text-[#C8232C]" />}
                    </div>
                    <div className="text-[12px] text-[#6B7280] mt-0.5">{b.type}</div>
                    <div className="text-[11.5px] text-[#6B7280] mt-2 flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Icon name="map-pin" size={11} /> {b.distance} km
                      </span>
                      <span>·</span>
                      <span className={`inline-flex items-center gap-1 ${b.open ? "text-[#065F46]" : "text-[#9CA3AF]"}`}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: b.open ? "#10B981" : "#9CA3AF" }} />
                        {b.open ? "Open now" : "Closed · opens 8 AM"}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF] font-semibold">A+ in stock</div>
                    <div className="text-[18px] font-bold text-[#1A1A1A] tabular-nums mt-0.5">{b.units["A+"]}</div>
                    <div className="text-[11px] text-[#6B7280]">units</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ---------- step 4 ---------- */
function StepUrgency({ mobile, data, setData }) {
  const levels = [
    {
      id: "normal", label: "Normal", icon: "clock", tone: "#9CA3AF",
      summary: "Needed within 3+ days",
      detail: "Standard processing. Listed in the public feed and routed to compatible donors when convenient.",
      bullets: ["No SMS to donors", "Listed in public feed", "Compatible-only matching"],
    },
    {
      id: "urgent", label: "Urgent", icon: "zap", tone: "#F59E0B",
      summary: "Needed within 24–48 hours",
      detail: "Prioritized routing. SMS goes to opted-in donors during daytime hours.",
      bullets: ["SMS to nearby donors", "Top of public feed", "All-group compatibility broadcast"],
    },
    {
      id: "critical", label: "Critical", icon: "heart", tone: "#DC2626",
      summary: "Needed within 6 hours",
      detail: "Highest priority. Push + SMS bypasses quiet hours. Bank's emergency desk is alerted.",
      bullets: ["Push + SMS, 24/7", "Bank emergency desk paged", "Live activity feed"],
    },
  ];
  return (
    <div className="grid gap-6">
      <header>
        <Eyebrow>Step 4 of 5</Eyebrow>
        <h2 className="mt-1.5 font-bold text-[#1A1A1A] tracking-tight" style={{ fontSize: mobile ? 26 : 32, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
          How time-sensitive is this?
        </h2>
        <p className="text-[14px] text-[#6B7280] mt-2 max-w-[560px] leading-[1.55]">
          We adjust matching, notification channels and visibility based on this. Picking "Critical" when it isn't dilutes future alerts.
        </p>
      </header>

      <div className={`grid gap-4 ${mobile ? "" : "grid-cols-3"}`}>
        {levels.map(l => {
          const on = data.urgency === l.id;
          return (
            <button
              key={l.id}
              className="text-left p-6 rounded-[14px] bg-white transition-all"
              style={{
                border: `1.5px solid ${on ? l.tone : "#E5E7EB"}`,
                boxShadow: on ? `0 10px 24px -10px ${l.tone}40` : "0 1px 2px rgba(16,24,40,0.04)",
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="h-11 w-11 rounded-[10px] grid place-items-center"
                  style={{ background: on ? l.tone : "#FAFAFA", color: on ? "white" : l.tone }}
                >
                  <Icon name={l.icon} size={18} />
                </div>
                {on && <Icon name="check-circle" size={18} style={{ color: l.tone }} />}
              </div>
              <div
                className="font-bold text-[#1A1A1A] tracking-tight mt-4"
                style={{ fontSize: 22, letterSpacing: "-0.02em" }}
              >
                {l.label}
              </div>
              <div className="text-[13px] font-semibold mt-1" style={{ color: l.tone }}>
                {l.summary}
              </div>
              <p className="text-[13px] text-[#6B7280] mt-3 leading-[1.55]">{l.detail}</p>
              <ul className="mt-4 grid gap-2">
                {l.bullets.map(b => (
                  <li key={b} className="text-[12.5px] text-[#1A1A1A] flex items-center gap-2">
                    <Icon name="check" size={12} className="text-[#10B981]" strokeWidth={3} /> {b}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <Card className="p-5 bg-[#FAFAFA]">
        <div className="flex items-start gap-3">
          <Icon name="shield-check" size={16} className="text-[#1A1A1A] mt-0.5 shrink-0" />
          <p className="text-[12.5px] text-[#6B7280] leading-[1.6]">
            <strong className="text-[#1A1A1A]">Recommended: Critical.</strong> Your deadline is 6:00 PM today (~ 4 hrs), and the chosen bank has only 1 of 2 units on hand. We'll page the bank's emergency desk on submit.
          </p>
        </div>
      </Card>
    </div>
  );
}

/* ---------- step 5 ---------- */
function StepConfirm({ mobile, data }) {
  return (
    <div className="grid gap-6">
      <header>
        <Eyebrow>Step 5 of 5</Eyebrow>
        <h2 className="mt-1.5 font-bold text-[#1A1A1A] tracking-tight" style={{ fontSize: mobile ? 26 : 32, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
          Review and post your request
        </h2>
        <p className="text-[14px] text-[#6B7280] mt-2 max-w-[560px] leading-[1.55]">
          Everything below will be visible to the bank you selected and to compatible donors. Patient details stay private.
        </p>
      </header>

      <Card className={mobile ? "p-5" : "p-7"}>
        <div className="flex items-start gap-5 pb-6 border-b border-[#E5E7EB]">
          <BloodBadge group={data.patient.group} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <UrgencyBadge level={data.urgency} />
              <span className="text-[11px] text-[#9CA3AF]">Request will be posted as #RS-29481</span>
            </div>
            <h3
              className="font-bold text-[#1A1A1A] tracking-tight mt-2"
              style={{ fontSize: mobile ? 20 : 24, letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              {data.need.units} units of {data.patient.group} for {data.patient.name}, {data.patient.age}
            </h3>
            <p className="text-[13px] text-[#6B7280] mt-2 leading-[1.55]">
              {data.patient.reason} · needed by {data.need.deadline}
            </p>
          </div>
        </div>

        <div className={`grid gap-x-8 gap-y-5 mt-6 ${mobile ? "" : "grid-cols-3"}`}>
          {[
            ["Patient", `${data.patient.name} · ${data.patient.age}y / ${data.patient.gender}`],
            ["Condition", data.patient.reason || "—"],
            ["Relationship", data.patient.relation],
            ["Component", "Whole blood"],
            ["Units", `${data.need.units} units of ${data.patient.group}`],
            ["Deadline", data.need.deadline],
            ["Hospital", "GMC Hospital, Bhangagarh"],
            ["Coordinating bank", data.bank],
            ["Urgency", data.urgency[0].toUpperCase() + data.urgency.slice(1)],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#9CA3AF]">{k}</div>
              <div className="text-[13.5px] font-semibold text-[#1A1A1A] mt-1">{v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="grid gap-3">
          {[
            "I confirm the patient details are accurate and I'm authorized to post this request.",
            "I understand RaktSetu will share necessary details with the chosen blood bank and compatible donors.",
            "I'll mark this request fulfilled or cancelled once it's resolved so donors aren't bothered unnecessarily.",
          ].map((s, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <span className="h-5 w-5 rounded-[5px] border border-[#1A1A1A] bg-[#1A1A1A] grid place-items-center shrink-0 mt-0.5">
                <Icon name="check" size={12} strokeWidth={3} className="text-white" />
              </span>
              <span className="text-[13px] text-[#1A1A1A] leading-[1.55]">{s}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------- shell ---------- */
function CreateRequestStepper({ steps, current, mobile }) {
  return (
    <div className={`flex items-start ${mobile ? "gap-1 overflow-x-auto -mx-5 px-5 pb-1" : "gap-3"}`}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === steps.length - 1;
        return (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-2.5 shrink-0">
              <div
                className="h-8 w-8 rounded-full grid place-items-center text-[12px] font-bold"
                style={{
                  background: done ? "#1A1A1A" : active ? "#C8232C" : "white",
                  color: done || active ? "white" : "#9CA3AF",
                  border: `1px solid ${done ? "#1A1A1A" : active ? "#C8232C" : "#E5E7EB"}`,
                }}
              >
                {done ? <Icon name="check" size={12} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className="text-[13px] font-semibold whitespace-nowrap"
                style={{ color: done || active ? "#1A1A1A" : "#9CA3AF" }}
              >
                {s.label}
              </span>
            </div>
            {!isLast && <div className="flex-1 h-px bg-[#E5E7EB] min-w-[24px] mt-4" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function ScreenCreateRequest({ mobile }) {
  const [stepIdx, setStepIdx] = React.useState(1);
  const [data, setData] = React.useState({
    patient: {
      name: "Ayesha",
      age: "42",
      gender: "Female",
      group: "A+",
      reason: "Emergency cardiac surgery",
      relation: "Spouse",
    },
    need: {
      component: "whole",
      units: 2,
      deadline: "Today · 6:00 PM",
    },
    bank: "GMC Blood Bank",
    urgency: "critical",
  });

  const step = REQ_STEPS[stepIdx];

  return (
    <AppShell
      role="requester"
      active="create"
      user={REQUESTER_USER}
      mobile={mobile}
      subtitle="Create"
      title="Post a blood request"
    >
      <div className={`max-w-[920px] ${mobile ? "" : "mx-auto"}`}>
        <div className={mobile ? "mb-6" : "mb-8"}>
          <CreateRequestStepper steps={REQ_STEPS} current={stepIdx} mobile={mobile} />
        </div>

        {step.id === "patient" && <StepPatient mobile={mobile} data={data} setData={setData} />}
        {step.id === "need"    && <StepNeed mobile={mobile} data={data} setData={setData} />}
        {step.id === "bank"    && <StepBank mobile={mobile} data={data} setData={setData} />}
        {step.id === "urgency" && <StepUrgency mobile={mobile} data={data} setData={setData} />}
        {step.id === "confirm" && <StepConfirm mobile={mobile} data={data} />}

        <div className={`mt-8 pt-6 border-t border-[#E5E7EB] flex items-center ${mobile ? "flex-col-reverse gap-3" : "justify-between"}`}>
          <Button
            variant="ghost"
            size="md"
            icon="arrow-left"
            onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
            disabled={stepIdx === 0}
            className={(stepIdx === 0 ? "opacity-40 pointer-events-none " : "") + (mobile ? "w-full" : "")}
          >
            Back
          </Button>
          <div className={`flex items-center gap-3 ${mobile ? "w-full flex-col-reverse" : ""}`}>
            {!mobile && (
              <span className="text-[13px] text-[#6B7280]">
                Step {stepIdx + 1} of {REQ_STEPS.length}
              </span>
            )}
            {stepIdx === REQ_STEPS.length - 1 ? (
              <Button variant="primary" size="lg" iconRight="arrow-right" className={mobile ? "w-full" : ""}>
                Post request &amp; notify donors
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                iconRight="arrow-right"
                className={mobile ? "w-full" : ""}
                onClick={() => setStepIdx(Math.min(REQ_STEPS.length - 1, stepIdx + 1))}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

Object.assign(window, { ScreenCreateRequest });
