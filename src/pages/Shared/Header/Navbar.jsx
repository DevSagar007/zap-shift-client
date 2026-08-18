import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Coverage", href: "/coverage" },
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
  ];

  const handleLogout = () => {
    signOutUser().then(() => {
      navigate("/login");
    });
  };

  return (
    <nav className="flex items-center justify-between w-full">
      <Link to="/" className="flex items-center">
        <Logo />
      </Link>

      <div className="hidden items-center gap-8 lg:flex">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#03373d]"
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
          <>
            <Button
              render={<Link to="/dashboard/my-parcels" />}
              className="h-10 rounded-full bg-lime-300 px-6 font-semibold text-[#03373d] hover:bg-lime-400"
            >
              My parcels
            </Button>
          </>
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

            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-[#1f1f1f] text-lime-300 hover:bg-[#111111]"
              aria-label="Open quick action"
            >
              <ArrowUpRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
