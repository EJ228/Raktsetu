/* RaktSetu — My Requests, requester (Screen 9) */

const REQUESTER_USER = window.REQUESTER_USER || (window.REQUESTER_USER = {
  name: "Rohit Sharma",
  email: "rohit.sharma@gmail.com",
});

const MY_REQUESTS = [
  {
    id: "RS-29481",
    patient: "Ayesha",
    age: 42,
    group: "A+",
    units: 2,
    fulfilled: 1,
    urgency: "critical",
    status: "matched",
    posted: "12 min ago",
    deadline: "Today, 6:00 PM",
    bank: "GMC Blood Bank",
    pledges: 3,
  },
  {
    id: "RS-29103",
    patient: "Arjun",
    age: 7,
    group: "O-",
    units: 4,
    fulfilled: 4,
    urgency: "urgent",
    status: "fulfilled",
    posted: "yesterday",
    deadline: "completed yesterday",
    bank: "Red Cross Society",
    pledges: 6,
  },
  {
    id: "RS-28897",
    patient: "Meera",
    age: 28,
    group: "B+",
    units: 3,
    fulfilled: 2,
    urgency: "urgent",
    status: "assigned",
    posted: "2 days ago",
    deadline: "Tomorrow, 11:00 AM",
    bank: "Apollo Hospitals Blood Centre",
    pledges: 4,
  },
  {
    id: "RS-28552",
    patient: "Vihaan",
    age: 54,
    group: "AB+",
    units: 2,
    fulfilled: 0,
    urgency: "normal",
    status: "pending",
    posted: "3 days ago",
    deadline: "this Saturday",
    bank: "Nemcare Hospital",
    pledges: 1,
  },
  {
    id: "RS-27991",
    patient: "Karan",
    age: 19,
    group: "O+",
    units: 1,
    fulfilled: 0,
    urgency: "normal",
    status: "cancelled",
    posted: "1 week ago",
    deadline: "—",
    bank: "GMC Blood Bank",
    pledges: 0,
  },
];

