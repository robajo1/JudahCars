// DetailsBody.js
import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./detailsbody.css";

function DetailsBody() {
  const location = useLocation();
  const car = location.state?.car;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addToCartStatus, setAddToCartStatus] = useState("Add to Cart");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    if (car) {
      setCurrentIndex(0);
      window.scrollTo(0, 0);
    }
  }, [car]);

  useEffect(() => {
    fetch("/data/carInventory.json")
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("Error loading car inventory:", err));
  }, []);

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
    images = [],
    sketchfabEmbed,
    seller,
    id,
  } = car;

  // Combine image list + 3D model frame (if it exists)
  const mediaItems = [...images];
  if (sketchfabEmbed) {
    mediaItems.push("3d-model");
  }

  const similarCars = [...inventory]
    .filter((c) => c.model !== car.model && c.type.toLowerCase() === type.toLowerCase())
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const navigateToDetail = (car) => {
    navigate("/detail", { state: { car } });
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setAddToCartStatus("Adding...");
    const existing = localStorage.getItem("cartItems");
    let cartItems = existing ? JSON.parse(existing) : [];

    const itemToAdd = {
      id,
      make,
      model,
      price,
      image: images[0],
    };

    cartItems.push(itemToAdd);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setAddToCartStatus("Added to Cart");

    setTimeout(() => {
      setIsAddingToCart(false);
      setAddToCartStatus("Add to Cart");
    }, 2000);
  };

  const getAddToCartButtonStyle = () => {
    return addToCartStatus === "Added to Cart" ? "added" : "";
  };

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="details-main">
          <div className="image-carousel">
            <button className="image-control prev" onClick={prevMedia}>
              &lt;
            </button>

            {mediaItems[currentIndex] === "3d-model" ? (
              <div className="sketchfab-embed-wrapper">
                <iframe
                  title={`${make} ${model} 3D View`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  src={sketchfabEmbed}
                  style={{ width: "100%", height: "500px", borderRadius: "10px" }}
                />
              </div>
            ) : (
              <img
                src={mediaItems[currentIndex]}
                alt={`Car ${currentIndex + 1}`}
                className="car-image"
              />
            )}

            <button className="image-control next" onClick={nextMedia}>
              &gt;
            </button>

            <div className="image-dots">
              {mediaItems.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                ></span>
              ))}
            </div>
          </div>

          <div className="info">
            <aside className="details-sidebar">
              <h3 className="car-make">{make}</h3>
              <h1 className="car-model">{model}</h1>
              <p className="car-type-year">{type.toUpperCase()} | {year}</p>
              <p className="car-description">{description}</p>

              <div className="specs-badges">
                <span className="badge">🚗 {fuel_type}</span>
                <span className="badge">⚙️ {transmission}</span>
                <span className="badge">🧭 All-Wheel Drive</span>
              </div>

              <p className="car-price">${price}</p>

              <div className="mileage-info">
                <p>Mileage: <span>{mileage} km</span></p>
              </div>

              <button
                className={`add-to-cart-button ${getAddToCartButtonStyle()}`}
                onClick={handleAddToCart}
                disabled={isAddingToCart || addToCartStatus === "Added to Cart"}
              >
                {addToCartStatus}
              </button>
            </aside>
          </div>
        </div>

        <div className="seller-contact-section">
          <div className="seller-info-container">
            <div className="seller-info">
              <div className="seller-avatar-info">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Seller"
                  className="seller-avatar"
                />
                <div className="seller-details-text">
                  <h4>{seller.name}</h4>
                  <p>{carLocation}</p>
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
              <FaPhoneAlt /> <span>{seller.phone}</span>
            </div>
            <div className="contact-item">
              <FaEnvelope /> <span>{seller.contact}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="similar-models-section">
        <h2 className="section-title">Similar models</h2>
        <p className="section-subtitle">Recent Cars</p>
        <div className="similar-models-grid">
          {similarCars.length > 0 ? (
            similarCars.map((item, idx) => (
              <div
                key={item.id || idx}
                className="similar-model-card"
                onClick={() => navigateToDetail(item)}
                style={{ cursor: "pointer" }}
              >
                <div className="model-image-container">
                  <img
                    src={item.images?.[0] || "./images/placeholder.png"}
                    alt="Car"
                    className="model-image"
                  />
                  {(idx === 0 || idx === 3) && (
                    <span className="great-price-badge">Great Price</span>
                  )}
                </div>
                <div className="model-details">
                  <h4>{item.make} {item.model} – {item.year}</h4>
                  <div className="model-info-icons">
                    <span>{item.mileage} KM</span>
                    <span>{item.fuel_type}</span>
                    <span>{item.transmission}</span>
                  </div>
                  <div className="model-price-small">{item.price} ETB</div>
                  <a href="#" className="view-details-link">View Details</a>
                </div>
              </div>
            ))
          ) : (
            <p>No similar cars found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default DetailsBody;
