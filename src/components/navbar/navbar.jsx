import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {faXTwitter ,faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../navbar/navbar.css';
import { Link } from 'react-router-dom';
import { Home } from '../Home/Home';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
       <div className='logo overflow-hidden' >
        
        <img src="/image/logo.webp" alt="" />
      </div>
    <div className="navbar-container">
     
      <div className={`navbar ${isOpen ? 'open' : ''}`}>
        <button className="navbar-toggle text-primary" onClick={toggleNavbar}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
        {isOpen && (
          
          <ul className="navbar-items">
            <li className='item-1'>
              <Link to='https://www.instagram.com/imfanimation/' className='instaIcon'><FontAwesomeIcon icon={faInstagram}/></Link>
             <a href='#work'>
            <span className='bi bi-chevron-right'></span>
            Work</a>
              
              </li>

            <li className='item-2'>
              <Link to='https://x.com/IMFanimation/with_replies' className='xIcon'><FontAwesomeIcon icon={faXTwitter} /></Link>
              <a href='#about'>
            <span className='bi bi-chevron-right'></span>
            
            About</a></li>


            <li className='item-3'><a href='#feedback'>
            <span className='bi bi-chevron-right'></span>
            
            Feedback</a></li>
            
            <li className='item-4'><a href='#contact'>
            <span className='bi bi-chevron-right'></span>
            
            Contact</a></li>

           
          </ul>
        )}
      </div>
    </div>
    <section>

      <Home/>
    </section>
    </div>
  );
};

