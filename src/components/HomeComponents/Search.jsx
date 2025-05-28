import React, { useEffect, useState } from 'react';
import './search.css';
import { useNavigate } from 'react-router-dom';

const Search = ({ showFull = true }) => {
  const user = localStorage.getItem("user");
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
     setTimeout(() => {
      setTaglineVisible(true);
      setTitleVisible(true);
    }, 10);
  }, []);
  useEffect(() => {},[user])

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      const formattedQuery = searchQuery.replace(/\s+/g, '+');
      navigate(`/products?query=${formattedQuery}`);
    } else {
      //navigate('/products');
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?type=${category.toLowerCase()}`);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`search-container ${!showFull ? 'search-input-only-container' : ''}`}>
      {showFull && (
        <>
          <p className={`search-tagline ${taglineVisible ? 'slide-in' : ''}`}>Find cars for sale ~ sale your car ~ swap your car</p>
          <h1 className={`search-title ${titleVisible ? 'slide-in' : ''}`}>{user ? `Welcome ${JSON.parse(user).fullName} ` : "Find Your Perfect Car" }</h1>
        </>
      )}

      <div className={`search-input-group ${!showFull ? 'search-input-group-only' : ''}`}>
        <input
          type="text"
          className={`search-input ${!showFull ? 'search-input-only-field' : ''}`}
          placeholder="Mitsubishi Airtruk EV GMC 2023"
          value={searchQuery}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              {handleSearchClick();}
            }
          }}
          onChange={handleInputChange}
        />
        <button className={`search-button ${!showFull ? 'search-button-only' : ''}`} onClick={handleSearchClick}>
          Search Cars
        </button>
      </div>

      {showFull && (
        <>
          <p className="search-featured-text">Or Browse Featured Model</p>
          <div className="search-tags">
            {['Suv', 'Sedan', 'Hatchback', 'Coupe'].map((cat, index) => (
              <div
                key={index}
                className="tag"
                onClick={() => handleCategoryClick(cat)}
                style={{ cursor: 'pointer' }}
              >
                {cat === 'Suv' && '🚙 '}
                {cat === 'Sedan' && '🚗 '}
                {cat === 'Hatchback' && '🚘 '}
                {cat === 'Coupe' && '🏎️ '}
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;