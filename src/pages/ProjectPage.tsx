import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/projects/${id}`);
        if (!response.ok) throw new Error('Project not found');
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            {project.prev ? (
              <Link to={`/project/${project.prev}`}>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="mr-2" /> Previous Project
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {project.next ? (
              <Link to={`/project/${project.next}`}>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Next Project <ArrowRight className="ml-2" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">{project.title}</h1>
          
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-lg mb-8">{project.description}</p>

            <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
            <ul className="space-y-2 mb-8">
              {project.features.map((feature, index) => (
                <li key={index} className="text-white/80">{feature}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">Tech Stack</h2>
            <div className="space-y-4">
              {Object.entries(project.techStack).map(([category, technologies]) => (
                <div key={category}>
                  <h3 className="text-xl font-medium text-white mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPage;