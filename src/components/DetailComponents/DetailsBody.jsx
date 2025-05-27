import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./detailsbody.css";
import { p } from "framer-motion/client";

function DetailsBody() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const user = localStorage.getItem("user");

  const location = useLocation();
  const car = location.state?.car;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addToCartStatus, setAddToCartStatus] = useState("Add to Cart");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = async (event) => {
      const data = typeof event.data === 'string' ? event.data : await blobToString(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const blobToString = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(blob);
    });
  };

  const sendMessage = () => {
    if (socket && input) {
      socket.send(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (car) {
      setCurrentIndex(0);
      window.scrollTo(0, 0);
    }
  }, [car]);


  useEffect(() => {
    if (!car) return;

    fetch(`http://localhost:9090/api/products?type=${encodeURIComponent(car.type)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch similar cars from backend");
        return res.json();
      })
      .then((data) => {
        
        
        const filtered = data
          .filter((c) => c.productId !== car.productId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setInventory(filtered);
        
      })
      .catch((err) => console.error("Error fetching similar cars:", err));
  }, [car]);

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
    imageUrl1,
    imageUrl2,
    imageUrl3,
    sketchfabEmbed,
    seller,
    id,
  } = car;

  const mediaItems = [imageUrl1, imageUrl2, imageUrl3].filter(Boolean);
  if (sketchfabEmbed) mediaItems.push("3d-model");

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
      image: imageUrl1,
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
    <>
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
                  onClick={user ? handleAddToCart : null}
                  disabled={isAddingToCart || addToCartStatus === "Added to Cart"}
                >
                  {user ? addToCartStatus : "Login to Add to Cart"}
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
                <button className="message-button"
                  onClick={user ? () => setShowMessageModal(true) : null}>
                  {user ? "Message" : "Login to Message Seller"} <span className="arrow-icon">↗</span>
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

        {/* ✅ SIMILAR CARS SECTION */}
        <section className="similar-models-section">
          <h2 className="section-title">Similar models</h2>
          <p className="section-subtitle">Recent Cars</p>
          <div className="similar-models-grid">
            {inventory.length > 0 ? (
              inventory.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="similar-model-card"
                  onClick={() => navigateToDetail(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="model-image-container">
                    <img
                      src={item.imageUrl1 || "./images/placeholder.png"}
                      alt="Car"
                      className="model-image"
                    />
                    {(idx === 0 || idx === 3) && (
                      <span className="great-price-badge">Great Price</span>
                    )}
                  </div>
                  <div className="model-details">
                    <h4>{item.make} {item.model} – {item.year}</h4>
                    <div className='line'></div>
                    <div className="model-info-icons" style={{ fontSize: '0.9rem' }}>
                      <p>{item.mileage} KM {item.fuel_type} {item.transmission}</p>
                    </div>
                    <div className='line'></div>
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

      {showMessageModal && (
        <div className="chat-modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <h3>Live Chat</h3>
              <button className="close-chat" onClick={() => setShowMessageModal(false)}>×</button>
            </div>
            <div className="chat-body">
              {messages.map((msg, index) => (
                <div key={index} className="bubble">{msg}</div>
              ))}
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailsBody;
