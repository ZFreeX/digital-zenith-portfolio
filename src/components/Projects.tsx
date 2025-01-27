import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPublicProjects, Project } from "../api/projects";

const truncateDescription = (description: string) => {
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, 3).join(' ');
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchPublicProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-20 bg-dark" id="work">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 gap-24 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <Link to={`/project/${project.id}`} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="transition-all duration-500"
              >
                <Card className="bg-dark-card border-none overflow-hidden hover:shadow-xl hover:shadow-primary/20 transform transition-all duration-500 hover:translate-y-[-8px]">
                  <div className="flex flex-col">
                    <div className="relative h-64">
                      <img
                        src={project.image_url.startsWith('http') 
                          ? project.image_url 
                          : `http://localhost:8080${project.image_url}`}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-white/60 text-lg">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 mt-6">
                        <div className="flex flex-wrap gap-3">
                          {Object.entries(project.techStack).flatMap(([category, techs]) =>
                            techs.map((tech, techIndex) => (
                              <span
                                key={`${category}-${techIndex}`}
                                className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;