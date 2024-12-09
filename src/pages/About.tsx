import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";

const About = () => {
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
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full md:w-1/3"
              >
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt="Konstantin Filipovich"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full md:w-2/3 space-y-6"
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  About Me
                </h1>
                <p className="text-lg text-white/70 leading-relaxed">
                  Hi, I'm Konstantin Filipovich, a passionate developer and AI enthusiast. I specialize in creating innovative solutions that bridge the gap between artificial intelligence and business needs.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  With years of experience in software development and AI integration, I've helped numerous businesses streamline their operations and enhance their customer experience through intelligent automation.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  My expertise spans across various technologies, from developing sophisticated AI-powered chatbots to creating intuitive web applications. I'm particularly interested in exploring new ways to make AI more accessible and practical for businesses of all sizes.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;