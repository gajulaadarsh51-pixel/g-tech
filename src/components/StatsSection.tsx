import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Users, Award, BookOpen, Briefcase } from "lucide-react";

const stats = [
  { icon: Users, label: "Students Trained", value: 1500, suffix: "+" },
  { icon: Briefcase, label: "Placements", value: 800, suffix: "+" },
  { icon: BookOpen, label: "Courses Offered", value: 15, suffix: "+" },
  { icon: Award, label: "Years of Excellence", value: 8, suffix: "+" },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-display font-bold text-foreground">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const StatsSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 md:p-8 text-center card-elevated"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl hero-gradient flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
