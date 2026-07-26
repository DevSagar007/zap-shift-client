export default function Footer() {
  const menus = [
    "Services",
    "Coverage",
    "About Us",
    "Pricing",
    "Blog",
    "Contact",
  ];

  return (
    <footer className="bg-[#F5F5F5] py-20">
      <div className="container mx-auto px-5">
        <div className="bg-[#0A0A0A] rounded-[40px] py-24 px-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/images/logo-white.svg" alt="ZapShift" className="h-14" />
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#C6C6C6] text-lg leading-9">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-cyan-700/40 my-14"></div>

          {/* Menu */}
          <ul className="flex flex-wrap justify-center gap-x-14 gap-y-5">
            {menus.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-white text-xl transition duration-300 hover:text-lime-400"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="border-t border-dashed border-cyan-700/40 my-14"></div>

          {/* Social */}
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="w-14 h-14 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-2xl hover:scale-110 transition"
              aria-label="LinkedIn"
            >
              <span className="text-sm font-bold tracking-tight">in</span>
            </a>

            <a
              href="#"
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-2xl hover:scale-110 transition"
              aria-label="X"
            >
              <span className="text-lg font-bold">X</span>
            </a>

            <a
              href="#"
              className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-2xl hover:scale-110 transition"
              aria-label="Facebook"
            >
              <span className="text-lg font-bold">f</span>
            </a>

            <a
              href="#"
              className="w-14 h-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-2xl hover:scale-110 transition"
              aria-label="YouTube"
            >
              <span className="text-base font-bold">yt</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
