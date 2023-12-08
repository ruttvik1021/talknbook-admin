import Sidebar from "@/components/navbars";
import TopBar from "@/components/navbars/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:block w-1/6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-4">
        <div className="md:hidden">
          <TopBar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
