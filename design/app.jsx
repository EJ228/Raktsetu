/* RaktSetu — app shell with screen tabs + viewport toggle */

const SCREENS = [
  { id: "landing", label: "01 · Landing", Component: window.ScreenLanding },
  { id: "search", label: "02 · Search", Component: window.ScreenSearch },
  { id: "login", label: "03 · Login", Component: window.ScreenLogin },
  { id: "register", label: "04 · Register", Component: window.ScreenRegister },
  { id: "donor-dashboard", label: "05 · Donor dashboard", Component: window.ScreenDonorDashboard },
  { id: "donor-profile", label: "06 · Donor profile", Component: window.ScreenDonorProfile },
  { id: "pledge", label: "07 · Pledge", Component: window.ScreenPledge },
  { id: "create-request", label: "08 · Create request", Component: window.ScreenCreateRequest },
];

function ScaledStage({ designWidth, children }) {
  const ref = React.useRef(null);
  const [zoom, setZoom] = React.useState(1);
  React.useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const update = () => {
      const w = parent.clientWidth;
      const z = Math.min(1, (w - 48) / designWidth);
      setZoom(z > 0 ? z : 1);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [designWidth]);
  return (
    <div ref={ref} style={{ zoom, width: designWidth }}>
      {children}
    </div>
  );
}

function App() {
  const [screen, setScreen] = React.useState("landing");
  const [viewport, setViewport] = React.useState("desktop");
  const current = SCREENS.find(s => s.id === screen);
  const C = current.Component;

  const isMobile = viewport === "mobile";

  return (
    <div className="min-h-screen bg-[#0E0E10] text-white flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-white/10 bg-[#0E0E10] sticky top-0 z-50">
        <div className="px-5 h-[60px] flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <span
              className="grid place-items-center rounded-[7px]"
              style={{ width: 26, height: 26, background: "#C8232C" }}
            >
              <Icon name="droplet" size={14} className="text-white" strokeWidth={2.4} />
            </span>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold tracking-tight">RaktSetu</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-white/40">Screens 1–4 · v0.1</div>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center gap-1 overflow-x-auto">
            {SCREENS.map(s => (
              <button
                key={s.id}
                onClick={() => setScreen(s.id)}
                className="px-3.5 h-9 rounded-[8px] text-[12.5px] font-semibold whitespace-nowrap transition-colors"
                style={{
                  background: screen === s.id ? "white" : "transparent",
                  color: screen === s.id ? "#0E0E10" : "rgba(255,255,255,0.7)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.12em] text-white/40">Viewport</span>
            <div className="inline-flex p-1 rounded-[8px] bg-white/5 border border-white/10">
              <button
                onClick={() => setViewport("desktop")}
                className="px-3 h-7 rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1.5"
                style={{
                  background: viewport === "desktop" ? "white" : "transparent",
                  color: viewport === "desktop" ? "#0E0E10" : "rgba(255,255,255,0.7)",
                }}
              >
                <span className="h-3 w-3.5 rounded-[2px] border-2 border-current" /> Desktop
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className="px-3 h-7 rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1.5"
                style={{
                  background: viewport === "mobile" ? "white" : "transparent",
                  color: viewport === "mobile" ? "#0E0E10" : "rgba(255,255,255,0.7)",
                }}
              >
                <span className="h-3.5 w-2.5 rounded-[2px] border-2 border-current" /> Mobile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="flex-1 overflow-auto" style={{ background: "#1A1A1A" }} data-screen-label={current.label}>
        {isMobile ? (
          <div className="min-h-full py-10 grid place-items-start justify-center">
            <div
              className="rounded-[36px] p-2 bg-[#0E0E10] border border-white/10"
              style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)" }}
            >
              <div
                className="bg-white rounded-[28px] overflow-hidden"
                style={{ width: 390, height: 844 }}
              >
                <div className="h-full overflow-y-auto">
                  <C mobile />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-full py-8 px-6 grid place-items-start justify-center">
            <ScaledStage designWidth={1360}>
            <div
              className="bg-white rounded-[14px] overflow-hidden border border-white/10"
              style={{
                width: 1360,
                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5)",
              }}
            >
              <div className="h-9 px-3.5 flex items-center gap-1.5 bg-[#FAFAFA] border-b border-[#E5E7EB]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                <div className="ml-3 text-[11px] text-[#9CA3AF] font-mono">
                  raktsetu.in {screen === "landing" ? "/" : `/${screen}`}
                </div>
              </div>
              <div style={{ height: 880, overflowY: "auto" }}>
                <C />
              </div>
            </div>
            </ScaledStage>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
