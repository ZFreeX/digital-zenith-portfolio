import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Github, Mail, MessageSquare, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <div className="pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Let's Connect
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.a
                href="https://t.me/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-dark-card p-6 rounded-xl flex items-center gap-4 hover:bg-primary/10 transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold">Telegram</h2>
                  <p className="text-white/60">@yourusername</p>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-dark-card p-6 rounded-xl flex items-center gap-4 hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold">LinkedIn</h2>
                  <p className="text-white/60">Konstantin Filipovich</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-dark-card p-6 rounded-xl flex items-center gap-4 hover:bg-primary/10 transition-colors"
              >
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold">Email</h2>
                  <p className="text-white/60">your.email@example.com</p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-dark-card p-6 rounded-xl flex items-center gap-4 hover:bg-primary/10 transition-colors"
              >
                <Github className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold">GitHub</h2>
                  <p className="text-white/60">@yourusername</p>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;