import { motion } from "framer-motion";
import { Monitor, Users, Briefcase, BookOpen, Award, Headphones } from "lucide-react";

const features = [
  { icon: Monitor, title: "Hands-On Training", desc: "Real-world projects and live coding sessions." },
  { icon: Users, title: "Expert Instructors", desc: "Learn from industry professionals with years of experience." },
  { icon: Briefcase, title: "Placement Support", desc: "Dedicated placement cell with top company partnerships." },
  { icon: BookOpen, title: "Updated Curriculum", desc: "Course content aligned with latest industry trends." },
  { icon: Award, title: "Certification", desc: "Recognized certificates upon course completion." },
  { icon: Headphones, title: "Lifetime Support", desc: "Access to resources and community even after course." },
];

const WhyChooseUs = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why G-Tech</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
          Why Choose G-Tech Computer Education?
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl p-6 md:p-8 card-elevated group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
              <f.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
