import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden">
      {/* Neural Network Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(40deg,#0f0f13,#1a1f2c)]">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.5, 1, 0.5],
                x: Math.random() * 20 - 10,
                y: Math.random() * 20 - 10,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                background: Math.random() > 0.5 ? "#FF719A" : "#9b87f5",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 flex flex-col items-center justify-center gap-2"
        >
          <div className="text-white font-[ClashDisplay-Bold]">
            <Typewriter
              options={{
                strings: ["Introducing AI to business"],
                autoStart: true,
                loop: false,
                cursor: "",
              }}
            />
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl text-white/80 mb-8 font-[ClashDisplay-Medium]"
        >
          Konstantin Filipovich
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-white/60 mb-12"
        >
          Software Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] hover:bg-[center-right] transition-all duration-500 text-white font-medium px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:shadow-primary/20"
          >
            View My Work
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;