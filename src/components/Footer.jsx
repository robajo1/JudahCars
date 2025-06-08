import { Link } from 'react-router-dom'; // Add this import
import './Footer.css';

function Footer() {
  const year= new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section company">
          <h3>Company</h3>
          <ul>
            <li><Link to="/aboutus">About Us</Link></li>
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
            <li><Link to="/products?make=toyota">Toyota</Link></li>
            <li><Link to="/products?make=porsche">Porsche</Link></li>
            <li><Link to="/products?make=audi">Audi</Link></li>
            <li><Link to="/products?make=bmw">BMW</Link></li>
            <li><Link to="/products?make=ford">Ford</Link></li>
            <li><Link to="/products?make=nissan">Nissan</Link></li>
            <li><Link to="/products?make=volkswagen">Volkswagen</Link></li>
          </ul>
        </div>

        <div className="footer-section vehicles-type">
          <h3>Vehicles Type</h3>
          <ul>
            <li><Link to="/products?type=sedan">Sedan</Link></li>
            <li><Link to="/products?type=hatchback">Hatchback</Link></li>
            <li><Link to="/products?type=suv">SUV</Link></li>
            <li><Link to="/products?type=electric">Electric</Link></li>
            <li><Link to="/products?type=coupe">Coupe</Link></li>
            <li><Link to="/products?type=truck">Truck</Link></li>
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