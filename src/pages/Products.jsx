import ProductsSearch from "../components/ProductsComponents/ProductsSearch";
import ProductsBody from "../components/ProductsComponents/ProductsBody";
import React, { useState, useEffect } from 'react';
import "./products.css";
import adsData from './adsData.json';

function Products() {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const nextAd = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adsData.length);
      };
    
      const prevAd = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex - 1 + adsData.length) % adsData.length);
      };
    
      const currentAd = adsData[currentAdIndex];
    return(
        <>
        
            <div className="ad-banner-container">
                {currentAd && (
                  <div className="ad-banner-item">
                    <img src={currentAd.image} alt={`${currentAd.brand} ${currentAd.model} Ad`} className="ad-banner-image" />
                    <div className="ad-banner-details">
                      <span className="ad-banner-price">{currentAd.priceETB.toLocaleString()} ETB</span>
                      <h2 className="ad-banner-title">{`${currentAd.brand}, ${currentAd.model}`}</h2>
                      <div className="ad-banner-specs">
                        <span>{currentAd.fuelType}</span> | <span>{currentAd.km} KM</span> | <span>{currentAd.transmission}</span>
                      </div>
                    </div>
                    <button className="ad-banner-toggle left" onClick={prevAd}>
                      &lt;
                    </button>
                    <button className="ad-banner-toggle right" onClick={nextAd}>
                      &gt;
                    </button>
                  </div>
                )}
            </div>

            <ProductsSearch />
            <ProductsBody />
            <img className='ADD' src="./images/ADD.png" alt="" />
        </>
    )
}
export default Products;