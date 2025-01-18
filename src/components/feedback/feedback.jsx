import { Contact } from "../contact/contact";
import "../feedback/feedback.css";
import React, { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";

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

  return (
    <div id="feedback">
   
      <div className="feedback-container">
        <div className="model">
     
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
