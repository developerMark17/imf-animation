import React, { lazy, Suspense, useState, useEffect } from "react";
import "../Home/Home.css";

const Work = lazy(() => import("../Work/Work"));
export function Home() {
  
  return (
    <>
      <div id="home">
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
