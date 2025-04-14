import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ProductsSearch() {
  const navigate = useNavigate();
  const location = useLocation();

  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [km, setKM] = useState('');

  const handleFilterSubmit = () => {
    const params = new URLSearchParams(location.search);

    if (fuel) params.set('fuel', fuel);
    else params.delete('fuel');

    if (transmission) params.set('transmission', transmission);
    else params.delete('transmission');

    if (priceRange) params.set('price', priceRange);
    else params.delete('price');

    if (km) params.set('km', km);
    else params.delete('km');

    navigate(`/products?${params.toString()}`);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-7xl mx-auto mt-10">
      <div className="flex flex-wrap gap-4 items-center justify-between">


        <select onChange={(e) => setPriceRange(e.target.value)} className="min-w-[200px] p-2 border rounded-lg">
          <option value="">All Prices</option>
          <option value="0-500000">0 - 500,000 ETB</option>
          <option value="500001-1000000">500,001 - 1,000,000 ETB</option>
          <option value="1000001-2000000">1,000,001 - 2,000,000 ETB</option>
          <option value="2000001-5000000">2,000,001 - 5,000,000 ETB</option>
        </select>

        <select onChange={(e) => setTransmission(e.target.value)} className="min-w-[160px] p-2 border rounded-lg">
          <option value="">Transmission: Any</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

        <select onChange={(e) => setFuel(e.target.value)} className="min-w-[150px] p-2 border rounded-lg">
          <option value="">Fuel: Any</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        

        <button
          onClick={handleFilterSubmit}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
        >
          Find Listing
        </button>
      </div>
    </div>
  );
}

export default ProductsSearch;
