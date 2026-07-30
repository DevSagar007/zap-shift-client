import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "../components/ui/AppSidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="min-h-screen flex-1">
        <div className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-5 backdrop-blur">
          <SidebarTrigger />

          <div>
            <h1 className="text-lg font-extrabold text-[#03373d]">
              Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage your parcel delivery activity
            </p>
          </div>
        </div>

        <div className="p-5 lg:p-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
