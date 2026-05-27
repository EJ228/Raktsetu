/* RaktSetu — Register (Screen 4) */

const ROLES = [
  {
    id: "donor",
    icon: "droplet",
    title: "I'm a Donor",
    body: "Get notified about urgent requests near you. Donate when you're eligible. Track your impact.",
    chip: "Most common",
  },
  {
    id: "requester",
    icon: "heart",
    title: "I need Blood",
    body: "Post a request for yourself or a loved one. Get matched with donors and accredited blood banks.",
    chip: null,
  },
  {
    id: "bank",
    icon: "hospital",
    title: "I'm a Blood Bank",
    body: "Manage your inventory, accept requests, and coordinate with pledged donors — all in one place.",
    chip: "For verified institutions",
  },
];

const STEPS_BY_ROLE = {
  donor: ["Role", "About you", "Blood profile", "Confirm"],
  requester: ["Role", "About you", "Confirm"],
  bank: ["Role", "Institution", "Verification", "Confirm"],
};

const BLOOD_GROUPS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

function StepperBar({ steps, current }) {
  return (
    <div className="flex items-center gap-2 w-full">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2.5">
              <div
                className="h-7 w-7 rounded-full grid place-items-center text-[12px] font-bold transition-colors"
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
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function RoleCard({ role, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(role.id)}
      className="text-left rounded-[16px] p-6 transition-all relative bg-white"
      style={{
        border: `1.5px solid ${selected ? "#C8232C" : "#E5E7EB"}`,
        boxShadow: selected
          ? "0 8px 28px -12px rgba(200,35,44,0.25)"
          : "0 1px 2px rgba(16,24,40,0.04)",
      }}
    >
      {role.chip && (
        <span
          className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full"
          style={{ background: selected ? "#FCE9EA" : "#FAFAFA", color: selected ? "#C8232C" : "#6B7280" }}
        >
          {role.chip}
        </span>
      )}
      <div
        className="h-12 w-12 rounded-[12px] grid place-items-center mb-5"
        style={{
          background: selected ? "#C8232C" : "#FCE9EA",
          color: selected ? "white" : "#C8232C",
        }}
      >
        <Icon name={role.icon} size={22} />
      </div>
      <h3
        className="font-semibold text-[#1A1A1A] tracking-tight"
        style={{ fontSize: 19, letterSpacing: "-0.015em" }}
      >
        {role.title}
      </h3>
      <p className="mt-2 text-[14px] text-[#6B7280] leading-[1.55]">
        {role.body}
      </p>
      <div
        className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold"
        style={{ color: selected ? "#C8232C" : "#6B7280" }}
      >
        {selected ? (
          <>
            <Icon name="check-circle" size={14} /> Selected
          </>
        ) : (
          <>Choose this role <Icon name="arrow-right" size={14} /></>
        )}
      </div>
    </button>
  );
}

function RoleStep({ role, setRole, mobile }) {
  return (
    <div>
      <div className="max-w-[640px]">
        <h1
          className="font-bold text-[#1A1A1A] tracking-tight"
          style={{ fontSize: mobile ? 28 : 38, letterSpacing: "-0.025em", lineHeight: 1.1 }}
        >
          Welcome to RaktSetu.
          <br />
          How will you use it?
        </h1>
        <p className="mt-3 text-[15px] text-[#6B7280] leading-[1.6]">
          Choose the role that fits you best. You can always add another role later from your account settings.
        </p>
      </div>
      <div className={mobile ? "mt-8 grid gap-3" : "mt-10 grid grid-cols-3 gap-5"}>
        {ROLES.map(r => (
          <RoleCard key={r.id} role={r} selected={role === r.id} onSelect={setRole} />
        ))}
      </div>
    </div>
  );
}

function DonorFormStep({ mobile, sub = "about" }) {
  if (sub === "blood") {
    return (
      <div>
        <h2
          className="font-bold text-[#1A1A1A] tracking-tight"
          style={{ fontSize: mobile ? 24 : 30, letterSpacing: "-0.02em" }}
        >
          Your blood profile
        </h2>
        <p className="mt-2 text-[14px] text-[#6B7280]">
          This helps us match you with compatible requests and ensure you're eligible to donate safely.
        </p>

        <div className="mt-8">
          <Field label="Blood group" required>
            <div className={`grid gap-2 ${mobile ? "grid-cols-4" : "grid-cols-8"}`}>
              {BLOOD_GROUPS.map((g, i) => (
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
          </Field>
        </div>

        <div className={`mt-6 grid gap-5 ${mobile ? "" : "grid-cols-2"}`}>
          <Field label="Date of birth" required hint="You must be 18–65 to donate.">
            <TextInput icon="calendar" placeholder="DD / MM / YYYY" defaultValue="14 / 08 / 1997" />
          </Field>
          <Field label="Gender" required>
            <div className="grid grid-cols-3 gap-2">
              {["Female", "Male", "Other"].map((s, i) => (
                <button
                  key={s}
                  className="h-11 rounded-[10px] text-[14px] font-semibold"
                  style={{
                    background: i === 0 ? "#1A1A1A" : "white",
                    color: i === 0 ? "white" : "#1A1A1A",
                    border: `1px solid ${i === 0 ? "#1A1A1A" : "#E5E7EB"}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Weight" required hint="Minimum 50 kg for donation.">
            <TextInput placeholder="kg" defaultValue="58" />
          </Field>
          <Field label="Last donation (if any)" hint="Leave blank if you've never donated.">
            <TextInput icon="calendar" placeholder="DD / MM / YYYY" />
          </Field>
        </div>

        <div className="mt-6">
          <Field label="Any of the following apply to you?" hint="Mandatory disclosure — kept private.">
            <div className="grid gap-2">
              {[
                "Recent tattoo or piercing (last 6 months)",
                "Recent surgery or transfusion",
                "Currently on prescription medication",
                "Pregnant or recently gave birth",
              ].map((s, i) => (
                <label key={s} className="flex items-center gap-3 h-12 px-4 rounded-[10px] border border-[#E5E7EB] cursor-pointer hover:border-[#1A1A1A]/30">
                  <span className="h-4 w-4 rounded-[4px] border border-[#E5E7EB] bg-white" />
                  <span className="text-[14px] text-[#1A1A1A]">{s}</span>
                </label>
              ))}
            </div>
          </Field>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2
        className="font-bold text-[#1A1A1A] tracking-tight"
        style={{ fontSize: mobile ? 24 : 30, letterSpacing: "-0.02em" }}
      >
        Tell us about yourself
      </h2>
      <p className="mt-2 text-[14px] text-[#6B7280]">
        Basic contact details so we can reach you in an emergency. We never share your number with patients directly.
      </p>

      <div className={`mt-8 grid gap-5 ${mobile ? "" : "grid-cols-2"}`}>
        <Field label="Full name" required>
          <TextInput icon="user" placeholder="As on your ID" defaultValue="Anushka Bhattacharya" />
        </Field>
        <Field label="Phone (we'll verify with OTP)" required>
          <TextInput icon="phone" placeholder="+91 98000 00000" defaultValue="+91 98640 22184" />
        </Field>
        <Field label="Email" required>
          <TextInput icon="mail" placeholder="you@email.com" defaultValue="anushka.b@gmail.com" />
        </Field>
        <Field label="Password" required hint="Minimum 8 characters, with a number.">
          <TextInput icon="shield-check" type="password" placeholder="••••••••" defaultValue="passwordpassword" />
        </Field>
        <Field label="City" required>
          <SelectInput icon="map-pin" defaultValue="Guwahati">
            {["Guwahati","Mumbai","Delhi","Bengaluru","Kolkata","Chennai","Hyderabad","Pune"].map(c => <option key={c}>{c}</option>)}
          </SelectInput>
        </Field>
        <Field label="Pincode" required>
          <TextInput icon="map-pin" placeholder="6 digits" defaultValue="781032" />
        </Field>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <span className="h-5 w-5 rounded-[5px] border border-[#1A1A1A] bg-[#1A1A1A] grid place-items-center shrink-0 mt-0.5">
            <Icon name="check" size={12} strokeWidth={3} className="text-white" />
          </span>
          <span className="text-[13px] text-[#6B7280] leading-[1.55]">
            I'm available to receive emergency requests by SMS and push, even outside daytime hours. (You can change this later.)
          </span>
        </label>
      </div>
    </div>
  );
}

function RequesterFormStep({ mobile }) {
  return (
    <div>
      <h2
        className="font-bold text-[#1A1A1A] tracking-tight"
        style={{ fontSize: mobile ? 24 : 30, letterSpacing: "-0.02em" }}
      >
        Create your requester account
      </h2>
      <p className="mt-2 text-[14px] text-[#6B7280]">
        You'll be able to post requests for yourself or on behalf of a patient.
      </p>

      <div className={`mt-8 grid gap-5 ${mobile ? "" : "grid-cols-2"}`}>
        <Field label="Full name" required>
          <TextInput icon="user" placeholder="As on your ID" />
        </Field>
        <Field label="Phone (we'll verify with OTP)" required>
          <TextInput icon="phone" placeholder="+91 98000 00000" />
        </Field>
        <Field label="Email" required>
          <TextInput icon="mail" placeholder="you@email.com" />
        </Field>
        <Field label="Password" required>
          <TextInput icon="shield-check" type="password" placeholder="••••••••" />
        </Field>
        <Field label="City" required>
          <SelectInput icon="map-pin" defaultValue="Mumbai">
            {["Guwahati","Mumbai","Delhi","Bengaluru","Kolkata","Chennai","Hyderabad","Pune"].map(c => <option key={c}>{c}</option>)}
          </SelectInput>
        </Field>
        <Field label="Relationship to patient" hint="If posting on someone's behalf.">
          <SelectInput defaultValue="Self">
            {["Self","Family member","Friend","Hospital staff","Other"].map(c => <option key={c}>{c}</option>)}
          </SelectInput>
        </Field>
      </div>
    </div>
  );
}

function BankFormStep({ mobile }) {
  return (
    <div>
      <h2
        className="font-bold text-[#1A1A1A] tracking-tight"
        style={{ fontSize: mobile ? 24 : 30, letterSpacing: "-0.02em" }}
      >
        Register your blood bank
      </h2>
      <p className="mt-2 text-[14px] text-[#6B7280]">
        We verify all institutions against the NBTC registry before activating an account. Approval usually takes 24–48 hours.
      </p>

      <div className={`mt-8 grid gap-5 ${mobile ? "" : "grid-cols-2"}`}>
        <Field label="Institution name" required className={mobile ? "" : "col-span-2"}>
          <TextInput icon="hospital" placeholder="GMC Blood Bank" />
        </Field>
        <Field label="NBTC license number" required>
          <TextInput placeholder="e.g. AS/B-1284/2019" />
        </Field>
        <Field label="Drug license number" required>
          <TextInput placeholder="e.g. 20B/21B-3140" />
        </Field>
        <Field label="Type" required>
          <SelectInput defaultValue="Government">
            {["Government","Private","Non-profit","Charitable Trust"].map(c => <option key={c}>{c}</option>)}
          </SelectInput>
        </Field>
        <Field label="Accreditation">
          <SelectInput defaultValue="NABH">
            {["NABH","NABL","ISO 9001","Other"].map(c => <option key={c}>{c}</option>)}
          </SelectInput>
        </Field>
        <Field label="Admin contact name" required>
          <TextInput icon="user" placeholder="Account administrator" />
        </Field>
        <Field label="Admin email" required>
          <TextInput icon="mail" placeholder="admin@bloodbank.in" />
        </Field>
        <Field label="Admin phone" required>
          <TextInput icon="phone" placeholder="+91 98000 00000" />
        </Field>
        <Field label="Password" required>
          <TextInput icon="shield-check" type="password" placeholder="••••••••" />
        </Field>
        <Field label="City" required>
          <SelectInput icon="map-pin" defaultValue="Guwahati">
            {["Guwahati","Mumbai","Delhi","Bengaluru","Kolkata","Chennai","Hyderabad","Pune"].map(c => <option key={c}>{c}</option>)}
          </SelectInput>
        </Field>
        <Field label="Full address" required className={mobile ? "" : "col-span-2"}>
          <TextInput icon="map-pin" placeholder="Street, locality, pincode" />
        </Field>
      </div>
    </div>
  );
}

function VerificationStep({ mobile }) {
  return (
    <div>
      <h2
        className="font-bold text-[#1A1A1A] tracking-tight"
        style={{ fontSize: mobile ? 24 : 30, letterSpacing: "-0.02em" }}
      >
        Upload verification documents
      </h2>
      <p className="mt-2 text-[14px] text-[#6B7280]">
        We need to confirm your institution is licensed and operational. Files stay encrypted and never leave India.
      </p>

      <div className="mt-8 grid gap-4">
        {[
          { title: "NBTC license certificate", hint: "PDF or JPG · max 8 MB", done: true },
          { title: "Drug license (Form 20B / 21B)", hint: "PDF or JPG · max 8 MB", done: false },
          { title: "Accreditation certificate", hint: "Optional but speeds up approval.", done: false },
        ].map(d => (
          <div
            key={d.title}
            className="flex items-center gap-4 p-4 rounded-[12px] border border-[#E5E7EB] bg-white"
          >
            <div
              className="h-11 w-11 rounded-[10px] grid place-items-center shrink-0"
              style={{
                background: d.done ? "#D1FAE5" : "#FAFAFA",
                color: d.done ? "#10B981" : "#9CA3AF",
              }}
            >
              <Icon name={d.done ? "check-circle" : "plus"} size={18} />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-[#1A1A1A]">{d.title}</div>
              <div className="text-[12px] text-[#6B7280] mt-0.5">
                {d.done ? "license-2019.pdf · 1.2 MB · uploaded" : d.hint}
              </div>
            </div>
            <Button variant="secondary" size="sm">
              {d.done ? "Replace" : "Upload"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfirmStep({ role, mobile }) {
  const sections = role === "donor"
    ? [
        { label: "Account", items: [["Name","Anushka Bhattacharya"], ["Email","anushka.b@gmail.com"], ["Phone","+91 98640 22184"], ["City","Guwahati 781032"]] },
        { label: "Blood profile", items: [["Blood group","O+"], ["Date of birth","14 Aug 1997 (28y)"], ["Gender","Female"], ["Weight","58 kg"]] },
      ]
    : role === "requester"
    ? [
        { label: "Account", items: [["Name","—"], ["Email","—"], ["Phone","—"], ["City","Mumbai"]] },
      ]
    : [
        { label: "Institution", items: [["Name","GMC Blood Bank"], ["Type","Government"], ["NBTC license","AS/B-1284/2019"], ["City","Guwahati"]] },
        { label: "Admin", items: [["Name","—"], ["Email","—"], ["Phone","—"], ["Accreditation","NABH"]] },
      ];

  return (
    <div>
      <h2
        className="font-bold text-[#1A1A1A] tracking-tight"
        style={{ fontSize: mobile ? 24 : 30, letterSpacing: "-0.02em" }}
      >
        Review and confirm
      </h2>
      <p className="mt-2 text-[14px] text-[#6B7280]">
        Everything look right? You can edit any field after creating your account.
      </p>

      <div className="mt-8 grid gap-4">
        {sections.map(s => (
          <Card key={s.label} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Eyebrow>{s.label}</Eyebrow>
              <button className="text-[12px] font-semibold text-[#1A1A1A] hover:underline">Edit</button>
            </div>
            <div className={`grid gap-x-8 gap-y-3 ${mobile ? "" : "grid-cols-2"}`}>
              {s.items.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-[13px] text-[#6B7280]">{k}</span>
                  <span className="text-[13px] font-semibold text-[#1A1A1A]">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}

        <Card className="p-5 bg-[#FAFAFA]">
          <label className="flex items-start gap-3 cursor-pointer">
            <span className="h-5 w-5 rounded-[5px] border border-[#1A1A1A] bg-[#1A1A1A] grid place-items-center shrink-0 mt-0.5">
              <Icon name="check" size={12} strokeWidth={3} className="text-white" />
            </span>
            <span className="text-[13px] text-[#1A1A1A] leading-[1.6]">
              I confirm the information above is accurate and I agree to RaktSetu's{" "}
              <a href="#" className="font-semibold underline">Terms of Service</a> and{" "}
              <a href="#" className="font-semibold underline">Privacy Policy</a>. I understand my contact information may be shared with verified blood banks when I pledge.
            </span>
          </label>
        </Card>
      </div>
    </div>
  );
}

function ScreenRegister({ mobile }) {
  const [role, setRole] = React.useState("donor");
  const [stepIdx, setStepIdx] = React.useState(0);
  const steps = STEPS_BY_ROLE[role];
  const step = steps[stepIdx];

  let body;
  if (step === "Role") body = <RoleStep role={role} setRole={setRole} mobile={mobile} />;
  else if (step === "About you" && role === "donor") body = <DonorFormStep mobile={mobile} sub="about" />;
  else if (step === "About you" && role === "requester") body = <RequesterFormStep mobile={mobile} />;
  else if (step === "Blood profile") body = <DonorFormStep mobile={mobile} sub="blood" />;
  else if (step === "Institution") body = <BankFormStep mobile={mobile} />;
  else if (step === "Verification") body = <VerificationStep mobile={mobile} />;
  else if (step === "Confirm") body = <ConfirmStep role={role} mobile={mobile} />;

  return (
    <div className="bg-[#FAFAFA] min-h-full">
      <header className={`bg-white border-b border-[#E5E7EB] ${mobile ? "px-5 h-14" : "h-[72px]"} flex items-center`}>
        <div className={mobile ? "flex items-center justify-between w-full" : "max-w-[1100px] mx-auto px-8 w-full flex items-center justify-between"}>
          <Logo size={mobile ? 22 : 28} />
          <div className="text-[13px] text-[#6B7280]">
            Already have an account?{" "}
            <a href="#" className="font-semibold text-[#1A1A1A] hover:underline">Sign in</a>
          </div>
        </div>
      </header>

      <div className={mobile ? "px-5 py-6" : "max-w-[1100px] mx-auto px-8 py-10"}>
        <div className={mobile ? "mb-6 overflow-x-auto -mx-5 px-5" : "mb-10"}>
          <StepperBar steps={steps} current={stepIdx} />
        </div>

        {body}

        <div className={`mt-10 flex items-center ${mobile ? "flex-col-reverse gap-3" : "justify-between"} pt-6 border-t border-[#E5E7EB]`}>
          {!mobile && (
            <Button
              variant="ghost"
              size="md"
              icon="arrow-left"
              onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
              disabled={stepIdx === 0}
              className={stepIdx === 0 ? "opacity-40 pointer-events-none" : ""}
            >
              Back
            </Button>
          )}
          <div className={`flex items-center gap-3 ${mobile ? "w-full flex-col-reverse" : ""}`}>
            {!mobile && (
              <span className="text-[13px] text-[#6B7280]">
                Step {stepIdx + 1} of {steps.length}
              </span>
            )}
            {stepIdx === steps.length - 1 ? (
              <Button variant="primary" size="lg" iconRight="check" className={mobile ? "w-full" : ""}>
                Create account
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                iconRight="arrow-right"
                className={mobile ? "w-full" : ""}
                onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))}
              >
                Continue
              </Button>
            )}
            {mobile && stepIdx > 0 && (
              <button
                onClick={() => setStepIdx(stepIdx - 1)}
                className="text-[14px] font-semibold text-[#6B7280]"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenRegister });
