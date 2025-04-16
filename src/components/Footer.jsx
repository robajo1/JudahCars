import React from 'react';
import './Footer.css';

function Footer() {
  const year= new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section company">
          <h3>Company</h3>
          <ul>
            <li><a hrf="/about">About Us</a></li>
            <li><a h="/services">Services</a></li>
            <li><a h="/faqs">FAQs</a></li>
            <li><a h="/terms">Terms</a></li>
            <li><a h="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a h="/get-in-touch">Get in Touch</a></li>
            <li><a h="/help-center">Help center</a></li>
            <li><a h="/live-chat">Live chat</a></li>
            <li><a h="/how-it-works">How it works</a></li>
          </ul>
        </div>

        <div className="footer-section our-brands">
          <h3>Our Brands</h3>
          <ul>
            <li><a h="/brands/toyota">Toyota</a></li>
            <li><a h="/brands/porsche">Porsche</a></li>
            <li><a h="/brands/audi">Audi</a></li>
            <li><a h="/brands/bmw">BMW</a></li>
            <li><a h="/brands/ford">Ford</a></li>
            <li><a h="/brands/nissan">Nissan</a></li>
            <li><a h="/brands/peugeot">Peugeot</a></li>
            <li><a h="/brands/volkswagen">Volkswagen</a></li>
          </ul>
        </div>

        <div className="footer-section vehicles-type">
          <h3>Vehicles Type</h3>
          <ul>
            <li><a h="/vehicles/sedan">Sedan</a></li>
            <li><a h="/vehicles/hatchback">Hatchback</a></li>
            <li><a h="/vehicles/suv">SUV</a></li>
            <li><a h="/vehicles/hybrid">Hybrid</a></li>
            <li><a h="/vehicles/electric">Electric</a></li>
            <li><a h="/vehicles/coupe">Coupe</a></li>
            <li><a h="/vehicles/truck">Truck</a></li>
            <li><a h="/vehicles/convertible">Convertible</a></li>
          </ul>
        </div>

        <div className="footer-section mobile-app">
          <h3>Our Mobile App</h3>
          <div className="app-buttons">
            <a h="/apple-store" className="app-store-button">
              <img src="images/apple.png" alt="Apple Store" />
              Coming soon <br /> Apple Store
            </a>
            <a h="/google-play" className="google-play-button">
              <img src="/images/g.png" alt="Google Play" />
              Coming soon <br /> Google Play
            </a>
          </div>
        </div>

        <div className="footer-section connect-us">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a h="/facebook" className="social-icon"><img src="/images/f2.png" alt="Facebook" /></a>
            <a h="/X" className="social-icon"><img src="/images/x.png" alt="X" /></a>
            <a h="/instagram" className="social-icon"><img src="/images/instagram.png" alt="Instagram" /></a>
            <a h="/linkedin" className="social-icon"><img src="/images/link.png" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {year} JUBAH CARS.com. All rights reserved.</p>
        <p>Hoodie & Addis Ababa</p>
      </div>
    </footer>
  );
}

export default Footer;