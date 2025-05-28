import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './productsSearch.css';

function ProductsSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inventory, setInventory] = useState([]);

  // Filter dropdown options
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [uniqueModels, setUniqueModels] = useState([]);
  const [uniqueFuels, setUniqueFuels] = useState([]);
  const [uniqueTransmissions, setUniqueTransmissions] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

  // Filter state
  const [condition, setCondition] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [mileage, setMileage] = useState('');
  const [year, setYear] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);

  
  useEffect(() => {
    fetch('http://localhost:9090/api/products')
      .then((res) => res.json())
      .then((data) => {
        setInventory(data);
        setUniqueYears([...new Set(data.map(item => item.year))].sort());
        setUniqueMakes([...new Set(data.map(item => item.make))].sort());
        setUniqueModels([...new Set(data.map(item => item.model))].sort());
        setUniqueFuels([...new Set(data.map(item => item.fuelType))].sort());
        setUniqueTransmissions([...new Set(data.map(item => item.transmission))].sort());
        setUniqueCities([...new Set(
          data.map(item => item.location?.split(',')[0].trim())
        )].filter(Boolean).sort());
      })
      .catch((err) => console.error("Error loading inventory:", err));
  }, []);

  
  const handleFilterSubmit = () => {
    const params = new URLSearchParams();

    if (condition) params.set('condition', condition);
    if (make) params.set('make', make);
    if (model) params.set('model', model);
    if (priceRange) params.set('price', priceRange);
    if (mileage) params.set('mileage', mileage);
    if (year) params.set('year', year);
    if (locationFilter) params.set('location', locationFilter);
    if (fuel) params.set('fuelType', fuel);
    if (transmission) params.set('transmission', transmission);

    navigate(`/products?${params.toString()}`);
  };

  const toggleMoreFilters = () => {
    setMoreFiltersVisible(!moreFiltersVisible);
  };

  const clearFilters=()=>{
    setMake('');
    setModel('');
    setPriceRange('');
    setMileage('');
    setYear('');
    setLocationFilter('');
    setFuel('');
    setTransmission('');
    navigate(`/products`);
  }
  return (
    <div className="products-search-container">
      <div className="filter-bar">
        <select onChange={(e) => setMake(e.target.value)} value={make} className="filter-select">
          <option value="">Any Makes</option>
          {uniqueMakes.map(make => <option key={make} value={make}>{make}</option>)}
        </select>

        <select onChange={(e) => setModel(e.target.value)} value={model} className="filter-select">
          <option value="">Any Models</option>
          {uniqueModels.map(model => <option key={model} value={model}>{model}</option>)}
        </select>

        <select onChange={(e) => setPriceRange(e.target.value)}value={priceRange} className="filter-select">
          <option value="">Prices: All Prices</option>
          <option value="0-19999">0 - 19,999 ETB</option>
          <option value="20000-49999">20,000 - 49,999 ETB</option>
          <option value="40000-79999">40,000 - 79,999 ETB</option>
          <option value="80000">Above 80,000 ETB</option>
        </select>

        <button className="more-filters-button" onClick={toggleMoreFilters}>
          [More Filters]
        </button>

        <button onClick={handleFilterSubmit} className="find-listing-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="search-icon">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          Find Listing
        </button>
        <button className='clear-filters-button' onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {moreFiltersVisible && (
        <div className="more-filters">
          <select onChange={(e) => setMileage(e.target.value)}value={mileage} className="filter-select">
            <option value="">Mileage: Any</option>
            <option value="0-50000">0 - 50,000 KM</option>
            <option value="50001-100000">50,001 - 100,000 KM</option>
            <option value="100001-150000">100,001 - 150,000 KM</option>
            <option value="150001-above">150,001+ KM</option>
          </select>

          <select onChange={(e) => setYear(e.target.value)}value={year} className="filter-select">
            <option value="">Year: Any</option>
            {uniqueYears.map(year => <option key={year} value={year}>{year}</option>)}
          </select>

          <select onChange={(e) => setLocationFilter(e.target.value)}value={location} className="filter-select">
            <option value="">Location: Any</option>
            {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>

          <select onChange={(e) => setFuel(e.target.value)}value={fuel} className="filter-select">
            <option value="">Fuel: Any</option>
            {uniqueFuels.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
          </select>

          <select onChange={(e) => setTransmission(e.target.value)}value={transmission} className="filter-select">
            <option value="">Transmission: Any</option>
            {uniqueTransmissions.map(trans => <option key={trans} value={trans}>{trans}</option>)}
          </select>
        </div>
      )}
    </div>
  );
}

export default ProductsSearch;
