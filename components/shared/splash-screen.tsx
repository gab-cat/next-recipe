'use client';

import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Sparkles, Star, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 300);
    const timer2 = setTimeout(() => setCurrentStep(2), 800);
    const timer3 = setTimeout(() => setCurrentStep(3), 1500);
    const timer4 = setTimeout(() => onComplete(), 2800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { 
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
    >
      {/* Background animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{ 
              x: 100,
              y: 100,
              scale: 0,
            }}
            animate={{
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2.5,
              delay: Math.random() * 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        
        {/* Logo/Icon animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: currentStep >= 0 ? 1 : 0,
            rotate: currentStep >= 0 ? 0 : -180
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
            type: "spring",
            stiffness: 120
          }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center relative shadow-2xl shadow-primary/40">
            <ChefHat className="w-12 h-12 text-white" />
            
            {/* Sparkle animations around the logo */}
            <AnimatePresence>
              {currentStep >= 1 && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${20 + Math.cos((i * 60) * Math.PI / 180) * 40}px`,
                        left: `${20 + Math.sin((i * 60) * Math.PI / 180) * 40}px`,
                      }}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ 
                        duration: 0.8,
                        delay: i * 0.05,
                        ease: "easeOut"
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-accent" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Brand name animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: currentStep >= 1 ? 1 : 0,
            y: currentStep >= 1 ? 0 : 30
          }}
          transition={{ 
            duration: 0.4,
            delay: 0.2,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            RecipeHub
          </h1>
          <motion.p 
            className="text-gray-300 mt-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep >= 2 ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Premium Culinary Experience
          </motion.p>
        </motion.div>

        {/* Feature icons animation */}
        <motion.div
          className="flex items-center space-x-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: currentStep >= 2 ? 1 : 0,
            scale: currentStep >= 2 ? 1 : 0.5
          }}
          transition={{ 
            duration: 0.4,
            delay: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {[
            { icon: Utensils, delay: 0 },
            { icon: Star, delay: 0.05 }, 
            { icon: ChefHat, delay: 0.1 }
          ].map(({ icon: Icon, delay }, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 flex items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: currentStep >= 2 ? 0 : 20,
                opacity: currentStep >= 2 ? 1 : 0
              }}
              transition={{ 
                duration: 0.3,
                delay: delay + 0.5,
                ease: "easeOut"
              }}
            >
              <Icon className="w-6 h-6 text-accent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: currentStep >= 3 ? "100%" : "0%" }}
              transition={{ 
                duration: 1.0,
                delay: 0.9,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
          </div>
          <motion.p 
            className="text-xs text-gray-400 text-center mt-3 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            Preparing your culinary journey...
          </motion.p>
        </motion.div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-gray-900/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-transparent to-gray-900/30 pointer-events-none" />
    </motion.div>
  );
} 