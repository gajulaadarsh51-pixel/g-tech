import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, IndianRupee, ArrowRight, Filter, Search, Star, Users, BookOpen, Code, Database, Cloud, Cpu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, type Course } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fallbackCourses: Course[] = [
  { id: "1", title: "Python Full Stack", description: "Master Python, Django, REST APIs, React and build production-ready full-stack applications from scratch. Includes 5 real-world projects.", duration: "6 Months", fee: "₹35,000", created_at: "" },
  { id: "2", title: "Java Full Stack", description: "Learn Java, Spring Boot, Hibernate, Angular/React to become a complete enterprise Java developer with microservices expertise.", duration: "6 Months", fee: "₹35,000", created_at: "" },
  { id: "3", title: "Power BI", description: "Transform raw data into insightful dashboards and reports with Microsoft Power BI, DAX, and data visualization best practices.", duration: "3 Months", fee: "₹15,000", created_at: "" },
  { id: "4", title: "Data Science", description: "Master Python, pandas, numpy, scikit-learn, and machine learning algorithms. Build predictive models and data pipelines.", duration: "6 Months", fee: "₹40,000", created_at: "" },
  { id: "5", title: "MERN Stack", description: "Become a full-stack JavaScript developer with MongoDB, Express.js, React, and Node.js. Build modern web applications.", duration: "5 Months", fee: "₹32,000", created_at: "" },
  { id: "6", title: "DevOps", description: "Learn Docker, Kubernetes, Jenkins, AWS, and CI/CD pipelines. Master modern DevOps practices and tools.", duration: "4 Months", fee: "₹28,000", created_at: "" },
];

const courseColors = [
  "from-blue-500 to-purple-600",
  "from-orange-500 to-red-500",
  "from-emerald-500 to-teal-600",
  "from-purple-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600"
];

const icons = [Code, Database, Cloud, Cpu, Code, Database];

const categories = ["All", "Full Stack", "Data Science", "DevOps", "Cloud", "Frontend"];

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(fallbackCourses);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          setCourses(data);
          setFilteredCourses(data);
        }
      } catch {
        // use fallback
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;
    
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(course => 
        course.title.includes(selectedCategory) || 
        course.description.includes(selectedCategory)
      );
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

  // Function to generate consistent student counts based on course id
  const getStudentCount = (id: string, index: number) => {
    const counts: { [key: string]: number } = {
      "1": 199, // Python Full Stack
      "2": 166, // Java Full Stack
      "3": 182, // Power BI
      "4": 145, // Data Science
      "5": 128, // MERN Stack
      "6": 112, // DevOps
    };
    return counts[id] || Math.floor(Math.random() * 100) + 100;
  };

  const handleEnrollClick = (e: React.MouseEvent, courseTitle: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/contact', { 
      state: { 
        selectedCourse: courseTitle,
        fromEnroll: true 
      } 
    });
  };

  const handleCardClick = (courseTitle: string) => {
    navigate('/contact', { state: { selectedCourse: courseTitle } });
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">Industry-Ready Programs</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-white">
                Our
              </span>
              <span className="gradient-text ml-2">Courses</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8">
              Choose from our comprehensive range of industry-aligned programs. 
              Each course is designed to make you job-ready with hands-on projects and expert mentorship.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder-gray-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-[#1E293B] text-white">{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/5 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-400">
                  Showing <span className="font-semibold text-white">{filteredCourses.length}</span> courses
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Sort by:</span>
                  <select className="bg-transparent border-none focus:outline-none text-white">
                    <option className="bg-[#1E293B]">Popular</option>
                    <option className="bg-[#1E293B]">Newest</option>
                    <option className="bg-[#1E293B]">Price: Low to High</option>
                    <option className="bg-[#1E293B]">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, i) => {
                  const Icon = icons[i % icons.length];
                  const studentCount = getStudentCount(course.id, i);
                  const isPopular = course.id === "2"; // Java Full Stack
                  const isTrending = course.id === "3"; // Power BI
                  
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onMouseEnter={() => setHoveredId(course.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="tech-card group cursor-pointer"
                      onClick={() => handleCardClick(course.title)}
                    >
                      <div className={`h-2 bg-gradient-to-r ${courseColors[i % courseColors.length]}`} />
                      
                      <div className="p-8">
                        {/* Icon and Badge */}
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${courseColors[i % courseColors.length]} p-0.5`}>
                            <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-500/30">
                            {isPopular ? '⭐ Most Popular' : isTrending ? '🔥 Trending' : '✨ New Batch'}
                          </span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>

                        <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2">
                          {course.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="bg-white/5 p-2 rounded-lg text-center border border-white/10">
                            <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                            <span className="text-xs font-medium text-gray-300">{studentCount}+</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded-lg text-center border border-white/10">
                            <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                            <span className="text-xs font-medium text-gray-300">{course.duration}</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded-lg text-center border border-white/10">
                            <BookOpen className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                            <span className="text-xs font-medium text-gray-300">{Math.floor(Math.random() * 5) + 5} Projects</span>
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
                          <div>
                            <span className="text-xs text-gray-500 block">Course Fee</span>
                            <div className="flex items-baseline gap-1">
                              <IndianRupee className="w-4 h-4 text-blue-400" />
                              <span className="text-2xl font-bold text-white">{course.fee.replace('₹', '')}</span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => handleEnrollClick(e, course.title)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 text-blue-300 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25 group/btn border border-blue-500/30 cursor-pointer"
                          >
                            <span>Enroll Now</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </div>

                        {/* Hover Progress */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: hoveredId === course.id ? '100%' : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`h-0.5 bg-gradient-to-r ${courseColors[i % courseColors.length]} mt-6`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}

          {/* No Results */}
          {!loading && filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">No courses found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Get personalized guidance from our career counselors and find the perfect course for your goals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Talk to an Advisor
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;