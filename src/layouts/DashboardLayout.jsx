import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import {
  House,
  LayoutDashboard,
  LogOut,
  Package,
  Receipt,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "../components/ui/app-sidebar";
import useAuth from "../hooks/useAuth";

function DashboardUserMenu() {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const goTo = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await signOutUser();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="Open user menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex size-10 items-center justify-center rounded-full border-0 bg-lime-100 p-1 text-[#03373d] outline-none transition-colors hover:bg-lime-200 focus-visible:ring-2 focus-visible:ring-lime-400"
      >
        <Avatar className="size-8">
          <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
          <AvatarFallback className="bg-lime-200 text-[#03373d]">
            {user.displayName?.charAt(0)?.toUpperCase() || <UserRound className="size-4" />}
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-[100] w-64 rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-xl">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="size-10">
              <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
              <AvatarFallback className="bg-lime-200 text-[#03373d]">
                {user.displayName?.charAt(0)?.toUpperCase() || <UserRound className="size-5" />}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#03373d]">{user.displayName || "Zap Shift User"}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <div className="my-1 h-px bg-slate-200" />
          <button type="button" onClick={() => goTo("/")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100">
            <House className="size-4" /> Home
          </button>
          <button type="button" onClick={() => goTo("/dashboard")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100">
            <LayoutDashboard className="size-4" /> Dashboard
          </button>
          <button type="button" onClick={() => goTo("/dashboard/my-parcels")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100">
            <Package className="size-4" /> My Parcels
          </button>
          <button type="button" onClick={() => goTo("/dashboard/payment-history")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100">
            <Receipt className="size-4" /> Payment History
          </button>
          <div className="my-1 h-px bg-slate-200" />
          <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
            <LogOut className="size-4" /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <span className="text-sm font-medium text-muted-foreground">Dashboard</span>
            </div>
            <div className="px-4"><DashboardUserMenu /></div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4"><Outlet /></div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
