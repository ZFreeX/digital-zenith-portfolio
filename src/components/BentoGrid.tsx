import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Twitter, Send, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BentoGrid = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState(""); // State for email input
  const images = ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    notification.style.color = 'white';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  };

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email address."); // Simple validation
      return;
    }

    try {
      const response = await fetch('https://api.kit.com/v4/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Kit-Api-Key': 'kit_aeb5809bcf1c629ecf4a091528431e85'
        },
        body: JSON.stringify({
          email_address: email
        }),
      });

      const data = await response.json();
      console.log("Data:", data);
      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setEmail(""); // Clear the input field after successful subscription
      showNotification("Thank you for subscribing!"); // Use notification
    } catch (error) {
      console.error("Error subscribing:", error);
      showNotification("Failed to subscribe. Please try again later.", "error"); // Use notification
    }
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
            whileHover={{ scale: 1.02 }}
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
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-2xl hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Twitter</h3>
              <Twitter className="w-6 h-6 text-primary" />
            </div>
            <Button variant="secondary" className="w-full bg-white/10 text-white hover:bg-white/20">
              Follow me on Twitter
            </Button>
          </motion.div>

          {/* Telegram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-card p-6 rounded-2xl border-2 border-secondary/30 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Telegram</h3>
              <Send className="w-6 h-6 text-secondary" />
            </div>
            <Button variant="secondary" className="w-full bg-white/10 text-white hover:bg-white/20">
              Message on Telegram
            </Button>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
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
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-dark-card to-secondary/5 p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Stay Updated</h3>
            <div className="flex gap-2 mb-4">
              <Input placeholder="Enter your email" className="flex-1 bg-white/5" value = {email} onChange={(e) => setEmail(e.target.value)}/>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleSubscribe}>Subscribe</Button>
            </div>
            <p className="text-white/60 text-sm">
              Subscribe to my newsletter to receive updates about new projects, tech insights, and exclusive content. No spam, unsubscribe anytime.
            </p>
          </motion.div>

          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Konstantin Filipovich</h3>
            <p className="text-white/60 mb-4">
              Software engineer passionate about AI integration and automation solutions. Specialized in building efficient, scalable applications and systems.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">AI Expert</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Full Stack</span>
            </div>
          </motion.div>

          {/* Latest Article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-card p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 h-[200px]"
          >
            <Link to="/articles" className="block h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Latest Article</h3>
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-white mb-3 text-lg">Modern Web Architecture</h4>
              <p className="text-sm text-white/60 line-clamp-2 mb-4">
                In today's digital landscape, understanding modern web architecture is crucial for building scalable and maintainable applications.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-none">
                  Architecture
                </Badge>
                <Badge variant="outline" className="bg-secondary/10 text-secondary border-none">
                  Web Dev
                </Badge>
              </div>
            </Link>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-dark-card p-6 rounded-2xl md:col-span-2 relative overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 h-[200px]"
          >
            <div className="absolute inset-0 opacity-50">
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
