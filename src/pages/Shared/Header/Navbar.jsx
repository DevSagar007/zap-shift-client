import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

function Navbar() {
  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Coverage", href: "/coverage" },
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
  ];

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
          asChild
          className="h-10 rounded-full bg-lime-300 px-6 font-semibold text-[#03373d] hover:bg-lime-400"
        >
          <Link to="/rider">Be a Rider</Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="outline"
          className="hidden h-11 rounded-lg border-slate-200 px-7 font-semibold text-slate-700 hover:bg-slate-50 sm:inline-flex"
        >
          <Link to="/login">Sign In</Link>
        </Button>

        <Button
          asChild
          className="h-11 rounded-lg bg-lime-300 px-7 font-semibold text-slate-950 hover:bg-lime-400"
        >
          <Link to="/register">Sign Up</Link>
        </Button>

        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-[#1f1f1f] text-lime-300 hover:bg-[#111111]"
          aria-label="Open quick action"
        >
          <ArrowUpRight className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
