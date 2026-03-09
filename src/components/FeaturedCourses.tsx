import { motion } from "framer-motion";
import { Clock, IndianRupee, ArrowRight, Users, Star, TrendingUp, Code, Database, Cloud } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";

const colors = [
  "from-blue-500 to-purple-600",
  "from-orange-500 to-red-500",
  "from-emerald-500 to-teal-600",
  "from-purple-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600"
];

const icons = [Code, Database, Cloud, Code, Database, Cloud];

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .limit(6);

    if (!error && data) {
      setCourses(data);
    }
  };

  const handleMouseMove = (e: React.MouseEvent, id: string) => {
    if (!cardRefs.current[id]) return;
    const rect = cardRefs.current[id].getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRefs.current[id].style.setProperty('--mouse-x', `${x}%`);
    cardRefs.current[id].style.setProperty('--mouse-y', `${y}%`);
  };

  const handleEnrollClick = (e: React.MouseEvent, courseTitle: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to contact page with course pre-filled
    navigate('/contact', { 
      state: { 
        selectedCourse: courseTitle,
        fromEnroll: true 
      } 
    });
  };

  return (
    <section className="py-24 md:py-32 bg-[#0B1120] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-full mb-4"
          >
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
              Our Programs
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-white">
              Featured
            </span>
            <span className="gradient-text ml-2">Courses</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Industry-aligned programs designed to make you job-ready from day one.
            <span className="block text-sm mt-2 text-blue-400 font-medium">
              🚀 100% Placement Assistance • Industry Experts • Hands-on Training
            </span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => {
            const Icon = icons[i % icons.length];
            const studentCount = i === 0 ? 199 : i === 1 ? 166 : i === 2 ? 182 : Math.floor(Math.random() * 100) + 150;
            const isPopular = i === 0;
            const isTrending = i === 2;
            
            return (
              <motion.div
                key={course.id}
                ref={(el) => el && (cardRefs.current[course.id] = el)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseMove={(e) => handleMouseMove(e, course.id)}
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="tech-card group cursor-pointer"
                onClick={() => navigate('/contact', { state: { selectedCourse: course.title } })}
              >
                {/* Gradient Top Bar */}
                <div className={`h-2 bg-gradient-to-r ${colors[i % colors.length]}`} />

                <div className="p-8">
                  {/* Icon and Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors[i % colors.length]} p-0.5`}>
                      <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-500/30">
                      {isPopular ? 'Most Popular' : isTrending ? 'Trending' : 'New Batch'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-gray-300">{studentCount}+</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-gray-300">{course.duration}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">(4.8/5)</span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <IndianRupee className="w-4 h-4 text-blue-400" />
                      <span className="text-2xl font-bold text-white">{course.fee.replace('₹', '')}</span>
                      <span className="text-xs text-gray-500 ml-1">one-time</span>
                    </div>

                    <button
                      onClick={(e) => handleEnrollClick(e, course.title)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-300 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 group/link border border-blue-500/30 cursor-pointer"
                    >
                      <span>Enroll Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>

                  {/* Hover Progress Bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredId === course.id ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`h-0.5 bg-gradient-to-r ${colors[i % colors.length]} mt-6`}
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/courses"
            className="group inline-flex items-center gap-3 gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-600/25 transition-all duration-300 hover:scale-105 relative overflow-hidden shine-effect"
          >
            <span className="relative z-10">View All Courses</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            🎓 6+ industry-relevant courses • Flexible learning options
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCourses;