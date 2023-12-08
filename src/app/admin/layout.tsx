import Sidebar from "@/components/sidebar";
import TopBar from "@/components/sidebar/topbar";
import { navRoute } from "@/utils/constants";

export default function AdminLayout({
  children, // will be a page or nested layout
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
        <div>
          <TopBar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
