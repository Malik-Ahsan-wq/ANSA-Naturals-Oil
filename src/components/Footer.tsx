import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-10 sm:pt-16 pb-6 sm:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* GRID COLUMNS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">

          {/* Column 1: Brand & Bio */}
            <div className="col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-black text-sm transition-transform group-hover:rotate-12">
                A
              </div>
              <span className="text-base sm:text-xl font-black tracking-tight text-zinc-900 uppercase">
                AB <span className="text-orange-600">Restaurant</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-xs">
              Crafting unforgettable culinary experiences since 2010. We pride ourselves on using fresh ingredients and traditional techniques.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                <FaFacebook size={18} />
              </a>
              <a 
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-zinc-900 font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Menu', 'Our Story', 'Reservations', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-zinc-500 text-sm hover:text-orange-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-zinc-300 rounded-full group-hover:bg-orange-600 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-zinc-900 font-bold mb-6 uppercase tracking-widest text-xs">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <FaMapMarkerAlt className="mt-1 text-orange-600" />
                <span>Khalid Town, <br />Food District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500">
                <FaPhoneAlt className="text-orange-600" />
                <span>03276227156</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500">
                <FaEnvelope className="text-orange-600" />
              
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours */}
          <div>
            <h4 className="text-zinc-900 font-bold mb-6 uppercase tracking-widest text-xs">Opening Hours</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Mon - Thu:</span>
                <span className="text-zinc-900 font-medium">11am - 10pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Fri - Sat:</span>
                <span className="text-orange-600 font-bold">11am - 12pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Sunday:</span>
                <span className="text-zinc-900 font-medium">10am - 9pm</span>
              </div>
              <p className="mt-4 text-[10px] text-zinc-400 italic">
                * Kitchen closes 30 mins prior to closing time.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} AB Restaurant. Built with passion for great food.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-zinc-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
