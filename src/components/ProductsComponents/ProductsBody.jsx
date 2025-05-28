import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './products.css';

function ProductsBody() {
  const headingRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let key = 0;

  const searchParams = new URLSearchParams(location.search);
  const typeFilter = searchParams.get('type');
  const makeFilter = searchParams.get('make');
  const modelFilter = searchParams.get('model');
  const yearFilter = searchParams.get('year');
  const priceRange = searchParams.get('price');
  const mileageFilter = searchParams.get('mileage');
  const fuelFilter = searchParams.get('fuelType');
  const querySearch = searchParams.get('query');
  const transmissionFilter = searchParams.get('transmission');

  useEffect(() => {
    const params = new URLSearchParams();
    console.log(querySearch);
    if (querySearch)params.append('query', querySearch);      
    if (typeFilter) params.append('type', typeFilter);
    if (makeFilter) params.append('make', makeFilter);
    if (modelFilter) params.append('model', modelFilter);
    if (yearFilter) params.append('year', yearFilter);
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      params.append('price', max || min);
    }
    if (mileageFilter) {
      const [min, max] = mileageFilter.split('-');
      params.append('mileage', max || min);
    }
    if (fuelFilter) params.append('fuelType', fuelFilter);
    if (transmissionFilter) params.append('transmission', transmissionFilter);

    setLoading(true);
    setError(null);
    console.log(params);
    fetch(`http://localhost:9090/api/products?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setError('Error loading products.');
        setLoading(false);
      });
  }, [location.search]);

  useEffect(() => {
    if (inventory && headingRef.current) {
      headingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [inventory]);

  const navigateToDetail = (car) => {
    navigate("/detail", { state: { car } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!inventory || inventory.length === 0) {
    return <p className="no-vehicles-found">No vehicles found matching the filters.</p>;
  }

  return (
    <div className="products-vehicles-section">
      <h2 ref={headingRef} className="section-title">Explore All Vehicles</h2>

      <div className="vehicle-grid-4x4">
        {inventory.map((car) => (
          <div
            key={key++}
            className="vehicle-card"
            onClick={() => navigateToDetail(car)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={car.imageUrl1}
              alt={car.model}
              className="vehicle-image"
            />
            <div className="vehicle-details">
              <h3>{car.make} {car.model} - {car.year}</h3>
              <div className='line'></div>
              <div className='vehicle-icons'>
                <img src="/images/meter.png" alt="meter" style={{ width: '20px' }} />
                <img src="/images/fuel.png" alt="fuel" style={{ height: '25px', width: 'auto' }} />
                <img src="/images/trans.png" alt="trans" style={{ width: '30px' }} />
              </div>
              <div className="vehicle-description" style={{ display: 'flex', gap: '1.4rem' }}>
                <p>{car.mileage?.toLocaleString()} KM</p>
                <p>{car.fuelType}</p>
                <p>{car.transmission}</p>
              </div>
              <div className='line'></div>
              <div className="vehicle-price">
                <span>${car.price?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsBody;