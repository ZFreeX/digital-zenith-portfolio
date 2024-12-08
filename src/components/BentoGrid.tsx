import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const BentoGrid = () => {
  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["Python", "Flask", "Next.js", "TypeScript", "PostgreSQL", "Tact"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Connect</h3>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">Twitter</Button>
              <Button variant="outline" className="flex-1">Telegram</Button>
            </div>
          </motion.div>

          {/* Email Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Stay Updated</h3>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl md:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">My Approach</h3>
            <div className="relative h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-transparent opacity-30 blur-lg" />
                <div className="w-32 h-32 rounded-full bg-gradient-to-l from-secondary to-transparent opacity-30 blur-lg -ml-10" />
              </div>
              <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <h4 className="font-medium text-white">Functionality</h4>
                  <p className="text-sm text-white/60">Purpose-driven design</p>
                </div>
                <div>
                  <h4 className="font-medium text-white">Simplicity</h4>
                  <p className="text-sm text-white/60">Clean & efficient</p>
                </div>
                <div>
                  <h4 className="font-medium text-white">Innovation</h4>
                  <p className="text-sm text-white/60">Forward-thinking</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;