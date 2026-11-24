import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/components/Logo";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Coverage", href: "/coverage" },
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Send Parcel", href: "/send-parcel" },
    { label: "Track Parcel", href: "/dashboard/tracking" },
  ];

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await signOutUser();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between w-full gap-3">
      <div className="flex items-center gap-2">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-[#03373d]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/rider"
                onClick={closeMenu}
                className="mt-2 rounded-lg bg-lime-300 px-3 py-2 text-sm font-semibold text-[#03373d]"
              >
                Be a Rider
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="mt-1 rounded-lg bg-lime-300 px-3 py-2 text-sm font-semibold text-[#03373d]"
                >
                  Dashboard
                </Link>
              )}
              {user ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLogout}
                  className="mt-4 w-full"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-lg bg-lime-300 px-3 py-2 text-center text-sm font-semibold text-[#03373d]"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Logo className="flex items-center" />
      </div>

      <div className="hidden items-center gap-6 lg:flex">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="text-[15px] font-semibold text-muted-foreground transition-colors hover:text-[#03373d]"
          >
            {item.label}
          </Link>
        ))}

        <Button
          render={<Link to="/rider" />}
          className="h-10 rounded-full bg-lime-300 px-6 font-semibold text-[#03373d] hover:bg-lime-400"
        >
          Be a Rider
        </Button>
        {user && (
          <Button
            render={<Link to="/dashboard/my-parcels" />}
            className="h-10 rounded-full bg-lime-300 px-6 font-semibold text-[#03373d] hover:bg-lime-400"
          >
            My parcels
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Button
              render={<Link to="/dashboard" />}
              className="h-11 rounded-lg bg-lime-300 px-7 font-semibold text-slate-950 hover:bg-lime-400"
            >
              Dashboard
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className="h-11 rounded-lg border-slate-200 px-7 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              render={<Link to="/login" />}
              variant="outline"
              className="hidden h-11 rounded-lg border-slate-200 px-7 font-semibold text-slate-700 hover:bg-slate-50 sm:inline-flex"
            >
              Sign In
            </Button>

            <Button
              render={<Link to="/register" />}
              className="h-11 rounded-lg bg-lime-300 px-7 font-semibold text-slate-950 hover:bg-lime-400"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
