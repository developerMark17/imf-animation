import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../services/services.css";

// Lazy-load Feedback Component
const Feedback = lazy(() => import("../feedback/feedback").then(module => ({ default: module.Feedback })));

// Sample services data
const services = [
  {
    id: "modeling",
    title: "3D Modeling",
    description: `Need detailed product designs? Or maybe lifelike characters? 
      How about immersive architectural visuals? Our 3D modeling
      services deliver top-notch, realistic models that catch every
      little detail. We'll work closely with you so that every model
      matches your vision & requirements just right.`,
    details: "Our 3D modeling process involves concept sketching, wireframing, texturing, and final rendering. We use industry-standard software like Maya, 3ds Max, and Blender to create high-quality 3D models for various applications.",
  },
  {
    id: "animation",
    title: "3D Animation",
    description: `Want to see your concepts come alive? Our fun 3D animation
      services can help! From lively character animations and cool
      product demos to cinematic scenes that tell a story, we create
      animations that grab attention & entertain. Our goal? To make
      your ideas move and connect with your audience in fresh and
      exciting ways.`,
    details: "Our animation pipeline includes storyboarding, rigging, keyframe animation, and post-production. We specialize in character animation, product demonstrations, and architectural walkthroughs using tools like Maya, Cinema 4D, and After Effects.",
  },
  {
    id: "design",
    title: "Graphic Design",
    description: `Want a powerful visual impact? Check out our graphic design
      services! We craft unique logos that shape your brand, make
      eye-catching marketing materials like brochures and posters,
      & design digital assets that shine on your website & social
      media. Our designs not only look awesome but also clearly
      share your message.`,
    details: "Our graphic design services cover logo design, branding, print materials, and digital assets. We use Adobe Creative Suite (Photoshop, Illustrator, InDesign) to create visually striking designs that align with your brand identity and marketing goals.",
  },
];

// Debounced Resize Hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export function Services() {
  const isMobile = useIsMobile();
  const [openService, setOpenService] = useState("modeling");

  // Memoize services and animation variants
  const memoizedServices = useMemo(() => services, []);
  const animationVariants = useMemo(() => {
    return isMobile
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.3 },
        };
  }, [isMobile]);

  // Find active service for rendering
  const activeService = useMemo(
    () => memoizedServices.find((s) => s.id === openService),
    [openService, memoizedServices]
  );

  return (
    <div>
      <div id="services" className="services-section">
        <div className="container">
          <h1 className="text-white text-center mb-5 mt-5">Our Services</h1>
          <div className="row">
            <div className="col-md-4 mt-5">
              <ul className="list-group">
                {memoizedServices.map((service) => (
                  <li key={service.id} className="list-group-item">
                    <motion.div
                      whileHover={!isMobile ? { scale: 1.05 } : false}
                      whileTap={!isMobile ? { scale: 0.95 } : false}
                      onClick={() => setOpenService(service.id)}
                      style={{ cursor: "pointer" }}
                      className={
                        openService === service.id
                          ? "active-title"
                          : "text-dark-emphasis"
                      }
                    >
                      {service.title}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6 text-white bg-gradient rounded ms-5">
              <AnimatePresence mode="wait">
                {activeService && (
                  <motion.div
                    key={activeService.id}
                    initial={animationVariants.initial}
                    animate={animationVariants.animate}
                    exit={animationVariants.exit}
                    transition={animationVariants.transition}
                    className="service-description mt-2"
                  >
                    <p>{activeService.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <section>
        <Suspense fallback={<div>Loading Feedback...</div>}>
          <Feedback />
        </Suspense>
      </section>
    </div>
  );
}
