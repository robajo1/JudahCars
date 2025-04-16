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
  const makeFilter = searchParams.get('make');
  const modelFilter = searchParams.get('model');
  const yearFilter = searchParams.get('year');
  const priceRange = searchParams.get('price');
  const mileageFilter = searchParams.get('mileage');
  const fuelFilter = searchParams.get('fuel');
  const transmissionFilter = searchParams.get('transmission');
  const locationFilter = searchParams.get('location');
  const queryFilter = searchParams.get('query');

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

  console.log(inventory);
  const navigateToDetail = (car) => {
    navigate("/detail", { state: { car } });
  };

  if (!inventory) return <p>Loading...</p>;

  let filteredInventory = [...inventory];

  
  // const yearFilter = searchParams.get('year');
  // const priceRange = searchParams.get('price');
  // const mileageFilter = searchParams.get('mileage');
  
  if (typeFilter) {
    filteredInventory = filteredInventory.filter(
      (car) => car.type.toLowerCase() === typeFilter.toLowerCase()
    );
  }
  if (makeFilter) {
    filteredInventory = filteredInventory.filter(
      (car) => car.make.toLowerCase() === makeFilter.toLowerCase()
    );
  }
  
  if (modelFilter) {
    filteredInventory = filteredInventory.filter(
      (car) => car.model.toLowerCase() === modelFilter.toLowerCase()
    );
  }
  
  if (queryFilter) {
    filteredInventory = filteredInventory.filter((car) =>
      car.make.toLowerCase().includes(queryFilter) || car.model.toLowerCase().includes(queryFilter)
    );
  }

  if (yearFilter) {
      filteredInventory = filteredInventory.filter(
        (car) => car.year == yearFilter);
    }
  
  
  if (priceRange) {
    if (priceRange === "80001") {
      filteredInventory = filteredInventory.filter(car => Number(car.price) > 80001);
    } 
    else{
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filteredInventory = filteredInventory.filter((car) => {
        const price = Number(car.price);
        return price >= minPrice && price <= maxPrice;
      });
    }
  }
  
  if (mileageFilter) {
    if (mileageFilter === '150001-above') {
      filteredInventory = filteredInventory.filter((car) => car.mileage > 150001);
    } else {
      const [minMileage, maxMileage] = mileageFilter.split('-').map(Number);
      filteredInventory = filteredInventory.filter((car) => {
        const mileage = Number(car.mileage);
        return mileage >= minMileage && mileage <= maxMileage;
      });
    }
  }
  
  if (locationFilter) {
    filteredInventory = filteredInventory.filter(
      (car) => car.location.toLowerCase() === locationFilter.toLowerCase()
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
              <h3>{car.make} {car.model} - {car.year}</h3>
              <div className='line'></div>
              {/* <img src="/images/meter.png" alt="" /> */}
              <p className="vehicle-description">
                {car.mileage.toLocaleString()} KM • {car.fuel_type} • {car.transmission}
              </p>
              <div className='line'></div>
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