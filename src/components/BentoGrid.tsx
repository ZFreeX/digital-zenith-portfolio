import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BentoGrid = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl border border-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
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
            className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-2xl hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Twitter</h3>
            <Button variant="secondary" className="w-full text-white hover:bg-white/10">Follow me on Twitter</Button>
          </motion.div>

          {/* Telegram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl border-2 border-secondary/30 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Telegram</h3>
            <Button variant="secondary" className="w-full text-white hover:bg-white/10">Message on Telegram</Button>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card rounded-2xl overflow-hidden relative group hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-64">
              <img
                src={images[currentImage]}
                alt="Gallery"
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="text-white" />
              </button>
            </div>
          </motion.div>

          {/* Email Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-dark-card to-secondary/5 p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Stay Updated</h3>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1 bg-white/5" />
              <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card p-6 rounded-2xl md:col-span-2 relative overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary/30 to-transparent mix-blend-screen" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-l from-secondary/30 to-transparent mix-blend-screen" />
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