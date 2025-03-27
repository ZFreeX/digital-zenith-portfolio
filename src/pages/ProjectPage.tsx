
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { fetchProjectById } from "../api/projects";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Project } from "../api/projects"; // Import from api/projects instead of types/project.d.ts

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevProjectId, setPrevProjectId] = useState<string | null>(null);
  const [nextProjectId, setNextProjectId] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectById(id!);
        setProject(data);
        // Assuming the API returns adjacent project IDs
        setPrevProjectId(data.prev); // Adjust according to your API response
        setNextProjectId(data.next); // Adjust according to your API response
      } catch (error) {
        console.error('Failed to load project:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <div className="pt-24 pb-32">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <div className="pt-24 pb-32 text-center">
          <h1 className="text-3xl font-bold text-primary">Project not found</h1>
          <p className="mt-4 text-white/70">The project you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-8" onClick={() => navigate('/')}>Go back home</Button>
        </div>
      </div>
    );
  }

  const handlePrevProject = () => {
    if (prevProjectId) {
      navigate(`/project/${prevProjectId}`);
    }
  };

  const handleNextProject = () => {
    if (nextProjectId) {
      navigate(`/project/${nextProjectId}`);
    }
  };

  const imageUrl = project.image_url.startsWith('http') 
    ? project.image_url 
    : `${import.meta.env.VITE_API_URL}${project.image_url}`;

  const videoUrl = project.demo_video_url?.startsWith('http') 
    ? project.demo_video_url 
    : project.demo_video_url 
        ? `${import.meta.env.VITE_API_URL}${project.demo_video_url}`
        : null;

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
                {/* Glowing background effect */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                  {/* Base glow layer */}
                  <div className={`absolute inset-0 ${
                    project.screen_type === 'mobile' ? 'rounded-[40px] -rotate-3' : 'rounded-xl'
                  } bg-gradient-to-b from-primary/30 via-primary/40 to-purple-500/30 scale-110 animate-fire-glow`} />
                  
                  {/* Secondary pulsing layer */}
                  <div className={`absolute inset-0 ${
                    project.screen_type === 'mobile' ? 'rounded-[40px] -rotate-3' : 'rounded-xl'
                  } bg-gradient-to-tr from-orange-500/20 via-pink-500/20 to-purple-500/20 scale-105 blur-xl animate-pulse opacity-70`} />
                  
                  {/* Extra highlight layer */}
                  <div className={`absolute inset-0 ${
                    project.screen_type === 'mobile' ? 'rounded-[40px] -rotate-3' : 'rounded-xl'
                  } bg-gradient-to-br from-yellow-400/20 via-primary/20 to-transparent scale-[1.15] blur-xl opacity-60`} style={{
                    animation: 'fire-glow 4s ease-in-out infinite alternate'
                  }} />
                </div>
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

              {project.demo_video_url && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="my-24 flex justify-center"
                >
                  <div className={`relative ${
                    project.screen_type === 'mobile' 
                      ? 'w-[280px] h-[580px]' 
                      : 'w-full max-w-3xl aspect-video'
                  }`}>
                    {/* Device frame with pronounced glowing effect */}
                    <div className="relative">
                      {/* Strong outer glow - this will be permanent and very visible */}
                      <div className={`absolute -inset-3 ${
                        project.screen_type === 'mobile'
                          ? 'rounded-[45px] -rotate-3' 
                          : 'rounded-2xl'
                        } bg-gradient-to-r from-primary via-primary/80 to-purple-500/70 opacity-70 blur-xl`} 
                        style={{
                          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }}
                      />
                      
                      {/* Second glow layer with different timing */}
                      <div className={`absolute -inset-2 ${
                        project.screen_type === 'mobile'
                          ? 'rounded-[45px] -rotate-3' 
                          : 'rounded-2xl'
                        } bg-gradient-to-tr from-pink-500/60 to-purple-500/60 opacity-60 blur-lg`} 
                        style={{
                          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite reverse'
                        }}
                      />
                      
                      {/* Device frame */}
                      <div className={`relative overflow-hidden ${
                        project.screen_type === 'mobile'
                          ? 'rounded-[40px] border-8 border-gray-800 -rotate-3 shadow-2xl' 
                          : 'rounded-xl border-8 border-gray-800 shadow-2xl'
                        } bg-black z-10`}>
                        
                        {/* Status bar for mobile */}
                        {project.screen_type === 'mobile' && (
                          <div className="h-6 w-full bg-black flex justify-between items-center px-5">
                            <span className="text-white text-xs">9:41</span>
                            <div className="flex items-center space-x-1">
                              <div className="w-4 h-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                                  <path d="M6.5 21C5.42 21 4.46 20.63 3.62 19.9C2.79 19.16 2.32 18.26 2.21 17.2H4.24C4.35 17.73 4.6 18.17 5 18.5C5.4 18.83 5.91 19 6.5 19C7.17 19 7.71 18.81 8.13 18.44C8.54 18.06 8.75 17.59 8.75 17C8.75 16.36 8.5 15.87 8 15.55C7.5 15.23 6.95 15.07 6.35 15.07C6.17 15.07 5.97 15.08 5.75 15.1V13.15C5.97 13.17 6.18 13.18 6.37 13.18C6.76 13.18 7.11 13.1 7.43 12.95C7.76 12.8 8.03 12.58 8.24 12.3C8.44 12.02 8.55 11.69 8.55 11.3C8.55 10.77 8.37 10.35 8 10.03C7.63 9.71 7.19 9.55 6.67 9.55C6.13 9.55 5.67 9.74 5.29 10.13C4.91 10.51 4.68 10.97 4.6 11.5H2.57C2.64 10.78 2.85 10.15 3.21 9.6C3.56 9.05 4.02 8.63 4.6 8.33C5.18 8.03 5.83 7.88 6.54 7.88C7.23 7.88 7.85 8.02 8.39 8.29C8.93 8.57 9.35 8.93 9.64 9.39C9.94 9.85 10.09 10.36 10.09 10.93C10.09 11.58 9.92 12.12 9.57 12.57C9.23 13.01 8.82 13.33 8.34 13.51V13.55C8.96 13.75 9.5 14.13 9.95 14.67C10.4 15.21 10.62 15.84 10.62 16.57C10.62 17.23 10.45 17.82 10.12 18.34C9.78 18.87 9.3 19.28 8.7 19.58C8.1 19.86 7.37 20 6.5 20V21ZM13.28 19H15.05V13.88H21.1V12.38H15.05V8.75H21.69V7.25H13.28V19Z"/>
                                </svg>
                              </div>
                              <div className="w-4 h-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                                  <path d="M1 21H21V1L1 21Z" />
                                </svg>
                              </div>
                              <div className="w-6 h-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                                  <rect x="2" y="8" width="20" height="8" rx="2" ry="2" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Video */}
                        <video 
                          src={videoUrl || undefined} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className={`w-full ${project.screen_type === 'mobile' ? 'h-[540px]' : 'aspect-video'} object-cover`}
                          onError={() => {
                              console.error('Video loading error');
                              toast("Failed to load demo video");
                          }}
                        ></video>
                        
                        {/* Home indicator for mobile */}
                        {project.screen_type === 'mobile' && (
                          <div className="h-6 w-full bg-black flex justify-center items-center">
                            <div className="w-1/3 h-1 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div>
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features && Array.isArray(project.features) && project.features.map((feature, index) => (
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
                {prevProjectId && (
                  <Button
                    onClick={handlePrevProject}
                    className="bg-dark-card hover:bg-primary/20 text-white gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Project
                  </Button>
                )}
                {nextProjectId && (
                  <Button
                    onClick={handleNextProject}
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
