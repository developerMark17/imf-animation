import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faHouseFire, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import '../navbar/navbar.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const updateMetaTags = (title, description) => {
    // Update the document title and meta description dynamically
    document.title = title;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  };

  return (
    <div>
      {/* Helmet to update meta tags */}
      <Helmet>
        <meta name="description" content="Explore IMF Animation's creative world with a stunning range of 3D models, animations, and projects." />
        <meta name="keywords" content="IMF Animation, 3D animation, creative studio, visual effects" />
      </Helmet>

      <div className='logo overflow-hidden'>
        <Link to='/' onClick={()=> updateMetaTags('IMF Animation, 3D animation, creative studio, visual effects') }>
          <img src="/image/logo.webp" alt="IMF Animation Logo" />
        </Link>
      </div>

      <div className="navbar-container">
        <div className={`navbar ${isOpen ? 'open' : ''}`}>
          <button className="navbar-toggle text-primary" onClick={toggleNavbar}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
          {isOpen && (
            <ul className="navbar-items">
              <li className="item-1">
                {/* <a href='#home' className='homeIcon'  onClick={() => updateMetaTags('IMF Animation - Home', 'Explore our latest 3D models and animation projects.')}>
                <FontAwesomeIcon icon={faHouse} className='homeIcon'  /></a> */}
                <Link to="https://www.instagram.com/imfanimation/" className="instaIcon">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <a
                  href="#work"
                  onClick={() => updateMetaTags('IMF Animation - Work', 'Explore our latest 3D models and animation projects.')}
                >
                  <span className="bi bi-chevron-right"></span> Work
                </a>
              </li>

              <li className="item-2">
                <Link to="https://x.com/IMFanimation/with_replies" className="xIcon">
                  <FontAwesomeIcon icon={faXTwitter} />
                </Link>
                <a
                  href="#about"
                  onClick={() => updateMetaTags('IMF Animation - About', 'Learn more about IMF Animation and our creative process.')}
                >
                  <span className="bi bi-chevron-right"></span> About
                </a>
              </li>

              <li className="item-3">
                <a
                  href="#feedback"
                  onClick={() => updateMetaTags('IMF Animation - Feedback', 'See feedback from our clients and collaborators.')}
                >
                  <span className="bi bi-chevron-right"></span> Feedback
                </a>
              </li>

              <li className="item-4">
                <a
                  href="#contact"
                  onClick={() => updateMetaTags('IMF Animation - Contact', 'Get in touch with IMF Animation for your next project.')}
                >
                  <span className="bi bi-chevron-right"></span> Contact
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
