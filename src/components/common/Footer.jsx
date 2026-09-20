import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import { navLinks } from "../../data/hotelData";
import Logo from "./Logo";

export default function Footer() {
  const { hotelInfo } = useContent().content;
  return (
    <footer className="bg-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-6 text-white/50 text-sm leading-relaxed max-w-xs">
              {hotelInfo.description.substring(0, 120)}...
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "Twitter", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-all duration-300 text-xs"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent mb-6">
              Experiences
            </h4>
            <ul className="space-y-3">
              {["Private Yacht", "Wine Tasting", "Spa & Wellness", "Cliffside Dining"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>{hotelInfo.location}</li>
              <li>
                <a
                  href={`mailto:${hotelInfo.email}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {hotelInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {hotelInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {hotelInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
