import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './products.css';

function ProductsBody() {
  const headingRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [inventory, setInventory] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const typeFilter = searchParams.get('type');
  const fuelFilter = searchParams.get('fuel');
  const makeFilter = searchParams.get('make');
  const transmissionFilter = searchParams.get('transmission');
  const priceRange = searchParams.get('price');

  useEffect(() => {
    fetch("/data/carInventory.json")
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("Error loading car inventory:", err));
  }, []);

  useEffect(() => {
    if (inventory && headingRef.current) {
      headingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [inventory]);

  const navigateToDetail = (car) => {
    navigate("/detail", { state: { car } });
  };

  if (!inventory) return <p>Loading...</p>;

  let filteredInventory = [...inventory];

  if (typeFilter) {
    filteredInventory = filteredInventory.filter(
      (car) => car.type.toLowerCase() === typeFilter.toLowerCase()
    );
  }

  if (fuelFilter) {
    filteredInventory = filteredInventory.filter(
      (car) => car.fuel_type.toLowerCase() === fuelFilter.toLowerCase()
    );
  }

  if (transmissionFilter) {
    filteredInventory = filteredInventory.filter(
      (car) => car.transmission.toLowerCase() === transmissionFilter.toLowerCase()
    );
  }
  if (makeFilter) {
    filteredInventory = filteredInventory.filter(
      (car) => car.make.toLowerCase() === makeFilter.toLowerCase()
    );
  }


  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    filteredInventory = filteredInventory.filter(
      (car) => car.price >= min && car.price <= max
    );
  }

  if (filteredInventory.length === 0) {
    return <p className="no-vehicles-found">No vehicles found matching the filters.</p>;
  }

  return (
    <div className="products-vehicles-section">
      <h2 ref={headingRef} className="section-title">Explore All Vehicles</h2>

      <div className="vehicle-grid-4x4">
        {filteredInventory.map((car, index) => (
          <div
            key={index}
            className="vehicle-card"
            onClick={() => navigateToDetail(car)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={car.images[0]}
              alt={car.model}
              className="vehicle-image"
            />
            <div className="vehicle-details">
              <h3>{car.make} {car.model}</h3>
              <p className="vehicle-description">
                {car.year} • {car.mileage.toLocaleString()} miles
              </p>
              Lingan guli guli Lingan guli <br />
              wacha lingan gu
              <div className="vehicle-price">
                <span>${car.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsBody;