import { Contact } from "../contact/contact";
import "../feedback/feedback.css";
import React, { Suspense, useState, useEffect, useMemo, useCallback } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import { Model } from "../Models/Model";

const FeedbackCard = React.memo(({ feedback, author, position, company, positionClass }) => (
  <div className={`feedback-card ${positionClass}`}>
    <div className="feedback-quote">❝</div>
    <p className="feedback-text">{feedback}</p>
    <h6 className="author">{author}</h6>
    <p className="position">{position}</p>
    <p className="company">{company}</p>
  </div>
));

export function Feedback() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [cameraPosition] = useState([0, 0, 10]);
  // const [robotPosition, setRobotPosition] = useState([-20, 0, 0]);
  // const [animationStage, setAnimationStage] = useState("horizontal");

  const feedbackData = useMemo(() => [
    { feedback: "Great website for campers!", author: "Mark S", position: "Owner", company: "Camp Night" },
    { feedback: "Highly recommend Travel Buddy.", author: "John D", position: "Owner", company: "Travel Buddy" },
    { feedback: "EcoStore's site is fantastic!", author: "Emma W", position: "Marketing Head", company: "EcoStore" },
    { feedback: "Nice Burg's website made me hungry!", author: "Lisa M", position: "Manager", company: "Nice Burg" },
    { feedback: "Gadget Galaxy's site is top-notch!", author: "Chris B", position: "CTO", company: "Gadget Galaxy" },
  ], []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
  }, [feedbackData.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length);
  }, [feedbackData.length]);

  const getPositionClass = (index) => {
    const position = index - currentIndex;
    if (position === 0) return "center";
    if (position === -1 || (position === feedbackData.length - 1 && currentIndex === 0)) return "left";
    if (position === 1 || (currentIndex === feedbackData.length - 1 && index === 0)) return "right";
    return "hidden";
  };

  // useEffect(() => {
  //   const maxHorizontal = window.innerWidth >= 1024 ? 20 : 10; // Wider range for larger screens
  //   const interval = setInterval(() => {
  //     setRobotPosition((prevPosition) => {
  //       if (animationStage === "horizontal") {
  //         if (prevPosition[0] >= maxHorizontal) {
  //           setAnimationStage("vertical");
  //           return [0, 10, 0]; // Move from top when going vertical
  //         }
  //         return [prevPosition[0] + 0.1, 0, 0];
  //       } else if (animationStage === "vertical") {
  //         if (prevPosition[1] <= -10) {
  //           setAnimationStage("horizontal");
  //           return [-maxHorizontal, 0, 0]; // Reset back to left edge
  //         }
  //         return [0, prevPosition[1] - 0.1, 0];
  //       }
  //       return prevPosition;
  //     });
  //   }, 10);

  //   return () => clearInterval(interval);
  // }, [animationStage]);

  // const modelScale = useMemo(() => {
  //   return window.innerWidth < 768 ? [15, 15, 15] : [30, 30, 30]; // Smaller scale for mobile
  // }, []);

  return (
    <div id="feedback">
      <div className="feedback-container">
        <div className="model">
          {/* <Suspense fallback={<div>Loading model...</div>}>
            <Canvas camera={{ position: cameraPosition, fov: 50 }} style={{ height: "500px" }}>
              <Environment files="/image/brown_photostudio_01_2k.hdr" />
              <OrbitControls enableZoom={false} enableRotate={false} enablePan={true} />
              <Model url="/models/Robot/robot.gltf" scale={modelScale} position={robotPosition} />
            </Canvas>
          </Suspense> */}
        </div>
        <h2 className="feedback-heading">Feedback</h2>
        <div className="carousel-wrapper">
          {feedbackData.map((data, index) => (
            <FeedbackCard
              key={index}
              feedback={data.feedback}
              author={data.author}
              position={data.position}
              company={data.company}
              positionClass={getPositionClass(index)}
            />
          ))}
        </div>
        <div className="buttons">
          <button onClick={handlePrevious} className="btn btn-secondary">
            <span className="bi bi-chevron-double-left"></span>
          </button>
          <button onClick={handleNext} className="btn btn-primary">
            <span className="bi bi-chevron-double-right"></span>
          </button>
        </div>
      </div>
      <section>
        <Contact />
      </section>
    </div>
  );
}
