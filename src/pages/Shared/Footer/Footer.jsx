import { Globe, Mail, Send, Share2 } from "lucide-react";
import { Link } from "react-router";
import Logo from "@/components/Logo";

const menus = [
  {
    title: "Services",
    items: [
      { label: "Parcel Delivery", href: "/send-parcel" },
      { label: "Courier Services", href: "/send-parcel" },
      { label: "Track Parcel", href: "/dashboard/tracking" },
      { label: "Coverage Areas", href: "/coverage" },
    ],
  },
  {
    title: "Quick Links",
    items: [
      { label: "How it Works", href: "/#how-it-works" },
      { label: "Our Services", href: "/#services" },
      { label: "Send Parcel", href: "/send-parcel" },
      { label: "Be a Rider", href: "/rider" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/#how-it-works" },
      { label: "Coverage", href: "/coverage" },
      { label: "Careers", href: "/rider" },
      { label: "Contact", href: "/coverage" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#052E33] py-16 text-slate-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Logo className="brightness-0 invert" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
              Zap Shift makes local parcel delivery fast, simple, and
              trackable. Send a parcel or join our rider network today.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" aria-label="Website" className="text-white/80 transition-colors hover:text-lime-300">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Updates" className="text-white/80 transition-colors hover:text-lime-300">
                <Send className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Contact" className="text-white/80 transition-colors hover:text-lime-300">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Share" className="text-white/80 transition-colors hover:text-lime-300">
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {menus.map((menu) => (
            <div key={menu.title}>
              <h3 className="mb-4 text-base font-semibold text-white">
                {menu.title}
              </h3>
              <ul className="space-y-3">
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm font-medium text-slate-200 transition-colors hover:text-lime-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 border-t border-lime-300/15 pt-6">
          <p className="text-sm text-white/80 text-center">
            © {new Date().getFullYear()} Zap Shift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
