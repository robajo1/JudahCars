import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import whyChooseUsData from './whyChooseUsData.json';
import premiumBrandsData from './premiumBrandsData.json';

const BrandIcon = ({ logo, name, navigate }) => (
  <div
    className="brand-card"
    onClick={() => navigate(`/products?make=${name.toLowerCase()}`)}
    style={{ cursor: 'pointer' }}
  >
    <img src={logo} alt={name} className="brand-image" />
    <p className="brand-name">{name}</p>
  </div>
);

const VehicleCard = ({ image, title, price, year, mileage, car, navigate }) => (
  <div
    className="vehicle-card"
    onClick={() => navigate("/detail", { state: { car } })}
    style={{ cursor: 'pointer' }}
  >
    <img src={image || "/default-image.jpg"} alt={title} className="vehicle-image" />
    <div className="vehicle-details">
      <h3>{title}</h3>
      <p className="vehicle-description">{year} • {mileage}</p>
      <div className="vehicle-price">
        <span>{price}</span>
      </div>
    </div>
  </div>
);

export default function Body() {
  const user = localStorage.getItem("user");
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const sectionRefs = useRef([]);

  // Fetch cars from backend
  useEffect(() => {
    fetch("http://localhost:9090/api/products") // Adjust if needed
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch vehicles");
        return res.json();
      })
      .then((data) => setCars(data.slice(0, 4)))
      .catch((err) => console.error("Error loading car data from DB:", err));
  }, []);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (el, index) => {
    sectionRefs.current[index] = el;
  };

  return (
    <>
      <div className="home-sections-container">
        {/* Premium Brands */}
        <div className="home-section" ref={(el) => setSectionRef(el, 0)}>
          <h2 className="section-title">Explore Our Premium Brands</h2>
          <div className="brand-grid">
            {premiumBrandsData.map((brand, i) => (
              <BrandIcon key={i} logo={brand.logo} name={brand.name} navigate={navigate} />
            ))}
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="home-section" ref={(el) => setSectionRef(el, 1)}>
          <h2 className="section-title">Explore all Vehicles</h2>
          <div className="vehicle-grid">
            {cars.map(vehicle => (
              <VehicleCard
                key={vehicle.id || vehicle._id}
                image={vehicle.imageUrl1 || vehicle.imageUrl2 || vehicle.imageUrl3}
                title={`${vehicle.make} ${vehicle.model}`}
                price={`ETB ${vehicle.price?.toLocaleString()}`}
                year={vehicle.year}
                mileage={`${vehicle.mileage?.toLocaleString()} KM`}
                car={vehicle}
                navigate={navigate}
              />
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="home-section" ref={(el) => setSectionRef(el, 2)}>
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="why-choose-grid">
            {whyChooseUsData.map((item, i) => (
              <div key={i} className="why-card">
                <img src={item.image} alt="icon" className="why-icon" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <img src="/images/AD.png" alt="Ad" className="AD" />
      </div>

      {!JSON.parse(user) &&
        <div className="ass">
          <div className="one" ref={(el) => setSectionRef(el, 3)}>
            <div className="one-text">
              <h2>Are you looking for a car?</h2>
              <p>We are committed to providing our customers with exceptional service.</p>
              <button onClick={() => navigate("/login")}>Get Started -</button>
            </div>
            <div className="one-icon">
              <img src="/images/car-icon.png" alt="" />
            </div>
          </div>

          <div className="two" ref={(el) => setSectionRef(el, 4)}>
            <div className="one-text">
              <h2>Do You Want to Sell a Car?</h2>
              <p>We are committed to providing our customers with exceptional service.</p>
              <button onClick={() => navigate("/login")}>Start Selling -</button>
            </div>
            <div className="one-icon">
              <img src="/images/two-icon.png" alt="" />
            </div>
          </div>
        </div>}
    </>
  );
}
