import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductsBody() {
  const navigate = useNavigate();
  const location = useLocation();

  const [inventory, setInventory] = useState(null);

  // 🔧 Step 1: Store refs for each category dynamically
  const categoryRefs = useRef({});

  useEffect(() => {
    fetch("/data/carInventory.json")
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("Error loading car inventory:", err));
  }, []);

  // 🔍 Step 2: Scroll to category based on URL hash
  useEffect(() => {
    if (!inventory) return;
  
    const hash = location.hash?.substring(1); // remove the "#"
    const lowerHash = hash?.toLowerCase();
  
    if (lowerHash && categoryRefs.current[lowerHash]?.current) {
      // Small timeout ensures DOM is rendered
      setTimeout(() => {
        categoryRefs.current[lowerHash].current.scrollIntoView({ behavior: 'smooth' });
      }, 100); // delay just a bit to make sure layout is ready
    }
  }, [location, inventory]);
   // wait for inventory to load too

  const navigateToDetail = () => {
    navigate("/detail");
  };

  if (!inventory) return <p>Loading...</p>;

  return (
    <div className="m-5 h-auto">
      <h1 className="text-2xl font-bold text-center">Explore All Vehicles</h1>

      <div className="grid grid-cols-1 gap-4 mx-2 mt-8">
      {Object.entries(inventory.categories).map(([category, brands]) => {
  const key = category.toLowerCase();

  // If ref doesn't exist yet, create it
  if (!categoryRefs.current[key]) {
    categoryRefs.current[key] = React.createRef();
  }

  return (
    <div key={category}>
      <h2
        ref={categoryRefs.current[key]}
        className="text-4xl font-bold mb-4"
      >
        {category}
      </h2>
      
      {Object.entries(brands).map(([brand, cars]) => (
        <div key={brand} className="m-7">
          <h3>{brand}</h3>
          <div className="grid grid-cols-3 gap-4 mx-2 mt-8">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-gray-100 rounded-lg shadow-md p-4 mb-2 flex flex-col items-center"
              >
                <img
                  src={car.images[0]}
                  alt={car.model}
                  className="h-32 w-32 object-cover mb-2"
                />
                <h4>Model: {car.model}</h4>
                <p>Price: {car.price}$</p>
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={navigateToDetail}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
})}

      </div>
    </div>
  );
}

export default ProductsBody;
