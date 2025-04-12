

import React from 'react';

const Search = () => {
  return (
    <div className="max-w-4xl mx-auto p-5 text-center font-sans absolute top-[15vh] left-[34vw] w-auto ">
      
      <p className=' text-white font-sans  text-xs my-2'>Find Cars for sake ~ sale your car ~ swap your car</p>
      <h1 className="text-4xl font-bold text-white mb-6">Find Your Perfect Car</h1>
      
      <div className="flex justify-center mb-10">
        <div className="relative flex items-center max-w-2xl w-full">
          <svg
            className="absolute right-5 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Mitsubishi Airtrek EV GMC 2023"
            className="text-white w-full py-4 pl-12 pr-36 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
        </div>
      </div>
      
        <p className="font-semibold text-white text-xs m-10">Or Browse Featured Model</p>
      <div className="flex justify-center gap-8">
        <div className="px-6 py-3 bg-gray-700 rounded-lg text-gray-100 font-medium hover:scale-105 transition duration-300 ease-in-out cursor-pointer ">
          Hatchback
        </div>
        <div className="px-6 py-3 bg-gray-700 rounded-lg text-gray-100 font-medium hover:scale-105 transition duration-300 ease-in-out cursor-pointer ">
          Coupe
        </div>
        <div className="px-6 py-3 bg-gray-700 rounded-lg text-gray-100 font-medium hover:scale-105 transition duration-300 ease-in-out cursor-pointer ">
          Hybrid
        </div>
      </div>
    </div>
  );
};

export default Search;