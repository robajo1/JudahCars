import React, { useState, useEffect,useRef } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./detailsbody.css";
const getToken = () => localStorage.getItem("jwt_token");
const isAuthenticated = () => !!getToken();

function DetailsBody() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const user = localStorage.getItem("user");
  const stompClientRef = useRef(null);
  const location = useLocation();
  const car = location.state?.car;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addToCartStatus, setAddToCartStatus] = useState("Add to Cart");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const loadMessages = (senderId, receiverId) => {
      const token = getToken();
      
      fetch(`http://localhost:9090/api/messages?senderId=${senderId}&receiverId=${receiverId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load messages");
          return res.json();
        })
        .then((data) => {
          setMessages(data);
        })
        .catch((err) => {
          console.error("Error loading messages:", err);
        });
    };
    useEffect(() => {
           if (!user) return;
    
          const socket = new SockJS("http://localhost:9090/ws");
          const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            
            onConnect: () => {
              console.log("Connected to WebSocket");
    
              stompClient.subscribe(`/topic/messages/${JSON.parse(user).userId}`, (message) => {
               
                const incomingMessage = JSON.parse(message.body);
                           
                setMessages((prev) => [...prev, incomingMessage]);
                
              });
            },
            onStompError: (frame) => {
              console.error("WebSocket error:", frame);
            },
          });
    
          stompClient.activate();
          stompClientRef.current = stompClient;
    
          return () => {
            if (stompClientRef.current) {
              stompClientRef.current.deactivate();
            }
          };
        }, [user]);
  

  const blobToString = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(blob);
    });
  };

   const sendMessage = (user,seller,content) => {
      const token = getToken();
      const payload = {
        recieverId: seller,
        senderId: user,
        sentAt: new Date().toISOString(),
        messageText: content,
      };
      stompClientRef.current.publish({
          destination: "/app/chat.sendMessage",
          body: JSON.stringify(payload),
        });
        setInput("");
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
    fuelType,
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
    const existing = localStorage.getItem(`cartItems_${JSON.parse(user).userId}`);
    let cartItems = existing ? JSON.parse(existing) : [];

    const itemToAdd = {
      id,
      make,
      model,
      price,
      image: imageUrl1,
    };

    cartItems.push(itemToAdd);
    localStorage.setItem(`cartItems_${JSON.parse(user).userId}`, JSON.stringify(cartItems));
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
                  <span className="badge">🚗 {fuelType}</span>
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
                  onClick={user ? ()=> {
                    loadMessages(seller.userId, JSON.parse(user).userId);
                    setShowMessageModal(true)
                    } : null}>
                  {user ? "Message" : "Login to Message Seller"} <span className="arrow-icon">↗</span>
                </button>
              </div>
            </div>

            <div className="contact-options">
              <div className="contact-item">
                <FaPhoneAlt /> <span>{seller.phone}</span>
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
                    <div className="model-info-icons" style={{ fontSize: '0.9rem', display:'flex', gap:'1.5rem' }}>
                      <p>{item.mileage} KM {item.fuel_type}</p><p>{item.transmission}</p> 
                    </div>
                    <div className='line'></div>
                    <div className="model-price-small">${item.price} </div>
                    
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
              {messages.length === 0 ? (
                  <p className="text-gray-500 text-center mt-10">
                    No messages yet.
                  </p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-sm ${
                        msg.senderId === JSON.parse(user).userId
                          ? "bg-purple-100 ml-auto"
                          : "bg-white mr-auto"
                      }`}
                    >
                      
                      <p>{msg.messageText}</p>
                      <small className="text-gray-500 block mt-1">
                        {new Date(msg.sentAt).toLocaleTimeString([], {
                          year: "numeric",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  ))
                )}
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
              <button onClick={()=>sendMessage(JSON.parse(user).userId,seller.userId,input)}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailsBody;
