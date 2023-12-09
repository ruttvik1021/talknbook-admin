import Sidebar from "@/components/navbars";
import TopBar from "@/components/navbars/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar (hidden on small screens) */}
      <div className="hidden sm:block md:w-1/6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full sm:w-5/6">
        {/* TopBar (visible on small screens) */}
        <div className="sm:hidden ">
          <TopBar />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
