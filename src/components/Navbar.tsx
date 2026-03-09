import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "py-2" : "py-3 md:py-4"
    }`}>
      <div className="container mx-auto px-3 md:px-6">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`rounded-xl md:rounded-2xl transition-all duration-500 ${
            scrolled 
              ? "glass-card border border-white/10" 
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between h-14 md:h-16 lg:h-20 px-3 md:px-4">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl gradient-bg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <Terminal className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="absolute -inset-0.5 gradient-bg rounded-lg md:rounded-xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-lg lg:text-xl font-display font-bold text-white leading-tight">
                  G-Tech
                </span>
                <span className="text-[10px] md:text-xs text-blue-300 font-mono hidden xs:block">
                  &lt;code_lab /&gt;
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 relative group ${
                    location.pathname === link.path
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 gradient-bg rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-blue-600/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Link>
              ))}

              <Link
                to="/admin"
                className="ml-2 px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-medium gradient-bg text-white hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">Admin</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden container mx-auto px-3 mt-2"
          >
            <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
              <div className="p-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? "gradient-bg text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium gradient-bg text-white hover:shadow-lg transition-all duration-300 text-center mt-1"
                >
                  Admin Access
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;