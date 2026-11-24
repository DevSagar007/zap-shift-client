import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Link, Outlet, useNavigate } from "react-router";
import {
  House,
  LayoutDashboard,
  LogOut,
  Package,
  Receipt,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppSidebar } from "../components/ui/app-sidebar";
import useAuth from "../hooks/useAuth";

function DashboardUserMenu() {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutUser();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open user menu"
            className="inline-flex size-10 items-center justify-center rounded-full p-1 text-[#03373d] outline-none transition-colors hover:bg-lime-200 focus-visible:ring-2 focus-visible:ring-lime-400"
          />
        }
      >
        <Avatar className="size-8">
          <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
          <AvatarFallback className="bg-lime-200 text-[#03373d]">
            {user.displayName?.charAt(0)?.toUpperCase() || (
              <UserRound className="size-4" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage
                src={user.photoURL}
                alt={user.displayName || "User"}
              />
              <AvatarFallback className="bg-lime-200 text-[#03373d]">
                {user.displayName?.charAt(0)?.toUpperCase() || (
                  <UserRound className="size-5" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#03373d]">
                {user.displayName || "Zap Shift User"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLinkItem
            render={<Link to="/" />}
            closeOnClick
            className="cursor-pointer"
          >
            <House className="size-4" />
            Home
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem
            render={<Link to="/dashboard" />}
            closeOnClick
            className="cursor-pointer"
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem
            render={<Link to="/dashboard/my-parcels" />}
            closeOnClick
            className="cursor-pointer"
          >
            <Package className="size-4" />
            My Parcels
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem
            render={<Link to="/dashboard/payment-history" />}
            closeOnClick
            className="cursor-pointer"
          >
            <Receipt className="size-4" />
            Payment History
          </DropdownMenuLinkItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
              <span className="text-sm font-medium text-muted-foreground">
                Dashboard
              </span>
            </div>
            <div className="px-4">
              <DashboardUserMenu />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
