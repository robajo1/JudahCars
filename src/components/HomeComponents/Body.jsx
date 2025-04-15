import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const BrandIcon = ({ logo, name ,navigate}) => (
  <div className="flex flex-col items-center space-y-2" onClick={() => {
    navigate(`/products?make=${name.toLowerCase()}`);
  }}>
    <img src={logo} alt={name} className="w-12 h-12 object-contain" />
    <span className="text-sm text-gray-600">{name}</span>
  </div>
);

const VehicleCard = ({ image, title, price, year, mileage ,car,navigate}) => (
    
  <div className="w-72 rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
    <img src={image} alt={title} className="h-40 w-full object-cover" />
    <div className="p-4 space-y-1">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{year} • {mileage} km</p>
      <p className="text-indigo-600 font-bold text-lg">{price}</p>
      <button className="mt-2 px-4 py-1 bg-indigo-500 text-white rounded-full text-sm hover:bg-indigo-600" onClick={() => {navigate("/detail", { state: { car } })}}>
        View Details
      </button>
    </div>
  </div>
);

export default function Body() {
   

const [cars, setCars] = useState([]);

useEffect(() => {
  fetch("/data/carInventory.json")
    .then((res) => res.json())
    .then((data) => setCars(data.slice(0, 4)))
    .catch((err) => console.error("Error loading car data:", err));
}, []);

    const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-10">
      {/* Premium Brands */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Explore Our Premium Brands</h2>
        <div className="flex gap-20 items-center overflow-x-auto p-10">
          {[
            { name: "Audi", logo: "https://cdn.worldvectorlogo.com/logos/audi-14.svg" },
            { name: "BMW", logo: "https://cdn.worldvectorlogo.com/logos/bmw.svg" },
            { name: "Ford", logo: "https://cdn.worldvectorlogo.com/logos/ford.svg" },
            { name: "Mitsubishi", logo: "https://cdn.worldvectorlogo.com/logos/mitsubishi.svg" },
            { name: "Tesla", logo: "https://cdn.worldvectorlogo.com/logos/tesla-motors.svg" },
            { name: "Volkswagen", logo: "https://cdn.worldvectorlogo.com/logos/volkswagen-9.svg" },
          ].map((brand) => (
            <BrandIcon key={brand.name} {...brand} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* All Vehicles */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Explore All Vehicles</h2>
          <a href="/products" className="text-indigo-600 hover:underline text-sm font-medium">View All</a>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
            {cars.map((car, index) => (
                <VehicleCard

                key={index}
                image={car.images[0]}
                title={`${car.make} ${car.model} - ${car.year}`}
                price={`${car.price.toLocaleString()} ETB`}
                year={car.year}
                mileage={`${car.mileage.toLocaleString()}K`}
                car={car}
                navigate={navigate}
                />
            ))}
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-10 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-purple-600 text-3xl mb-3">💸</div>
            <h4 className="font-semibold mb-2">Special Financing Offers</h4>
            <p className="text-sm text-gray-600">Get access to exclusive loan deals and flexible payment options.</p>
          </div>
          <div>
            <div className="text-purple-600 text-3xl mb-3">🏢</div>
            <h4 className="font-semibold mb-2">Trusted Car Dealership</h4>
            <p className="text-sm text-gray-600">Our verified dealers ensure safe and quality vehicle purchases.</p>
          </div>
          <div>
            <div className="text-purple-600 text-3xl mb-3">📊</div>
            <h4 className="font-semibold mb-2">Transparent Pricing</h4>
            <p className="text-sm text-gray-600">Clear, upfront pricing—no hidden charges, ever.</p>
          </div>
          <div>
            <div className="text-purple-600 text-3xl mb-3">🛠️</div>
            <h4 className="font-semibold mb-2">Expert Car Service</h4>
            <p className="text-sm text-gray-600">Top-tier service from certified auto professionals.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-100 p-8 rounded-2xl text-center space-y-4">
          <h3 className="text-lg font-semibold">Are You Looking For a Car ?</h3>
          <p className="text-sm text-gray-600">Search through thousands of listings and find the right one for you.</p>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700" onClick={()=>{navigate("/login")}}>Get Started</button>
        </div>
        <div className="bg-pink-100 p-8 rounded-2xl text-center space-y-4">
          <h3 className="text-lg font-semibold">Do You Want to Sell a Car ?</h3>
          <p className="text-sm text-gray-600">List your car and reach thousands of potential buyers.</p>
          <button className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700" onClick={()=>{navigate("/login")}}>Start Selling</button>
        </div>
      </section>
    </div>
  );
}
