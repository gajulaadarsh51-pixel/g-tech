import { GraduationCap, Phone, MapPin, Clock, Mail, Github, Twitter, Linkedin, Youtube, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {

  return (
    <footer className="bg-[#0B1120] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              
              <div className="relative">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-0.5 gradient-bg rounded-xl opacity-50 blur" />
              </div>

              <div>
                <span className="text-2xl font-display font-bold block leading-tight text-white">
                  G-Tech
                </span>
                <span className="text-xs text-blue-300 font-mono">
                  &lt;code_lab /&gt;
                </span>
              </div>

            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Empowering students with industry-ready skills since 2010. Your success is our mission.
            </p>

            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 group border border-white/10"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>

            <h4 className="text-lg font-display font-semibold mb-6 relative inline-block text-white">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 gradient-bg rounded-full" />
            </h4>

            <div className="flex flex-col gap-3">

              {[
                { name: "Home", path: "/" },
                { name: "Courses", path: "/courses" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
              ].map((link, i) => (

                <Link
                  key={i}
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.name}
                </Link>

              ))}

            </div>
          </div>

          {/* Contact */}
          <div>

            <h4 className="text-lg font-display font-semibold mb-6 relative inline-block text-white">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 gradient-bg rounded-full" />
            </h4>

            <div className="flex flex-col gap-4">

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors border border-white/10">
                  <MapPin className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </div>

                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  2nd Floor, Raghuveera Towers,<br />
                  Kamalanagar, Anantapur, AP 515001
                </span>

              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors border border-white/10">
                  <Phone className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </div>

                <a href="tel:08886314615" className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  08886314615
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors border border-white/10">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </div>

                <a href="mailto:info@gtechcomputer.edu" className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  info@gtechcomputer.edu
                </a>

              </div>

            </div>

          </div>

          {/* Working Hours */}
          <div>

            <h4 className="text-lg font-display font-semibold mb-6 relative inline-block text-white">
              Working Hours
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 gradient-bg rounded-full" />
            </h4>

            <div className="flex flex-col gap-3">

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Mon – Fri: 9 AM – 7 PM</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Saturday: 9 AM – 6 PM</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Sunday: Closed</span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Bar */}

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} G-Tech Computer Education. All rights reserved.
          </div>

          <div className="flex items-center gap-6">

            <Link to="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>

            <Link to="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms of Use
            </Link>

            <Link to="/sitemap" className="text-xs text-gray-500 hover:text-white transition-colors">
              Sitemap
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;