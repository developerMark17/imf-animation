import { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../contact/contact.css';
import { FaInstagram,FaLinkedinIn } from 'react-icons/fa';
import { Footer } from '../footer/footer';
import { FaXTwitter } from "react-icons/fa6";

export function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_60igyvp', 'template_x0arc9d', e.target, 'nFpVEp87LmSPZPs1d')
      .then((result) => {
        setFormData({ email: '', message: '' }); // Clear the form after submission
        showAnimatedAlert('Message sent successfully!');
      }, (error) => {
        alert('Failed to send message, please try again.');
      });
  };

  const showAnimatedAlert = (message) => {
    const alertBox = document.createElement('div');
    alertBox.className = 'animated-alert';
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.classList.add('fade-out');
      alertBox.addEventListener('transitionend', () => {
        alertBox.remove();
      });
    }, 3000);
  };

  return (
    <div>

    <div id='contact' className="contact-container">
      <div className="contact-content">
        <h2 className="contact-heading">Let's Connect Today</h2>
        <div className="row">
          <div className="col contact-info">
            <h3>Support</h3>
            <p><strong>Email:</strong> Imfanimation@gmail.com</p>
            <p><strong>Phone:</strong> +91 9198194939</p>
            <div className="social-media-icons">
              <a href="https://www.instagram.com/imfanimation/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className='fs-2' />
              </a>
              <a href="https://x.com/IMFanimation/with_replies" target="_blank" rel="noopener noreferrer">
                <FaXTwitter className='fs-2 ms-2' />
              </a>
              <a href="https://www.linkedin.com/company/imf-animation/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className='fs-2 ms-2' />
              </a>
            </div>
          </div>

          <div className="col contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                  />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Your Message"
                  rows="4"
                  required
                  />
              </div>
              <button type="submit" className="btn-submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

    </div>
      <section>
      <Footer/>
      </section>
                  </div>
  );
}
