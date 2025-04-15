import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./detailsbody.css";

function DetailsBody() {
  const location = useLocation();
  const car = location.state?.car;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) {
    return <p className="no-data">No car data available.</p>;
  }
  const {
    type,
    make,
    model,
    year,
    price,
    mileage,
    fuel_type,
    transmission,
    description,
    location: carLocation,
    images,
    seller,
  } = car;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="details-main">
          <div className="image-carousel">
            {images && images.length > 0 ? (
              <>
                <button className="image-control prev" onClick={prevImage}>
                  &lt;
                </button>
                <img
                  src={images[currentImageIndex]}
                  alt={`Car ${currentImageIndex + 1}`}
                  className="car-image"
                />
                <button className="image-control next" onClick={nextImage}>
                  &gt;
                </button>
                <div className="image-dots">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    ></span>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-image">No images available</div>
            )}
          </div>

          <div className="info">
            <aside className="details-sidebar">
              <h3 className="car-model">{model}</h3>
              <h1 className="car-make">{make}</h1>
              <p className="car-type-year">
                {type.toUpperCase()} | {year}
              </p>
              {description && <p className="car-description">{description}</p>}

              <div className="specs-badges">
                <span className="badge fuel-badge">🚗 {fuel_type}</span>
                <span className="badge transmission-badge">⚙️ {transmission}</span>
                <span className="badge drivetrain-badge">🧭 All-Wheel Drive</span>
              </div>

              <p className="car-price">${price}</p>

              <div className="mileage-info">
                <p className="mileage-label">
                  Mileage: <span className="mileage-value">{mileage} km</span>
                </p>
              </div>

              <button className="add-to-cart-button">Added to Cart</button>
            </aside>
          </div>
        </div>

        <div className="seller-contact-section">
          <div className="seller-info-container"> {/* New container */}
            <div className="seller-info">
              <div className="seller-avatar-info">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Seller"
                  className="seller-avatar"
                />
                <div className="seller-details-text">
                  <h4 className="seller-name">{seller.name}</h4>
                  <p className="seller-location">{carLocation}</p>
                </div>
              </div>
            </div>
            <div className="message">
              <button className="message-button">
                Message <span className="arrow-icon">↗</span>
              </button>
            </div>
          </div>

          <div className="contact-options">
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <span>{seller.phone}</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>{seller.contact}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="similar-models-section">
        <h2 className="section-title">Similar models</h2>
        <p className="section-subtitle">Recent Cars</p>
        <div className="similar-models-grid">
          {[1, 2, 3, 4].map((item, idx) => (
            <div key={idx} className="similar-model-card">
              <div className="model-image-container">
                <img
                  src={`./images/1.png`}
                  alt="Car"
                  className="model-image"
                />
                {(idx === 0 || idx === 3) && (
                  <span className="great-price-badge">Great Price</span>
                )}
              </div>
              <div className="model-details">
                <h4 className="model-name-small">
                  {[
                    "Toyota Camry New",
                    "T-Cross – 2023",
                    "C-Class – 2023",
                    "Ford Transit – 2021",
                  ][idx]}
                </h4>
                <p className="model-specs-small">
                  4.0 D5 PowerPulse Momentum 5dr AWD
                </p>
                <div className="model-info-icons">
                  <span>{["20 KM", "15 KM", "50 KM", "2500 KM"][idx]}</span>
                  <span>{["Petrol", "Petrol", "Petrol", "Diesel"][idx]}</span>
                  <span>
                    {["Automatic", "CVT", "Automatic", "Manual"][idx]}
                  </span>
                </div>
                <div className="model-price-small">2.2M ETB</div>
                <a href="#" className="view-details-link">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DetailsBody;