import React, { useRef,useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductsBody() {
  const headingRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [inventory, setInventory] = useState(null);


  const searchParams = new URLSearchParams(location.search);
  const typeFilter = searchParams.get('type'); 

  useEffect(() => {
    fetch("/data/carInventory.json")
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("Error loading car inventory:", err));
  }, []);
  if(typeFilter !== null){
    useEffect(() => {
      if (inventory && headingRef.current) {
        headingRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [inventory]);
  }

  const navigateToDetail = (car) => {
    navigate("/detail",{state: { car } });
  };

  if (!inventory) return <p>Loading...</p>;


  const filteredInventory = typeFilter
    ? inventory.filter(car => car.type.toLowerCase() === typeFilter.toLowerCase())
    : inventory;

  if (filteredInventory.length === 0) {
    return <p>No vehicles found for the selected type.</p>;
  }

  return (
    <div className="m-5 h-auto">
      <h1 ref={headingRef} className="text-2xl font-bold text-center">Explore All Vehicles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredInventory.map((car, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={car.images[0]}
              alt={car.model}
              className="h-40 w-full object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold mb-1">{car.make} {car.model} ({car.year})</h2>
            <p className="text-gray-600 mb-1">Type: {car.type}</p>
            <p className="text-gray-600 mb-1">Fuel: {car.fuel_type}</p>
            <p className="text-gray-600 mb-1">Transmission: {car.transmission}</p>
            <p className="text-gray-600 mb-1">Mileage: {car.mileage.toLocaleString()} miles</p>
            <p className="text-blue-600 font-bold mb-2">${car.price.toLocaleString()}</p>
            <button
              className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={()=> navigateToDetail(car)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductsBody;