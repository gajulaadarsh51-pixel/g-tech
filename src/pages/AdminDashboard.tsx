import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, MessageSquare, Plus, Edit, Trash2, LogOut,
  GraduationCap, LayoutDashboard, X
} from "lucide-react";
import { supabase, type Course, type ContactMessage } from "@/lib/supabase";

type Tab = "courses" | "messages";

const emptyForm = { title: "", description: "", duration: "", fee: "" };

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("courses");
  const [courses, setCourses] = useState<Course[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin");
        return;
      }
      fetchData();
    };
    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const [coursesRes, messagesRes] = await Promise.all([
      supabase.from("courses").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    if (coursesRes.data) setCourses(coursesRes.data);
    if (messagesRes.data) setMessages(messagesRes.data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from("courses").update(form).eq("id", editingId);
    } else {
      await supabase.from("courses").insert([form]);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    fetchData();
  };

  const handleEdit = (course: Course) => {
    setForm({ title: course.title, description: course.description, duration: course.duration, fee: course.fee });
    setEditingId(course.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await supabase.from("courses").delete().eq("id", id);
    fetchData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const sidebarItems = [
    { id: "courses" as Tab, icon: BookOpen, label: "Courses" },
    { id: "messages" as Tab, icon: MessageSquare, label: "Messages" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                tab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground text-sm">Admin</span>
          </div>
          <div className="flex gap-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`p-2.5 rounded-lg ${tab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                <item.icon className="w-4 h-4" />
              </button>
            ))}
            <button onClick={handleLogout} className="p-2.5 rounded-lg text-destructive">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-8 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground">Loading...</div>
          ) : tab === "courses" ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">Manage Courses</h2>
                <button
                  onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" /> Add Course
                </button>
              </div>

              {/* Form Modal */}
              {showForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-md card-elevated"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {editingId ? "Edit Course" : "Add Course"}
                      </h3>
                      <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                      {(["title", "description", "duration", "fee"] as const).map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-foreground mb-1 capitalize">{field}</label>
                          {field === "description" ? (
                            <textarea
                              required
                              rows={3}
                              value={form[field]}
                              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary outline-none transition resize-none"
                            />
                          ) : (
                            <input
                              type="text"
                              required
                              value={form[field]}
                              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary outline-none transition"
                            />
                          )}
                        </div>
                      ))}
                      <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                      >
                        {editingId ? "Update Course" : "Add Course"}
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              )}

              {/* Courses Table */}
              <div className="bg-card rounded-2xl overflow-hidden card-elevated">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Title</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4 hidden md:table-cell">Duration</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4 hidden md:table-cell">Fee</th>
                        <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No courses yet. Add your first course.</td></tr>
                      ) : courses.map((course) => (
                        <tr key={course.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-foreground text-sm">{course.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{course.description}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{course.duration}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{course.fee}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(course)} className="p-2 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(course.id)} className="p-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Contact Messages</h2>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="bg-card rounded-2xl p-12 text-center text-muted-foreground card-elevated">
                    No messages yet.
                  </div>
                ) : messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl p-5 md:p-6 card-elevated"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{msg.name}</h4>
                        <p className="text-xs text-muted-foreground">{msg.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{msg.message}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
