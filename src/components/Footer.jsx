import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section company">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/get-in-touch">Get in Touch</a></li>
            <li><a href="/help-center">Help center</a></li>
            <li><a href="/live-chat">Live chat</a></li>
            <li><a href="/how-it-works">How it works</a></li>
          </ul>
        </div>

        <div className="footer-section our-brands">
          <h3>Our Brands</h3>
          <ul>
            <li><a href="/brands/toyota">Toyota</a></li>
            <li><a href="/brands/porsche">Porsche</a></li>
            <li><a href="/brands/audi">Audi</a></li>
            <li><a href="/brands/bmw">BMW</a></li>
            <li><a href="/brands/ford">Ford</a></li>
            <li><a href="/brands/nissan">Nissan</a></li>
            <li><a href="/brands/peugeot">Peugeot</a></li>
            <li><a href="/brands/volkswagen">Volkswagen</a></li>
          </ul>
        </div>

        <div className="footer-section vehicles-type">
          <h3>Vehicles Type</h3>
          <ul>
            <li><a href="/vehicles/sedan">Sedan</a></li>
            <li><a href="/vehicles/hatchback">Hatchback</a></li>
            <li><a href="/vehicles/suv">SUV</a></li>
            <li><a href="/vehicles/hybrid">Hybrid</a></li>
            <li><a href="/vehicles/electric">Electric</a></li>
            <li><a href="/vehicles/coupe">Coupe</a></li>
            <li><a href="/vehicles/truck">Truck</a></li>
            <li><a href="/vehicles/convertible">Convertible</a></li>
          </ul>
        </div>

        <div className="footer-section mobile-app">
          <h3>Our Mobile App</h3>
          <div className="app-buttons">
            <a href="/apple-store" className="app-store-button">
              <img src="images/apple.png" alt="Apple Store" />
              Coming soon <br /> Apple Store
            </a>
            <a href="/google-play" className="google-play-button">
              <img src="/images/g.png" alt="Google Play" />
              Coming soon <br /> Google Play
            </a>
          </div>
        </div>

        <div className="footer-section connect-us">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="/facebook" className="social-icon"><img src="/images/f2.png" alt="Facebook" /></a>
            <a href="/X" className="social-icon"><img src="/images/x.png" alt="X" /></a>
            <a href="/instagram" className="social-icon"><img src="/images/instagram.png" alt="Instagram" /></a>
            <a href="/linkedin" className="social-icon"><img src="/images/link.png" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 JUBAH CARS.com. All rights reserved.</p>
        <p>Hoodie & Addis Ababa - Robel looks like saka</p>
      </div>
    </footer>
  );
}

export default Footer;