function MyRequestCard({ r, mobile }) {
  return (
    <Card className={mobile ? "p-5" : "p-6"}>
      <div className={mobile ? "" : "flex items-start gap-6"}>
        <div className={mobile ? "flex items-start gap-4 mb-4" : "shrink-0"}>
          <BloodBadge group={r.group} size="lg" />
          <div className={mobile ? "" : "mt-3 text-center"}>
            <div className="text-[10.5px] uppercase tracking-[0.12em] text-[#9CA3AF] font-semibold">{mobile ? "Patient" : "Need"}</div>
            <div className="text-[13px] font-semibold text-[#1A1A1A]">{mobile ? `${r.patient}, ${r.age}` : `${r.units} units`}</div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <StatusBadge status={r.status} />
            <UrgencyBadge level={r.urgency} />
            <span className="text-[11px] font-mono text-[#9CA3AF]">#{r.id}</span>
          </div>
          {!mobile && (
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] tracking-tight">
              {r.units} units of {r.group} for {r.patient}, {r.age}
            </h3>
          )}
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[12.5px]">
            <div className="flex items-center gap-1.5 text-[#6B7280]">
              <Icon name="hospital" size={12} /> <span className="truncate">{r.bank}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#6B7280]">
              <Icon name="clock" size={12} /> {r.deadline}
            </div>
            <div className="flex items-center gap-1.5 text-[#6B7280]">
              <Icon name="users" size={12} /> {r.pledges} donor{r.pledges === 1 ? "" : "s"} pledged
            </div>
            <div className="flex items-center gap-1.5 text-[#6B7280]">
              <Icon name="calendar" size={12} /> Posted {r.posted}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11.5px] mb-1.5">
              <span className="font-semibold text-[#1A1A1A] tabular-nums">{r.fulfilled} of {r.units} units secured</span>
              <span className="text-[#6B7280]">{Math.round((r.fulfilled / r.units) * 100)}%</span>
            </div>
            <ProgressBar value={r.fulfilled} max={r.units} tone={r.status === "fulfilled" ? "success" : "primary"} />
          </div>
        </div>

        <div className={mobile ? "mt-5 flex gap-2" : "shrink-0 flex flex-col items-end gap-2"}>
          <Button variant="primary" size="md" className={mobile ? "flex-1" : ""} iconRight="arrow-right">
            View
          </Button>
          {r.status !== "fulfilled" && r.status !== "cancelled" && (
            <Button variant="ghost" size="sm" className={mobile ? "" : "!text-[#6B7280]"}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function MyRequestsTabs({ active, setActive, counts, mobile }) {
  const tabs = [
    { id: "all",       label: "All",        count: counts.all },
    { id: "active",    label: "Active",     count: counts.active },
    { id: "fulfilled", label: "Fulfilled",  count: counts.fulfilled },
    { id: "cancelled", label: "Cancelled",  count: counts.cancelled },
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
                ? { background: on ? "#1A1A1A" : "white", color: on ? "white" : "#1A1A1A", borderColor: on ? "#1A1A1A" : "#E5E7EB" }
                : { color: on ? "#1A1A1A" : "#6B7280", borderColor: on ? "#C8232C" : "transparent" }
            }
          >
            {t.label}
            <span
              className="text-[10.5px] font-bold rounded-full px-1.5 min-w-[20px] h-5 grid place-items-center tabular-nums"
              style={{
                background: on ? (mobile ? "rgba(255,255,255,0.2)" : "#FCE9EA") : "#F3F4F6",
                color: on ? (mobile ? "white" : "#C8232C") : "#6B7280",
              }}
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ScreenMyRequests({ mobile }) {
  const [tab, setTab] = React.useState("all");

  const counts = {
    all: MY_REQUESTS.length,
    active: MY_REQUESTS.filter(r => ["pending","matched","assigned"].includes(r.status)).length,
    fulfilled: MY_REQUESTS.filter(r => r.status === "fulfilled").length,
    cancelled: MY_REQUESTS.filter(r => r.status === "cancelled").length,
  };

  const filtered = MY_REQUESTS.filter(r => {
    if (tab === "all") return true;
    if (tab === "active") return ["pending","matched","assigned"].includes(r.status);
    return r.status === tab;
  });

  return (
    <AppShell
      role="requester"
      active="my"
      user={REQUESTER_USER}
      mobile={mobile}
      subtitle="Requester"
      title="My requests"
      actions={
        !mobile && <Button variant="primary" size="md" icon="plus">New request</Button>
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-4 gap-4">
          <KpiCard icon="activity" value={counts.active} label="Active requests" sub="In progress right now" />
          <KpiCard icon="check-circle" value={counts.fulfilled} label="Fulfilled" sub="Lifetime" tone="success" />
          <KpiCard icon="users" value="14" label="Donors who helped" sub="Across all requests" tone="info" />
          <KpiCard icon="droplet" value="11" label="Units received" sub="≈ 4,950 ml" />
        </div>

        <Card className={mobile ? "p-4" : "p-6"}>
          <div className={`flex items-center ${mobile ? "flex-col gap-3" : "justify-between"} mb-5`}>
            <MyRequestsTabs active={tab} setActive={setTab} counts={counts} mobile={mobile} />
            {!mobile && (
              <div className="flex items-center gap-2">
                <SelectInput defaultValue="Most recent" className="!h-9 min-w-[160px]">
                  {["Most recent","Oldest first","By urgency","By blood group"].map(o => <option key={o}>{o}</option>)}
                </SelectInput>
                <Button variant="secondary" size="sm" icon="sliders">Filter</Button>
              </div>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-3">
              {filtered.map(r => <MyRequestCard key={r.id} r={r} mobile={mobile} />)}
            </div>
          ) : (
            <EmptyRequestsState mobile={mobile} />
          )}
        </Card>
      </div>
    </AppShell>
  );
}

function EmptyRequestsState({ mobile }) {
  return (
    <div className={`text-center ${mobile ? "py-12" : "py-20"}`}>
      <div className="mx-auto h-16 w-16 rounded-full bg-[#FCE9EA] grid place-items-center mb-5">
        <Icon name="heart" size={26} className="text-[#C8232C]" />
      </div>
      <h3
        className="font-bold text-[#1A1A1A] tracking-tight"
        style={{ fontSize: 22, letterSpacing: "-0.02em" }}
      >
        You haven't posted any requests yet.
      </h3>
      <p className="mt-2 text-[14px] text-[#6B7280] max-w-[420px] mx-auto leading-[1.55]">
        Need blood for yourself or a loved one? Post a request and we'll notify compatible donors and reserve units at a nearby blood bank within minutes.
      </p>
      <div className="mt-6 inline-flex gap-2">
        <Button variant="primary" size="md" icon="plus">Create your first request</Button>
        <Button variant="ghost" size="md">How requests work</Button>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenMyRequests });
