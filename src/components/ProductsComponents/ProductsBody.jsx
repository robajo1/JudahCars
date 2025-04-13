import React, { useEffect, useState } from "react";

function ProductsBody() {
    const [inventory, setInventory] = useState(null);

    useEffect(() => {
        fetch("/data/carInventory.json")
          .then((res) => res.json())
          .then((data) => setInventory(data))
          .catch((err) => console.error("Error loading car inventory:", err));
      }, []);
    
      if (!inventory) return <p>Loading...</p>;

      <div className=" m-5  h-auto ">
      <h1 className="text-2xl text-b font-bold  ">
          Explore All Vehicles
      </h1>


      
  </div>  
    return (
        <div className=" m-5  h-auto ">
            <h1 className="text-2xl text-b font-bold text-center ">
                Explore All Vehicles
            </h1>
            <div className="grid grid-cols-1 gap-4 mx-2 mt-8 "> 

                {Object.entries(inventory.categories).map(([category, brands]) => (
                    <div key={category } >
                        <h2 className="text-4xl font-bold ">{category}</h2>
                        {Object.entries(brands).map(([brand, cars]) => (
                        <div key={brand} className="m-7">
                            <h3>{brand}</h3>
                            <div className="grid grid-cols-3 gap-4 mx-2 mt-8 ">
                                {cars.map((car) => (
                                    <div key={car.id} className="bg-gray-100 rounded-lg shadow-md p-4 mb-2 flex flex-col items-center">
                                        <img src={car.images[0]} alt={car.model} className="h-32 w-32 object-cover mb-2" />
                                        <h4>Model: {car.model}</h4>
                                        <p>Price: {car.price}$</p>
                                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                            View Details
                                        </button>
                                    </div>
                                    
                                    
                                ))}
                            </div>
                            
                        </div>
                        ))}
                    </div>
                ))}

                
            </div>
        </div>

        
        

    );
}
export default ProductsBody;