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
            className="bg-dark-card p-6 rounded-2xl border border-gradient-to-r from-primary to-secondary"
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

          {/* Twitter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Twitter</h3>
            <Button variant="outline" className="w-full">Follow me on Twitter</Button>
          </motion.div>

          {/* Telegram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl border-2 border-secondary/30"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Telegram</h3>
            <Button variant="outline" className="w-full">Message on Telegram</Button>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
            <h3 className="text-xl font-semibold mb-4 text-white relative z-10">Gallery</h3>
            <div className="grid grid-cols-2 gap-2 relative z-10">
              <img src="/placeholder.svg" alt="Gallery 1" className="rounded-lg w-full h-24 object-cover" />
              <img src="/placeholder.svg" alt="Gallery 2" className="rounded-lg w-full h-24 object-cover" />
            </div>
          </motion.div>

          {/* Email Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-dark-card to-secondary/5 p-6 rounded-2xl"
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
            className="bg-dark-card p-6 rounded-2xl md:col-span-2 relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-l from-secondary/20 to-transparent" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-4 text-white">My Approach</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
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