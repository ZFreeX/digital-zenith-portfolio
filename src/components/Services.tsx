import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  { title: "Telegram Bots", description: "Custom bot development for business automation" },
  { title: "Web Development", description: "Modern web applications & sites" },
  { title: "Web Scraping", description: "Efficient data extraction solutions" },
  { title: "Automation Scripts", description: "Task automation for increased productivity" },
  { title: "Browser Automation", description: "Streamlined browser task execution" },
  { title: "Video Editing Automation", description: "Automated video processing workflows" },
  { title: "Pinterest Marketing", description: "Automated Pinterest growth strategies" },
  { title: "GPT Agents", description: "Custom AI agents for specific tasks" },
  { title: "CP Solutions", description: "Competitive programming problem solving" },
  { title: "TON Smart Contracts", description: "Blockchain development on TON" },
];

const Services = () => {
  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-dark-card border-white/10 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                  <p className="text-white/60">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;