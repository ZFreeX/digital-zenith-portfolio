import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from 'react';
import { fetchProjectById } from "../api/projects";
import { Project } from '../api/projects';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectById(id!);
        setProject(data);
      } catch (error) {
        console.error('Failed to load project:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id, navigate]);

  if (loading || !project) {
    return <div>Loading...</div>;
  }

  const handleNavigate = (projectId: string) => {
    navigate(`/project/${projectId}`);
    toast.success(`Navigated to next project`);
  };

  const imageUrl = project.image_url.startsWith('http') 
    ? project.image_url 
    : `http://localhost:8080${project.image_url}`;


  console.log('Previous Project ID:', project);
  console.log('Next Project ID:', project.Next);  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <div className="pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
                <img
                  src={imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
                <p className="text-lg text-white/70 leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Technical Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(project.techStack).map(([category, technologies]) => (
                    <div key={category} className="bg-dark-card rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-3 text-primary">{category}</h3>
                      <ul className="space-y-2">
                        {technologies.map((tech, index) => (
                          <li key={index} className="text-white/70">{tech}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-16">
                {project.prev && (
                  <Button
                    onClick={() => handleNavigate(project.prev)}
                    className="bg-dark-card hover:bg-primary/20 text-white gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Project
                  </Button>
                )}
                {project.next && (
                  <Button
                    onClick={() => handleNavigate(project.next)}
                    className="bg-dark-card hover:bg-primary/20 text-white gap-2 ml-auto"
                  >
                    Next Project
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPage;