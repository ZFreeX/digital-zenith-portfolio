import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, ChevronDown, ChevronUp, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "shown" | "hidden";
  order: number;
  features: string[];
  techStack: Record<string, string[]>;
  image: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthError, setIsAuthError] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "AI-Powered Telegram Bot",
      description: "A sophisticated Telegram bot leveraging OpenAI's GPT-4...",
      status: "shown",
      order: 0,
      features: ["Natural language processing", "Multi-language support"],
      techStack: {
        Backend: ["Python", "OpenAI API"],
        Frontend: ["React", "TypeScript"]
      },
      image: "/placeholder.svg"
    },
  ]);
  
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    features: "",
    techStack: "",
    image: ""
  });

  useEffect(() => {
    if (isAuthError) {
      const timer = setTimeout(() => {
        navigate("/#work");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthError, navigate]);

  const handleAuth = () => {
    if (password === "tied1155") {
      setIsAuthenticated(true);
      setIsAuthError(false);
    } else {
      setIsAuthError(true);
      setPassword("");
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const newProjects = [...projects];
    const index = newProjects.findIndex(p => p.id === id);
    if (direction === "up" && index > 0) {
      [newProjects[index], newProjects[index - 1]] = [newProjects[index - 1], newProjects[index]];
    } else if (direction === "down" && index < newProjects.length - 1) {
      [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];
    }
    setProjects(newProjects);
    toast({
      title: "Success",
      description: "Project order updated",
    });
  };

  const toggleVisibility = (id: string) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === "shown" ? "hidden" : "shown" }
          : p
      )
    );
    toast({
      title: "Success",
      description: "Project visibility updated",
    });
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
    toast({
      title: "Success",
      description: "Project deleted",
    });
  };

  const handleAddProject = () => {
    const newProjectData: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      status: "shown",
      order: projects.length,
      features: newProject.features.split('\n').filter(f => f.trim()),
      techStack: JSON.parse(newProject.techStack),
      image: newProject.image
    };
    
    setProjects(prev => [...prev, newProjectData]);
    setIsAddingProject(false);
    setNewProject({
      title: "",
      description: "",
      features: "",
      techStack: "",
      image: ""
    });
    
    toast({
      title: "Success",
      description: "Project added successfully",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-md mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-white text-center mb-8">Admin Authentication</h1>
            {isAuthError ? (
              <Skeleton className="w-full h-12 bg-red-500/20" />
            ) : (
              <>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-dark-card border-white/20 text-white"
                />
                <Button 
                  onClick={handleAuth}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Project Management</h1>
          <Button 
            onClick={() => setIsAddingProject(true)}
            className="bg-primary hover:bg-primary/90 text-lg px-6 py-3 h-auto"
          >
            <Plus className="w-5 h-5 mr-2" /> Add New Project
          </Button>
        </div>

        <div className="bg-dark-card rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white text-lg">Order</TableHead>
                <TableHead className="text-white text-lg">Title</TableHead>
                <TableHead className="text-white text-lg">Status</TableHead>
                <TableHead className="text-white text-lg text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-white/10"
                >
                  <TableCell className="text-white">
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => handleMove(project.id, "up")}
                        className="p-0 h-8 text-white/60 hover:bg-primary/20 hover:text-white"
                      >
                        <ChevronUp className="w-6 h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => handleMove(project.id, "down")}
                        className="p-0 h-8 text-white/60 hover:bg-primary/20 hover:text-white"
                      >
                        <ChevronDown className="w-6 h-6" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell
                    className="text-white cursor-pointer text-lg"
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  >
                    <div className="font-medium">{project.title}</div>
                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-base text-white/60 mt-2"
                        >
                          {project.description}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-base px-4 py-2 ${
                        project.status === "shown"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => toggleVisibility(project.id)}
                        className="text-white/60 hover:bg-primary/20 hover:text-white"
                      >
                        {project.status === "shown" ? (
                          <EyeOff className="w-6 h-6" />
                        ) : (
                          <Eye className="w-6 h-6" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setDeleteConfirm(project.id)}
                        className="text-red-500 hover:bg-red-500/20 hover:text-red-400"
                      >
                        <Trash2 className="w-6 h-6" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
          <DialogContent className="bg-dark-card border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-dark border-white/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-dark border-white/20 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Features (one per line)</label>
                <Textarea
                  value={newProject.features}
                  onChange={(e) => setNewProject(prev => ({ ...prev, features: e.target.value }))}
                  className="bg-dark border-white/20"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tech Stack (JSON format)</label>
                <Textarea
                  value={newProject.techStack}
                  onChange={(e) => setNewProject(prev => ({ ...prev, techStack: e.target.value }))}
                  className="bg-dark border-white/20"
                  placeholder='{"Frontend": ["React", "TypeScript"], "Backend": ["Node.js"]}'
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={newProject.image}
                  onChange={(e) => setNewProject(prev => ({ ...prev, image: e.target.value }))}
                  className="bg-dark border-white/20"
                  placeholder="/path/to/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setIsAddingProject(false)}
                className="text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProject}
                className="bg-primary hover:bg-primary/90"
              >
                Save Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
          <AlertDialogContent className="bg-dark-card border-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white text-xl">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-white/60 text-base">
                This action cannot be undone. This will permanently delete the project.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/10 text-white hover:bg-white/20 text-lg">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 text-white hover:bg-red-600 text-lg"
                onClick={() => deleteConfirm && deleteProject(deleteConfirm)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Admin;