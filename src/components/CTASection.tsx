import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="py-16 md:py-24 relative overflow-hidden">
    <div className="absolute inset-0 hero-gradient" />
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 right-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
    </div>
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-8">
          Join thousands of students who have transformed their careers with G-Tech Computer Education.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Courses <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/918886314615"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 px-8 py-4 rounded-xl font-semibold hover:bg-primary-foreground/20 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
