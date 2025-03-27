
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 scale-150 blur-xl bg-gradient-to-r from-primary via-secondary to-primary/70 opacity-30 animate-pulse-slow rounded-full" />
        
        <motion.div 
          className="relative flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-primary border-b-secondary" />
        </motion.div>
      </div>
      
      <motion.p 
        className="mt-6 text-xl font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Loading
        <motion.span
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >.</motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >.</motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >.</motion.span>
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
