import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { HeroBackground } from './hero-background';
import { FloatingElement } from './floating-element';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement />
        <motion.div
          className="absolute right-1/4 top-1/4 w-64 h-64"
          style={{
            background: 'radial-gradient(circle, rgba(157, 78, 221, 0.2) 0%, rgba(255, 27, 107, 0.2) 100%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container px-4 py-24 md:py-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            <TypeAnimation
              sequence={[
                'Building the future',
                2000,
                'Creating experiences',
                2000,
                'Solving problems',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block mb-4 gradient-text-animated bg-gradient-to-r from-[#FF719A] to-[#9b87f5] text-transparent bg-clip-text after:content-['|'] after:ml-1 after:animate-blink after:text-primary"
            />
            <span className="gradient-text-animated block bg-gradient-to-r from-[#FF719A] to-[#9b87f5] text-transparent bg-clip-text">beyond boundaries</span>
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF1B6B] via-[#9D4EDD] to-[#FF4D4D] opacity-20 blur-2xl rounded-full" />
            <h2 className="mt-8 text-xl font-medium md:text-2xl relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Konstantin Filipovich
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-lg gradient-text-animated"
          >
           Software Engineer 
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,113,154,0.15),transparent_50%)]" />
    </section>
  );
}