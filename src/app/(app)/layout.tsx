import Sidebar from "@/components/shell/Sidebar";
import TopBar from "@/components/shell/TopBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[#F5F6FA]">
      {/* Sidebar — desktop only */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main column — header fixed at top, content scrolls below */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopBar — never scrolls, always stays at top */}
        <div className="flex-shrink-0">
          <TopBar />
        </div>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto overscroll-none p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
