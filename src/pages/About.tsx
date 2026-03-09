import { motion } from "framer-motion";
import { Target, Eye, CheckCircle, Users, BookOpen, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const highlights = [
  { icon: Users, title: "1500+ Students", desc: "Trained and placed in top companies" },
  { icon: BookOpen, title: "15+ Courses", desc: "Covering latest technologies" },
  { icon: Award, title: "8+ Years", desc: "Of excellence in IT education" },
];

const values = [
  "Industry-expert faculty with real-world experience",
  "Hands-on project-based learning approach",
  "Small batch sizes for personalized attention",
  "100% placement assistance and career guidance",
  "Modern lab infrastructure with latest tools",
  "Flexible timings for working professionals",
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Header */}
    <section className="pt-28 pb-12 md:pt-36 md:pb-16 hero-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4">About Us</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Empowering the next generation of tech professionals since 2017.
          </p>
        </motion.div>
      </div>
    </section>

    {/* About Content */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              G-Tech Computer Education
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              G-Tech Computer Education is a premier software training institute located in the heart of Anantapur, Andhra Pradesh. Situated on the 2nd Floor of Raghuveera Towers, Kamalanagar, we've been transforming aspiring professionals into industry-ready developers since our inception.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our programs in Python Full Stack, Java Full Stack, and Power BI are meticulously designed with the latest industry standards. We believe in learning by doing — every student works on real-world projects that prepare them for actual job scenarios.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {highlights.map((h, i) => (
              <div key={h.title} className="bg-card rounded-2xl p-6 text-center card-elevated">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl hero-gradient flex items-center justify-center">
                  <h.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-display font-bold text-foreground text-lg">{h.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{h.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 card-elevated"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To provide world-class software training that bridges the gap between academic knowledge and industry requirements, making every student job-ready and confident in their technical abilities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-8 card-elevated"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the most trusted and innovative IT training center in Andhra Pradesh, recognized for producing skilled professionals who drive technological advancement across industries.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Why Choose Us?</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 bg-card rounded-xl p-4 card-elevated"
            >
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-foreground">{v}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <CTASection />
    <Footer />
  </div>
);

export default About;
