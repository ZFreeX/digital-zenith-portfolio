import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "AI-Powered Telegram Bot",
    description: "A sophisticated Telegram bot leveraging OpenAI's GPT-4 for natural language processing and automated responses.",
    image: "/placeholder.svg",
    tags: ["Python", "OpenAI API", "Telegram API"],
    link: "/project/telegram-bot"
  },
  {
    title: "Web3 Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio tracking application with advanced analytics and market insights.",
    image: "/placeholder.svg",
    tags: ["Next.js", "TypeScript", "Web3.js"],
    link: "/project/web3-tracker"
  },
  {
    title: "Automated Pinterest Manager",
    description: "Pinterest marketing automation tool for scheduling, analytics, and content optimization.",
    image: "/placeholder.svg",
    tags: ["Python", "Selenium", "PostgreSQL"],
    link: "/project/pinterest-manager"
  }
];

const Projects = () => {
  return (
    <section className="py-20 bg-dark" id="work">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 gap-24 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <Link to={project.link} key={index}>
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
                    <div className="relative h-72">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
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
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
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