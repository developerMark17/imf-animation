import React, { Suspense, useEffect, useState, useMemo, useCallback, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Preload } from "@react-three/drei";
import { Model } from "../Models/Model";
import { useSpring, animated } from "@react-spring/three";
import "../About/About.css";

// Lazy load Services component
const Services = lazy(() => import("../services/services").then(module => ({ default: module.Services })));

// Utility function to check if the device is mobile
const isMobile = () => window.innerWidth <= 768;

// Debounce function to optimize resize event handling
const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const AnimatedModel = React.memo(({ scale }) => {
  const [rotationY, setRotationY] = useState(0);

  // RequestAnimationFrame for smoother animation
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setRotationY((prev) => prev + 0.01);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Spring animations for scale
  const { scale: animatedScale } = useSpring({
    scale: scale.map((s) => s * (isMobile() ? 0.8 : 1)),
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <animated.group rotation={[0, rotationY, 0]} scale={animatedScale} position={[0, 0, 0]}>
      <Model
        url={isMobile() ? "/models/comp/cube_low_res.glb" : "/models/comp/cube.glb"}
      />
    </animated.group>
  );
});

export function About() {
  const [modelScale, setModelScale] = useState([50, 50, 50]);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 10]);
  const [isCentered, setIsCentered] = useState(false);

  // Debounced resize handler
  const updateModelSize = useCallback(() => {
    if (isMobile()) {
      setModelScale([40, 40, 40]);
      setCameraPosition([0, 0, 12]);
      setIsCentered(true);
    } else {
      setModelScale([50, 50, 50]);
      setCameraPosition([0, 10, 20]);
      setIsCentered(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = debounce(updateModelSize, 200); // Only execute after 200ms delay
    updateModelSize(); // Set initial size based on window size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [updateModelSize]);

  const canvasCameraProps = useMemo(
    () => ({
      position: cameraPosition,
      fov: 50,
    }),
    [cameraPosition]
  );

  return (
    <div id="about">
      
      <div className="about-bg">
        <div className="container text-center">
          <div className="row text-white">
            <h1 className="aboutHeading">About</h1>
            <div className="col aboutContent">
              <p className="text-start">
                Welcome to IMF Animation! Here, creativity & technology meet in
                the coolest way. We're a passionate group of 3D artists plus
                digital innovators who love 3D animation, modeling, & creating
                digital content. Our goal? To change your ideas into amazing
                visuals that really grab attention!
              </p>
              <p className="text-start">
                We know how to make lively, detail-rich 3D models, plus lots of
                digital content. We focus on delivering awesome quality that
                fits what you need. So if you want eye-catching character
                animations or super detailed models, we mix our artistic skills
                with top tech to blow your mind.
              </p>
              <p className="text-start">
                At IMF, teamwork is our thing! We make sure your vision is at
                the center of everything we create. We're devoted to staying
                fresh and on top of trends because we want to give you the best
                solutions out there. Join us! Let's turn your dreams into
                stunning visuals together. We can make something truly special!
              </p>
            </div>
            <div className={`about-model ${isCentered ? "centered-model" : ""}`}>
              <Suspense fallback={<div>Loading model...</div>}>
                <Canvas camera={canvasCameraProps} style={{ width: "100%", height: "100%" }}>
                  <Environment files="/image/brown_photostudio_01_2k.hdr" />
                  <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                  <AnimatedModel scale={modelScale} />
                  <Preload all />
                </Canvas>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <section>
        <Suspense fallback={<div>Loading Services...</div>}>
          <Services />
        </Suspense>
      </section>
    </div>
  );
}

