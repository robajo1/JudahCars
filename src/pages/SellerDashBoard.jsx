import React, { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";



const getToken = () => localStorage.getItem("jwt_token");
const isAuthenticated = () => !!getToken();

export default function SellerDashboard() {
  const stompClientRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showEditProductPopup, setShowEditProductPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [input, setInput] = useState("");

  
  useEffect(() => {
    if (!user || !showMessageModal) return;

    const token = getToken();
    fetch(`http://localhost:9090/api/conversations/${user.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch conversations");
        return res.json();
      })
      .then((data) => {
        setConversations(data);
      })
      .catch((err) => {
        console.error("Error fetching conversations:", err);
      });
  }, [user, showMessageModal]);

  useEffect(() => {
    if (showEditProductPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showEditProductPopup]);

  const initial = {
    type: "",
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    description: "",
    location: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    sketch: "",
  };
  const [formData, setFormData] = useState(initial);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); 
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const token = getToken();

    fetch(`http://localhost:9090/api/products/${user.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        if (err.response?.status === 401) {
          navigate("/login"); 
        }
      });
  }, [user, navigate]);


  const blobToString = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject("Error reading blob");
      reader.readAsText(blob);
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

          stompClient.subscribe(`/topic/messages/${user.userId}`, (message) => {
           
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
    }, [user, selectedConversation]);



  const sendMessage = (content) => {
    if (!content.trim() || !selectedConversation || !stompClientRef.current) return;

    const payload = {
      sentAt: new Date().toISOString(),
      senderId: user.userId,
      recieverId: selectedConversation.buyerId,
      messageText: content,
    };
    
   stompClientRef.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(payload),
    });
    setInput("");
    
  };


  const loadMessages = (conversationId, buyerId) => {
    const token = getToken();
    fetch(`http://localhost:9090/api/messages/${conversationId}`, {
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
        setSelectedConversation({ conversationId, buyerId });
      })
      .catch((err) => {
        alert("Could not load messages.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }

    const token = getToken();

    const newProduct = {
      ...formData,
      sellerId: user.userId,
    };

    try {
      const response = await fetch("http://localhost:9090/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add product.");
        return;
      }

      const data = await response.json();
      alert("Product added successfully!");
      setProducts((prev) => [...prev, data]);
      setFormData(initial);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  const handleUpdateProduct = async (e, productId) => {
    const token = getToken();
    const updatedProductData = {
      ...formData,
    };

    if (!productId) {
      alert("Product is missing. Cannot update.");
      return;
    }
    console.log(updatedProductData);
    try {
      const response = await fetch(
        `http://localhost:9090/api/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProductData), 
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update product.");
        return;
      }
      const updatedProduct = await response.json();
      alert("Product updated successfully!");

      //
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          return product.productId === productId ? updatedProduct : product;
        })
      );
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const deleteProduct = (index) => {
    if (!user) return;

    const token = getToken();
    const productId = index;

    fetch(`http://localhost:9090/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message || "Failed to delete product");
          });
        }
        alert("Product deleted successfully!");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
      })
      .catch((err) => {
        console.error("Error deleting product: ", err);
        alert(err.message);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("User is not authenticated.");
      return;
    }
    handleUpdateProduct(e, selectedId);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Seller Dashboard
        </h2>

        {/* Original Add Product Form */}
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded-xl shadow-xl max-w-4xl mx-auto space-y-4"
        >
          <h3 className="text-xl font-semibold mb-2">Add New Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="make"
              placeholder="Make"
              required
              value={formData.make}
              onChange={handleInputChange}
              className="input-style text-base"
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              required
              value={formData.model}
              onChange={handleInputChange}
              className="input-style"
            />
            <input
              type="text"
              name="type"
              placeholder="Type (SUV, Sedan,...)"
              required
              value={formData.type}
              onChange={handleInputChange}
              className="input-style w-full"
            />
            <input
              type="number"
              min="1"
              name="year"
              placeholder="Year (2020)"
              required
              value={formData.year}
              onChange={handleInputChange}
              className="input-style"
            />
            <input
              type="number"
              min="1"
              name="price"
              placeholder="Price"
              required
              value={formData.price}
              onChange={handleInputChange}
              className="input-style"
            />
            <input
              type="number"
              min="1"
              name="mileage"
              placeholder="Mileage"
              required
              value={formData.mileage}
              onChange={handleInputChange}
              className="input-style"
            />
            <select
              name="fuelType"
              required
              value={formData.fuelType}
              onChange={handleInputChange}
              className="input-style"
            >
              <option value="" disabled hidden>Select Fuel Type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <select
              name="transmission"
              required
              value={formData.transmission}
              onChange={handleInputChange}
              className="input-style"
            >
              <option value="" disabled hidden>Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
            <input
              type="text"
              name="location"
              placeholder="Location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="input-style"
            />
            <input
              type="text"
              name="sketch"
              placeholder="3D (SketchfadEmbed)"
              value={formData.sketch}
              onChange={handleInputChange}
              className="input-style w-full"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg resize-none"
            rows="3"
          />
          <input
            type="text"
            name="imageUrl1"
            placeholder="Image URL 1"
            required
            value={formData.imageUrl1}
            onChange={handleInputChange}
            className="input-style w-full"
          />
          <input
            type="text"
            name="imageUrl2"
            placeholder="Image URL 2"
            value={formData.imageUrl2}
            onChange={handleInputChange}
            className="input-style w-full"
          />
          <input
            type="text"
            name="imageUrl3"
            placeholder="Image URL 3"
            value={formData.imageUrl3}
            onChange={handleInputChange}
            className="input-style w-full"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 font-semibold w-full text-lg"
          >
            Add Vehicle
          </button>
        </form>

        <button
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 font-semibold w-full mx-auto block text-center"
          style={{ width: "53rem" }}
          onClick={() => setShowMessageModal(true)}
        >
          Messages
        </button>

        {/* Products List */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Your Listings
          </h3>
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No vehicles added yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {products.map((car, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-4">
                  <img
                    src={car.imageUrl1}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h4 className="text-lg font-bold">
                    {car.make} {car.model} ({car.year})
                  </h4>
                  <p className="text-gray-600">
                    ${car.price} - {car.mileage} mi
                  </p>
                  <p className="text-gray-500 text-sm">
                    {car.fuelType} • {car.transmission}
                  </p>
                  <p className="text-gray-500 text-sm">{car.location}</p>
                  <div className="flex gap-2 mx-auto">
                    <button
                      className="mt-3 bg-blue-500 text-white text-s py-1 px-1 rounded-lg font-semibold w-full"
                      onClick={() => {
                        setShowEditProductPopup(true);
                        setFormData(initial);
                        setSelectedId(car.productId);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="mt-3 bg-red-500 text-white text-s rounded-lg font-semibold w-full"
                      onClick={() => deleteProduct(car.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popup Modal for the Edit Product Form */}
      {showEditProductPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur"
          onClick={() => {
            setShowEditProductPopup(false);
            setFormData(initial);
          }}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl max-w-4xl mx-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Vehicle</h3>
              <button
                className="text-gray-600"
                onClick={() => {
                  setShowEditProductPopup(false);
                  setFormData(initial);
                }}
              >
                X
              </button>
            </div>
            <form
              className="max-w-4xl mx-auto space-y-4"
              onSubmit={handleEditSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="make"
                  placeholder="Make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="input-style text-base"
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="input-style"
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="input-style w-full"
                />
                <input
                  type="number"
                  min="1"
                  name="year"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="input-style"
                />
                <input
                  type="number"
                  min="1"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input-style"
                />
                <input
                  type="number"
                  min="1"
                  name="mileage"
                  placeholder="Mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="input-style"
                />
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="input-style"
                >
                  <option value="">Select fuel type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="input-style"
                >
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input-style"
                />
                <input
                  type="text"
                  name="sketch"
                  placeholder="3D (SketchfadEmbed)"
                  value={formData.sketch}
                  onChange={handleInputChange}
                  className="input-style w-full"
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg resize-none"
                rows="3"
              />
              <input
                type="text"
                name="imageUrl1"
                placeholder="Image URL 1"
                value={formData.imageUrl1}
                onChange={handleInputChange}
                className="input-style w-full"
              />
              <input
                type="text"
                name="imageUrl2"
                placeholder="Image URL 2"
                value={formData.imageUrl2}
                onChange={handleInputChange}
                className="input-style w-full"
              />
              <input
                type="text"
                name="imageUrl3"
                placeholder="Image URL 3"
                value={formData.imageUrl3}
                onChange={handleInputChange}
                className="input-style w-full"
              />
              <button
                type="submit"
                className="mt-4 bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 font-semibold w-full text-lg"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showMessageModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowMessageModal(false)}
        >
          <div
            className="bg-white w-full max-w-4xl h-[80vh] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conversations List (Left Panel) */}
            <div className="w-full md:w-1/3 border-r p-4 bg-gray-50 overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Conversations</h3>
              {conversations.length === 0 ? (
                <p className="text-gray-500 text-sm">No conversations yet.</p>
              ) : (
                <ul>
                  {conversations.map((conv) => (
                    <li
                      key={conv.id}
                      className={`p-3 my-2 rounded cursor-pointer ${
                        selectedConversation?.conversationId === conv.id
                          ? "bg-purple-100 border-l-4 border-purple-500"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        loadMessages(conv.id, conv.buyer.userId);
                      }}
                    >
                      <strong>
                        Buyer: #{conv.buyer.userId}
                      </strong>
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage || "Start chatting..."}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Messages View (Right Panel) */}
            <div className="w-full md:w-2/3 flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">
                  {selectedConversation
                    ? `Chat with Buyer #${selectedConversation.buyerId}`
                    : "Select a Conversation"}
                </h3>
                <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setShowMessageModal(false)}
                >
                  ×
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-100">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center mt-10">
                    No messages yet.
                  </p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-sm ${
                        msg.senderId === user?.userId
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

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!input.trim() || !selectedConversation) return;
                    sendMessage(input);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                    disabled={!selectedConversation}
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    disabled={!selectedConversation}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
