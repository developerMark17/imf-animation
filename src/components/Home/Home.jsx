import React, { lazy, Suspense, useState, useEffect } from "react";
import "../Home/Home.css";
import { Helmet } from "react-helmet-async";

const Work = lazy(() => import("../Work/Work"));
export function Home() {
  
  return (
    <>
      <div id="home">
      <Helmet>
        <title>IMF Animation - Home</title>
        <meta name="description" content="Welcome to IMF Animation! Explore our stunning 3D models and animations." />
        <meta name="keywords" content="IMF Animation, 3D animation, creative studio" />
      </Helmet>

        <div className="home-1" id="video-section">
      
              <video
                className="video"
                src="/video/Main.webm"
                width="600px"
                loop
                autoPlay
                muted
                playsInline
              />
           
        </div>
      </div>

      <section className="mt-5">
        <Suspense fallback={<div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading Models</span>
</div>}>
          <Work />
        </Suspense>
      </section>
    </>
  );
}
