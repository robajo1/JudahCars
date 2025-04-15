import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate} from "react-router-dom";
import "./detailsbody.css";

function DetailsBody() {
  const location = useLocation();
  const car = location.state?.car;

  useEffect(() => {
    if (car) {
      setCurrentImageIndex(0);
      window.scrollTo(0, 0);
    }
  }, [car]);
  
   
  const navigate=useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addToCartStatus, setAddToCartStatus] = useState("Add to Cart");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [inventory, setInventory] = useState([]);

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
    images,
    seller,
    id, // Assuming each car object has a unique 'id'
  } = car;
  //filters similar cars by type randomly 
  const typeFilter=type;
  const shuffledSimilarCars = [...inventory]
  .filter(
    (c) => c.model !== car.model && c.type.toLowerCase() === typeFilter.toLowerCase()
  )
  .sort(() => 0.5 - Math.random()) // shuffle

const similarCars = shuffledSimilarCars.slice(0, 5); // take first 5


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
  const navigateToDetail = (car) => {
    console.log(car);
    navigate("/detail", { state: { car } });
  };
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setAddToCartStatus("Adding...");
    const existingCartItems = localStorage.getItem("cartItems");
    let cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

    const itemToAdd = {
      id: id,
      make: make,
      model: model,
      price: price,
      image: images[0], // Add the first image to the cart item
    };

    cartItems = [...cartItems, itemToAdd];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setAddToCartStatus("Added to Cart");

    setTimeout(() => {
      setIsAddingToCart(false);
      setAddToCartStatus("Add to Cart");
    }, 2000);
  };

  const getAddToCartButtonStyle = () => {
    if (addToCartStatus === "Added to Cart") {
      return "added";
    }
    return "";
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
              <h3 className="car-make">{make}</h3>
              <h1 className="car-model">{model}</h1>
              <p className="car-type-year">
                {type.toUpperCase()} | {year}
              </p>
              {description && <p className="car-description">{description}</p>}

              <div className="specs-badges">
                <span className="badge fuel-badge">🚗 {fuel_type}</span>
                <span className="badge transmission-badge">⚙️ {transmission}</span>
                <span className="badge drivetrain-badge">🧭 All-Wheel Drive</span> {/* Assuming this is always the case or from data */}
              </div>

              <p className="car-price">${price}</p>

              <div className="mileage-info">
                <p className="mileage-label">
                  Mileage: <span className="mileage-value">{mileage} km</span>
                </p>
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
            {" "}
            {/* New container */}
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
          {similarCars.length > 0 ? (
            similarCars.slice(0, 5).map((item, idx) => (
              <div key={item.id || idx} className="similar-model-card" onClick={() => navigateToDetail(item)} style={{ cursor: "pointer" }}>
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
                  <h4 className="model-name-small">
                    {item.make} {item.model} – {item.year}
                  </h4>
                  <div className="model-info-icons">
                    <span>{item.mileage} KM</span>
                    <span>{item.fuel_type}</span>
                    <span>{item.transmission}</span>
                  </div>
                  <div className="model-price-small">{item.price} ETB</div>
                  <a href="#" className="view-details-link">
                    View Details
                  </a>
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
