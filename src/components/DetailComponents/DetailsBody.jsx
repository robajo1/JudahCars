import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



const brands = [
  {
    name: "Toyota",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732219.png",
  },
  {
    name: "Volkswagen",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882704.png",
  },
  {
    name: "Audi",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882725.png",
  },
  {
    name: "BMW",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882709.png",
  },
  {
    name: "Ford",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882708.png",
  },
  {
    name: "Kia",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882710.png",
  },
  {
    name: "Nissan",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882711.png",
  },
  {
    name: "Tesla",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882712.png",
  },
];

function DetailsBody() {
  const location = useLocation();
  const car = location.state?.car; 

  if(!car) {
    return <p>No car data available.</p>;
  }
  const {
    type,
    make,
    model,
    year,
    price,
    mileage,
    fuel_type,
    transmission,
    description,
    location :carLocation,
    images,
    seller,
  } = car;
 

  return (
    
    <div className="p-6 lg:p-10">
      
      <div className="p-6 lg:p-10 flex flex-col lg:flex-row gap-8">
       
        <div className="w-full lg:w-2/3">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            className="rounded-xl"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Car ${index + 1}`}
                  className="w-full h-[400px] object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        
        <div className="w-full lg:w-1/3 border border-green-500 p-6 rounded-xl">
          <h3 className="text-lg text-gray-600 mb-1">{model}</h3>
          <h1 className="text-2xl font-bold mb-4">{make}</h1>

          <p className="font-semibold text-green-700 mb-1">
           {type.toUpperCase() } | {year}  
          </p>
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="flex gap-2 flex-wrap mb-4 text-sm">
            <span className="bg-gray-100 px-2 py-1 rounded">🚗{fuel_type}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">⚙️ {transmission}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">
              🧭 All-Wheel Drive
            </span>
          </div>

          <p className="text-xl font-bold text-black mb-4">${price}</p>

          <div className="mb-4">
            <p className="text-gray-600">
            mileage:{" "}
              <span className="font-semibold text-black">{mileage} km</span>
            </p>
          </div>

          

          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Added to Cart
          </button>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto mt-8 px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
         
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Seller"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-medium text-sm">{seller.name}</h4>
              <p className="text-gray-500 text-sm">{carLocation}</p>
            </div>
          </div>

          
          <button className="bg-[#0f172a] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#1e293b] transition">
            Message <span className="text-base">↗</span>
          </button>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-700">
            <FaPhoneAlt />
            <span>{seller.phone}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-700">
            <FaEnvelope />
            <span>{seller.contact}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 px-6">
        <h2 className="text-xl font-semibold mb-2">Similar models</h2>
        <p className="text-sm text-gray-500 mb-6">Recent Cars</p>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((item, idx) => (
            <div
              key={idx}
              className="min-w-[250px] max-w-[250px] bg-white border rounded-xl shadow-sm"
            >
              <div className="relative">
                <img
                  src={`https://randomuser.me/api/portraits/men/32.jpg`}
                  alt="Car"
                  className="w-full h-[150px] object-cover rounded-t-xl"
                />
                {(idx === 0 || idx === 3) && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Great Price
                  </span>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-sm mb-1">
                  {
                    [
                      "Toyota Camry New",
                      "T-Cross – 2023",
                      "C-Class – 2023",
                      "Ford Transit – 2021",
                    ][idx]
                  }
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  4.0 D5 PowerPulse Momentum 5dr AWD
                </p>

                <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                  <span>{["20 KM", "15 KM", "50 KM", "2500 KM"][idx]}</span>
                  <span>{["Petrol", "Petrol", "Petrol", "Diesel"][idx]}</span>
                  <span>
                    {["Automatic", "CVT", "Automatic", "Manual"][idx]}
                  </span>
                </div>

                <div className="text-sm font-semibold text-black mb-1">
                  2.2M ETB
                </div>
                <a href="#" className="text-xs text-blue-600 hover:underline">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#D9E0E6] px-6 py-16 rounded-t-3xl">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
         
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-4">
              Explore Our Premium Brands
            </h2>
            <p className="text-gray-600 max-w-md mb-6">
              Exceptetur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est.
            </p>
            <button className="bg-blue-600 text-white px-5 py-2 rounded flex items-center gap-2 mx-auto lg:mx-0 hover:bg-blue-700 transition">
              Show All Brands <FaArrowRight />
            </button>
          </div>

          
          <div className="flex-1 flex flex-wrap justify-center gap-4 relative">
            
            {brands.map((brand, index) => (
              <div
                key={index}
                className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center transition hover:scale-105"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsBody;
