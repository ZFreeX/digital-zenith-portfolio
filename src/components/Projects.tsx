import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    title: "AI-Powered Telegram Bot",
    description: "A sophisticated Telegram bot leveraging OpenAI's GPT-4 for natural language processing and automated responses.",
    image: "/placeholder.svg",
    tags: ["Python", "OpenAI API", "Telegram API"]
  },
  {
    title: "Web3 Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio tracking application with advanced analytics and market insights.",
    image: "/placeholder.svg",
    tags: ["Next.js", "TypeScript", "Web3.js"]
  },
  {
    title: "Automated Pinterest Manager",
    description: "Pinterest marketing automation tool for scheduling, analytics, and content optimization.",
    image: "/placeholder.svg",
    tags: ["Python", "Selenium", "PostgreSQL"]
  }
];

const Projects = () => {
  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12">Featured Projects</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="hover:scale-105 transition-transform duration-300"
            >
              <Card className="bg-dark-card border-none overflow-hidden">
                <div className="flex flex-col">
                  <div className="relative h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-white/60">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;