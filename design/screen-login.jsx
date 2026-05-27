/* RaktSetu — Login (Screen 3) */

function ScreenLogin({ mobile }) {
  const [showPw, setShowPw] = React.useState(false);
  const [role, setRole] = React.useState("donor");

  const card = (
    <div className={mobile ? "w-full" : "w-[440px]"}>
      <Logo />

      <h1
        className="mt-10 font-bold text-[#1A1A1A] tracking-tight"
        style={{ fontSize: mobile ? 30 : 36, letterSpacing: "-0.025em", lineHeight: 1.1 }}
      >
        Welcome back.
      </h1>
      <p className="mt-3 text-[15px] text-[#6B7280]">
        Sign in to manage your donations, requests and inventory.
      </p>

      {/* role toggle */}
      <div className="mt-8 inline-flex p-1 rounded-[10px] bg-[#FAFAFA] border border-[#E5E7EB] w-full">
        {[
          { id: "donor", label: "Donor" },
          { id: "requester", label: "Requester" },
          { id: "bank", label: "Blood bank" },
        ].map(r => (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            className="flex-1 h-9 rounded-[8px] text-[13px] font-semibold transition-colors"
            style={{
              background: role === r.id ? "white" : "transparent",
              color: role === r.id ? "#1A1A1A" : "#6B7280",
              boxShadow: role === r.id ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form className="mt-6 flex flex-col gap-4">
        <Field label="Email or phone" required>
          <TextInput icon="mail" placeholder="you@email.com" defaultValue="anushka.bhattacharya@gmail.com" />
        </Field>

        <Field label="Password" required>
          <div className="flex items-center gap-2 h-11 rounded-[10px] border border-[#E5E7EB] bg-white px-3.5 focus-within:border-[#1A1A1A]">
            <Icon name="shield-check" size={16} className="text-[#9CA3AF]" />
            <input
              type={showPw ? "text" : "password"}
              defaultValue="••••••••••"
              className="flex-1 bg-transparent text-[14px] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-[#9CA3AF] hover:text-[#1A1A1A]"
            >
              <Icon name={showPw ? "eye-off" : "eye"} size={16} />
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="h-4 w-4 rounded-[4px] border border-[#E5E7EB] bg-white grid place-items-center">
              <Icon name="check" size={11} className="text-[#1A1A1A]" strokeWidth={3} />
            </span>
            <span className="text-[13px] text-[#1A1A1A]">Keep me signed in</span>
          </label>
          <a href="#" className="text-[13px] font-semibold text-[#C8232C] hover:underline">
            Forgot password?
          </a>
        </div>

        <Button variant="primary" size="lg" className="mt-2 w-full" iconRight="arrow-right">
          Sign in
        </Button>

        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-[#E5E7EB]" />
          <span className="text-[11px] text-[#9CA3AF] uppercase tracking-[0.14em] font-semibold">or</span>
          <div className="flex-1 h-px bg-[#E5E7EB]" />
        </div>

        <Button variant="secondary" size="lg" className="w-full">
          Sign in with one-time code via SMS
        </Button>
      </form>

      <p className="mt-8 text-[14px] text-[#6B7280] text-center">
        New to RaktSetu?{" "}
        <a href="#" className="font-semibold text-[#1A1A1A] hover:underline">
          Create an account
        </a>
      </p>

      {!mobile && (
        <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex items-center justify-between text-[12px] text-[#9CA3AF]">
          <span>© 2026 RaktSetu Foundation</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#1A1A1A]">Privacy</a>
            <a href="#" className="hover:text-[#1A1A1A]">Terms</a>
            <a href="#" className="hover:text-[#1A1A1A]">Help</a>
          </div>
        </div>
      )}
    </div>
  );

  if (mobile) {
    return (
      <div className="bg-white min-h-full">
        <div className="h-14 px-5 flex items-center justify-between border-b border-[#E5E7EB]">
          <Logo size={22} />
          <a href="#" className="text-[13px] font-semibold text-[#1A1A1A]">Need help?</a>
        </div>
        <div className="px-6 py-10">{card}</div>
      </div>
    );
  }

  return (
    <div className="min-h-full grid grid-cols-2 bg-white">
      <div className="px-16 py-14 flex flex-col items-center justify-center">{card}</div>
      <SideArtwork />
    </div>
  );
}

function SideArtwork() {
  const groups = [
    { g: "O+", count: 412 },
    { g: "A+", count: 318 },
    { g: "B+", count: 274 },
    { g: "O-", count: 96 },
    { g: "AB+", count: 88 },
    { g: "A-", count: 71 },
    { g: "B-", count: 54 },
    { g: "AB-", count: 22 },
  ];
  const max = 412;
  return (
    <div className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
      <svg className="absolute inset-0 w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="loginGrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#E5E7EB" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#loginGrid)" />
      </svg>

      <div className="relative h-full flex flex-col justify-center px-16 py-14">
        <Eyebrow>Today, across India</Eyebrow>
        <h2
          className="mt-3 font-bold tracking-tight text-[#1A1A1A]"
          style={{ fontSize: 36, letterSpacing: "-0.025em", lineHeight: 1.1 }}
        >
          412 donors have already
          <br />
          said yes today.
        </h2>
        <p className="mt-4 text-[15px] text-[#6B7280] max-w-[420px] leading-[1.6]">
          A live snapshot of pledges accepted in the last 24 hours, by blood group.
        </p>

        <div className="mt-10 grid gap-3 max-w-[420px]">
          {groups.map(g => (
            <div key={g.g} className="flex items-center gap-4">
              <BloodBadge group={g.g} size="md" variant="ghost" className="w-12" />
              <div className="flex-1 h-7 rounded-md bg-white border border-[#E5E7EB] relative overflow-hidden">
                <div
                  className="h-full rounded-md"
                  style={{
                    width: `${(g.count / max) * 100}%`,
                    background: "#C8232C",
                  }}
                />
              </div>
              <div className="text-[13px] font-semibold tabular-nums text-[#1A1A1A] w-10 text-right">
                {g.count}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-12 rounded-[14px] bg-white border-l-4 border-l-[#10B981] border-y border-r border-[#E5E7EB] p-4 max-w-[420px]"
          style={{ boxShadow: "0 8px 24px -12px rgba(16,24,40,0.08)" }}
        >
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#D1FAE5] grid place-items-center shrink-0">
              <Icon name="check-circle" size={16} className="text-[#10B981]" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#10B981]">
                Fulfilled · 4 minutes ago
              </div>
              <p className="text-[14px] text-[#1A1A1A] mt-0.5">
                Vihaan, B+, donated at Apollo Hospitals, Bengaluru. 1 unit secured for an accident patient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenLogin });
