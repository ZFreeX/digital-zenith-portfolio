import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden">
      {/* Neural Network Background Effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-primary/20 to-secondary/20"
            style={{
              width: Math.random() * 200 + 100,
              height: '1px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: Math.random() > 0.5 ? '#FF719A' : '#9b87f5',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#FF719A] to-[#FF719A] bg-clip-text text-transparent"
          style={{ fontFamily: 'ClashDisplay-Bold' }}
        >
          Creating experiences
          <br />
          beyond boundaries
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl text-white/80 mb-4"
          style={{ fontFamily: 'ClashDisplay-Medium' }}
        >
          Software Engineer
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-[#FF719A] mb-12"
          style={{ fontFamily: 'ClashDisplay-Regular' }}
        >
          Konstantin Filipovich
        </motion.h3>
      </div>
    </section>
  );
};

export default Hero;