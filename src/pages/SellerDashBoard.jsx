import React, { useState, useEffect } from "react";

export default function SellerDashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(''); // User input
  const [socket, setSocket] = useState(null); // WebSocket connection

  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);
    

    ws.onopen = () => {
    };
    

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

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuel_type: "",
    transmission: "",
    description: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch("/data/carInventory.json")
      .then((res) => res.json())
      .then((data) => {
        const sellerCars = data.filter(
          (car) =>
            car.seller &&
            car.seller.name === user.fullName &&
            car.seller.contact === user.email
        );
        setProducts(sellerCars);
      })
      .catch((err) => console.error("Error loading inventory:", err));
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not found. Please log in.");
      return;
    }

    const newProduct = {
      ...formData,
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      images: [formData.image],
      seller: {
        name: user.fullName,
        contact: user.email,
        phone: user.phone || "",
      },
    };

    setProducts((prev) => [...prev, newProduct]);

    setFormData({
      make: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      fuel_type: "",
      transmission: "",
      description: "",
      location: "",
      image: "",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Seller Dashboard</h2>

     
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl font-semibold mb-2">Add New Vehicle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="make" placeholder="Make" required value={formData.make} onChange={handleInputChange} className="input-style" />
          <input type="text" name="model" placeholder="Model" required value={formData.model} onChange={handleInputChange} className="input-style" />
          <input type="number" name="year" placeholder="Year" required value={formData.year} onChange={handleInputChange} className="input-style" />
          <input type="number" name="price" placeholder="Price" required value={formData.price} onChange={handleInputChange} className="input-style" />
          <input type="number" name="mileage" placeholder="Mileage" required value={formData.mileage} onChange={handleInputChange} className="input-style" />
          <input type="text" name="fuel_type" placeholder="Fuel Type" required value={formData.fuel_type} onChange={handleInputChange} className="input-style" />
          <input type="text" name="transmission" placeholder="Transmission" required value={formData.transmission} onChange={handleInputChange} className="input-style" />
          <input type="text" name="location" placeholder="Location" required value={formData.location} onChange={handleInputChange} className="input-style" />
        </div>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded-lg resize-none" rows="3" />
        <input type="text" name="image" placeholder="Image URL" required value={formData.image} onChange={handleInputChange} className="input-style w-full" />
        <button type="submit" className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 font-semibold w-full">
          Add Vehicle
        </button>
      </form>
      <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 font-semibold w-full" onClick={() => {setShowMessageModal(true);console.log("hello");}}>Messages</button>


     
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-center">Your Listings</h3>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No vehicles added yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((car, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4">
                <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-40 object-cover rounded-md mb-3" />
                <h4 className="text-lg font-bold">{car.make} {car.model} ({car.year})</h4>
                <p className="text-gray-600">${car.price} - {car.mileage} mi</p>
                <p className="text-gray-500 text-sm">{car.fuel_type} • {car.transmission}</p>
                <p className="text-gray-500 text-sm">{car.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    {showMessageModal && (
      <div className="chat-modal-overlay" onClick={() => setShowMessageModal(false)}>
        <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
          <div className="chat-header">
            <h3>Live Chat</h3>
            <button className="close-chat" onClick={() => setShowMessageModal(false)}>×</button>
          </div>
          <div className="chat-body">
            {/* Example message structure */}
            {messages.map((msg, index) => (
                    <div key={index} className="bubble">{msg}</div>
                ))}

          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    )}  
    </>
      );
}
