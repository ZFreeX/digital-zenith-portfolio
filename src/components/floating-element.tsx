'use client'

import { motion } from 'framer-motion'

export function FloatingElement() {
  return (
    <motion.div
      className="absolute w-48 h-48 rounded-full"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 27, 107, 0.2), rgba(157, 78, 221, 0.2))',
        filter: 'blur(40px)',
      }}
      animate={{
        y: [0, 20, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

