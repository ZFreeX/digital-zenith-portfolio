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
import { 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  Smartphone, 
  Monitor 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  fetchProjects, 
  updateOrder, 
  createProject, 
  toggleVisibility, 
  deleteProject
} from "@/api/projects";
import { 
  fetchArticles, 
  createArticle, 
  deleteArticle 
} from "@/api/articles";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Project } from "../api/projects";

interface Article {
  id: string;
  title: string;
  content: string;
  preview: string;
  tags: string[];
  image_url: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthError, setIsAuthError] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    features: "",
    techStack: "",
    image: "",
    demo_video_url: "",
    screen_type: "pc" as "mobile" | "pc"
  });

  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [deleteArticleConfirm, setDeleteArticleConfirm] = useState<string | null>(null);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    tags: "",
    image: ""
  });

  useEffect(() => {
    if (isAuthError) {
      const timer = setTimeout(() => {
        navigate("/?section=work");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthError, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const loadProjects = async () => {
        try {
          const data = await fetchProjects();
          setProjects(data || []); // Ensure we never set null
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load projects",
            variant: "destructive",
          });
          setProjects([]); // Set empty array on error
        }
      };
      loadProjects();
    }
  }, [isAuthenticated]);

  const handleAuth = () => {
    if (password === "tied1155") {
      setIsAuthenticated(true);
      setIsAuthError(false);
    } else {
      setIsAuthError(true);
      setPassword("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Upload failed: ${errorText}`);
        }
        
        const data = await response.json();
        setNewProject(prev => ({ ...prev, image: data.url }));
        
        toast({
            title: "Success",
            description: "Image uploaded successfully",
        });
    } catch (error) {
        console.error('Upload error:', error);
        toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to upload image",
            variant: "destructive",
        });
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        toast({
            title: "Uploading",
            description: "Uploading demo video...",
        });
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) throw new Error('Upload failed');
        
        const data = await response.json();
        setNewProject(prev => ({ ...prev, demo_video_url: data.url }));
        
        toast({
            title: "Success",
            description: "Demo video uploaded successfully",
        });
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to upload demo video",
            variant: "destructive",
        });
    }
  };

  const handleMove = async (id: string, direction: "up" | "down") => {
    try {
      await updateOrder(id, direction);
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
      
      toast({
        title: "Success",
        description: "Project order updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project order",
        variant: "destructive",
      });
    }
  };

  const toggleProjectVisibility = async (id: string) => {
    try {
      const project = projects.find(p => p.id === id);
      if (!project) return;

      const newStatus = project.status === "shown" ? "hidden" : "shown";
      await toggleVisibility(id, newStatus);
      
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === id
            ? { ...project, status: newStatus }
            : project
        )
      );

      toast({
        title: "Success",
        description: `Project ${newStatus === "shown" ? "shown" : "hidden"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project visibility",
        variant: "destructive",
      });
    }
  };

  const handleAddProject = async () => {
    try {
      const techStackObj = JSON.parse(newProject.techStack);
      const projectToAdd = {
        title: newProject.title,
        description: newProject.description,
        status: "shown" as "shown" | "hidden",
        features: newProject.features.split('\n').filter(f => f.trim()),
        techStack: techStackObj,
        image_url: newProject.image || "/placeholder.svg",
        demo_video_url: newProject.demo_video_url || "",
        screen_type: newProject.screen_type
      };

      await createProject(projectToAdd);
      
      // Fetch updated projects list
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
      
      setIsAddingProject(false);
      setNewProject({
        title: "",
        description: "",
        features: "",
        techStack: "",
        image: "",
        demo_video_url: "",
        screen_type: "pc"
      });
      
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
      setDeleteConfirm(null);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleArticleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Upload failed: ${errorText}`);
        }
        
        const data = await response.json();
        setNewArticle(prev => ({ ...prev, image: data.url }));
        
        toast({
            title: "Success",
            description: "Image uploaded successfully",
        });
    } catch (error) {
        console.error('Upload error:', error);
        toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to upload image",
            variant: "destructive",
        });
    }
  };

  
  const toggleArticleVisibility = async (id: string) => {
    try {
      const article = articles.find(a => a.id === id);
      if (!article) return;

      const newStatus = article.status === "published" ? "draft" : "published";
      
      // Add API call here when backend is ready
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === id
            ? { ...article, status: newStatus }
            : article
        )
      );

      toast({
        title: "Success",
        description: `Article ${newStatus === "published" ? "published" : "hidden"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update article visibility",
        variant: "destructive",
      });
    }
  };

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await fetchArticles();
                setArticles(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load articles",
                    variant: "destructive",
                });
            }
        };
        loadArticles();
    }, []);

    const handleAddArticle = async () => {
      try {
        const articleToAdd: Article = {
          id: "", // This will be generated by the backend
          title: newArticle.title,
          content: newArticle.content,
          preview: newArticle.content.substring(0, 100), // Example: first 100 characters as preview
          tags: newArticle.tags.split(',').map(tag => tag.trim()), // Ensure tags are an array
          image_url: newArticle.image || "/placeholder.svg", // Default image if none provided
          status: "published", // Explicitly set to "published"
          created_at: new Date().toISOString(), // Set to current date/time
          updated_at: new Date().toISOString()  // Set to current date/time
        };
    
        const createdArticle = await createArticle(articleToAdd);
        setArticles(prev => [...prev, createdArticle]); // Update the articles state with the new article
        setIsAddingArticle(false); // Close the dialog
        setNewArticle({ title: "", content: "", tags: "", image: "" }); // Reset the form
        toast({
          title: "Success",
          description: "Article created successfully",
        });
      } catch (error) {
        console.error("Error creating article:", error);
        toast({
          title: "Error",
          description: "Failed to create article",
          variant: "destructive",
        });
      }
    };

    const handleDeleteArticle = async (id: string) => {
        try {
            await deleteArticle(id);
            setArticles(prev => prev.filter(article => article.id !== id));
            toast({
                title: "Success",
                description: "Article deleted successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete article",
                variant: "destructive",
            });
        }
    };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-md mx-auto space-y-4">
            <h1 className="text-3xl font-bold text-white text-center mb-8">Admin Authentication</h1>
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter password"
                className={`bg-dark-card border-white/20 text-white ${isAuthError ? 'animate-pulse' : ''}`}
              />
            </div>
            <Button 
              onClick={handleAuth}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Login
            </Button>
            {isAuthError && (
              <div className="flex justify-center mt-4">
                <img
                  src="/lovable-uploads/bd057546-2ac6-4bd6-9c90-806fdb8907e5.png"
                  alt="Auth Error"
                  className="w-96 h-96 object-contain animate-pulse"
                />
              </div>
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
            className="bg-primary hover:bg-primary/90"
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
                        onClick={() => toggleProjectVisibility(project.id)}
                        className="text-white/60 hover:bg-primary/20 hover:text-white p-3"
                      >
                        {project.status === "shown" ? (
                          <EyeOff className="w-8 h-8" />
                        ) : (
                          <Eye className="w-8 h-8" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setDeleteConfirm(project.id)}
                        className="text-red-500 hover:bg-red-500/20 hover:text-red-400 p-3"
                      >
                        <Trash2 className="w-8 h-8" />
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
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => document.getElementById('imageUpload')?.click()}
                    className="bg-primary/20 hover:bg-primary/30 text-primary"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {newProject.image && (
                    <span className="text-white/60">
                      Image selected: {newProject.image.split('/').pop()}
                    </span>
                  )}
                </div>
              </div>
              
              {/* New demo video upload field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Demo Video</label>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => document.getElementById('videoUpload')?.click()}
                    className="bg-primary/20 hover:bg-primary/30 text-primary"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Demo Video
                  </Button>
                  <input
                    type="file"
                    id="videoUpload"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  {newProject.demo_video_url && (
                    <span className="text-white/60">
                      Video selected: {newProject.demo_video_url.split('/').pop()}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Screen type selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Screen Type</label>
                <RadioGroup 
                  value={newProject.screen_type} 
                  onValueChange={(value) => setNewProject(prev => ({
                    ...prev, 
                    screen_type: value as "mobile" | "pc"
                  }))}
                  className="flex space-x-8 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pc" id="pc" />
                    <Label htmlFor="pc" className="flex items-center gap-2 cursor-pointer">
                      <Monitor className="w-5 h-5" />
                      <span>PC</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="w-5 h-5" />
                      <span>Mobile</span>
                    </Label>
                  </div>
                </RadioGroup>
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
                onClick={() => deleteConfirm && handleDeleteProject(deleteConfirm)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Articles Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Article Management</h1>
            <Button 
              onClick={() => setIsAddingArticle(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-5 h-5 mr-2" /> Add New Article
            </Button>
          </div>

          <div className="bg-dark-card rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white text-lg">Title</TableHead>
                  <TableHead className="text-white text-lg">Status</TableHead>
                  <TableHead className="text-white text-lg text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
  {Array.isArray(articles) && articles.length > 0 ? (
    articles.map((article) => (
      <motion.tr
        key={article.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="border-t border-white/10"
      >
        <TableCell className="text-white text-lg">
          <div className="font-medium">{article.title}</div>
        </TableCell>
        <TableCell className="text-white text-lg">
          <div className="font-medium">{article.status}</div>
        </TableCell>
        <TableCell className="text-white text-lg text-right">
          <Button onClick={() => toggleArticleVisibility(article.id)}>Toggle Visibility</Button>
          <Button onClick={() => handleDeleteArticle(article.id)}>Delete</Button>
        </TableCell>
      </motion.tr>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={3} className="text-center text-white">
        No articles available.
      </TableCell>
    </TableRow>
  )}
</TableBody>
            </Table>
          </div>
        </div>

        {/* Add Article Dialog */}
        <Dialog open={isAddingArticle} onOpenChange={setIsAddingArticle}>
          <DialogContent className="bg-dark-card border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newArticle.title}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-dark border-white/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content (Markdown)</label>
                <Textarea
                  value={newArticle.content}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-dark border-white/20 min-h-[200px] font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={newArticle.tags}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, tags: e.target.value }))}
                  className="bg-dark border-white/20"
                  placeholder="Web Development, Tutorial, React"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => document.getElementById('articleImageUpload')?.click()}
                    className="bg-primary/20 hover:bg-primary/30 text-primary"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    id="articleImageUpload"
                    accept="image/*"
                    onChange={handleArticleImageUpload}
                    className="hidden"
                  />
                  {newArticle.image && (
                    <span className="text-white/60">
                      Image selected: {newArticle.image.split('/').pop()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setIsAddingArticle(false)}
                className="text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddArticle}
                className="bg-primary hover:bg-primary/90"
              >
                Publish Article
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Article Confirmation */}
        <AlertDialog open={!!deleteArticleConfirm} onOpenChange={() => setDeleteArticleConfirm(null)}>
          <AlertDialogContent className="bg-dark-card border-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white text-xl">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-white/60 text-base">
                This action cannot be undone. This will permanently delete the article.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/10 text-white hover:bg-white/20 text-lg">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 text-white hover:bg-red-600 text-lg"
                onClick={() => deleteArticleConfirm && handleDeleteArticle(deleteArticleConfirm)}
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
