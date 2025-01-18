import React, { useEffect, useMemo, useRef, Suspense, useState, lazy, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Environment,Preload } from "@react-three/drei";
import { About } from "../About/about";
import "./Work.css";
import throttle from "lodash.throttle";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const Model = lazy(() => import("../Models/Model").then((module) => ({ default: module.Model })));
const MemoizedModel = React.memo(({ modelUrl, hover, position, scale, initialRotation, setLoaded, setProgress }) => {
  const meshRef = useRef();
  const { scaleSpring, rotationSpring } = useSpring({
    scaleSpring: hover ? scale.map((s) => s * 1.1) : scale,
    rotationSpring: initialRotation,
    config: { mass: 5, tension: 180, friction: 15 },
  });
  
  useFrame(() => {
    if (meshRef.current && !hover) {
      meshRef.current.rotation.x += (initialRotation[0] - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (initialRotation[1] - meshRef.current.rotation.y) * 0.1;
    }
  });
  
  useEffect(() => {
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(progressInterval);
        setLoaded(true);
        return 100;
      });
    }, 200);
  }, [setLoaded, setProgress]);
  
  return (
    <Suspense fallback={null}>
      <animated.mesh
        ref={meshRef}
        scale={scaleSpring}
        rotation={rotationSpring}
        position={position}
        >
        <Model url={modelUrl} />
      </animated.mesh>
    </Suspense>
  );
});

const ModelCard = React.memo(function ModelCard({ modelUrl, scale, position, initialRotation, modelName }) {
  const { ref, inView } = useInView({
    threshold: 0.1, // Load only when 10% of the element is visible
  });
  const [hover, setHover] = useState(false);
  const [rotation, setRotation] = useState(initialRotation);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleMouseMove = useCallback(
    throttle((e) => {
      const { offsetWidth, offsetHeight } = e.target;
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const rotateX = (y / offsetHeight) * 0.8 - 0.2;
      const rotateY = (x / offsetWidth) * 0.8 - 0.2;
      setRotation([rotateX, rotateY, 0]);
    }, 50), // Adjust delay as needed
    []
  );

  const handleMouseEnter = useCallback(() => setHover(true), []);
  const handleMouseLeave = useCallback(() => setHover(false), []);

  useEffect(() => {
    if (!hover) setRotation(initialRotation);
  }, [hover, initialRotation]);

  return (
    <div>
      <section>
        <div className="card" id="work">
          <div
            className="card-body overflow-hidden"
            style={{ height: "400px", position: "relative" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => requestAnimationFrame(() => handleMouseMove(e))}
          >
            {!loaded && (
              <div className="loader position-relative top-50 bottom-50">
                <span className="loading-text"><span class="placeholder col-12 bg-primary">{progress}% Loading...</span></span>
              </div>
            )}

            <div ref={ref} className="canvas-container" style={{ height: "100%", width: "100%", opacity: loaded ? 1 : 0 }}>
              {inView && (
                <Suspense fallback={<div>Loading...</div>}>

                <Canvas className="canvas" camera={{ position: [0, 2, 10], fov: 50 }} dpr={[1,1.5]} gl={{ antialias: false }} >
                <Environment files="/image/brown_photostudio_01_2k.hdr" />
                <MemoizedModel
                  modelUrl={modelUrl}
                  scale={scale}
                  position={position}
                  hover={hover}
                  initialRotation={rotation}
                  setLoaded={setLoaded}
                  setProgress={setProgress} // Set loading progress
                  
                  />
                 <Preload all />
              </Canvas>
                  </Suspense>
                )}
            </div>
            <div className={`badge ${hover ? "show" : ""}`}>{modelName}</div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default function Work() {
  
  
 
  const modelData = useMemo(() => ([
    {
      modelUrl: "/models/comp/Laptop.glb",
      scale: [15, 15, 15],
      position: [0, -2, 0],
      initialRotation: [0, 0, 0],
      modelName: "Laptop"
    },
    {
      modelUrl: "/models/comp/phone.glb",
      scale: [30, 30, 30],
      position: [0, 0, 0],
      initialRotation: [0.2, 0.3, 0],
      modelName: "Phone"
    },
    {
      modelUrl: "/models/comp/sofa.glb",
      scale: [3, 3, 3],
      position: [0, 0, 0],
      initialRotation: [0.1, -0.2, 0],
      modelName: "Sofa"
    },
    {
      modelUrl: "/models/comp/packet.glb",
      scale: [0.3, 0.3, 0.3],
      position: [0, -3, 0],
      initialRotation: [0, 0.4, 0],
      modelName: "Packet"
    },
    {
      modelUrl: "/models/comp/can.glb",
      scale: [20, 20, 20],
      position: [0, 0, 0],
      initialRotation: [-0.1, 3, 0],
      modelName: "Can"
    },
    {
      modelUrl: "/models/comp/mixer.glb",
      scale: [30, 30, 30],
      position: [0, -1, 0],
      initialRotation: [0, 1.5, 0],
      modelName: "Mixer"
    }
  ]), []);

  return (
    <div>
  
      <div className="container ">
        <div className="heading-container">
          <h5 className="card bg-black text-white border-0 heading">MY WORK</h5>
        </div>
        <div className="model row no-gap">
          {modelData.map((modelProps, index) => (
            <div key={index} className="col-md-4 no-gap">
              <ModelCard {...modelProps} />
            </div>
          ))}
        </div>

<div className="d-flex justify-content-end">
<Link to='/coming-soon' className="btn btn-primary mt-4 ">ComingSoon</Link>
</div>

      </div>
      <section>
        <About />
        
      </section>
    </div>
  );
}
