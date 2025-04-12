import Us from "../HomeComponents/Us";

function ProductsBody() {
    return (
        <div className=" m-5  h-auto ">
            <h1 className="text-2xl text-b font-bold  ">
                Explore All Vehicles
            </h1>
            <div class="grid grid-cols-5 gap-4 mx-2 mt-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"> 
                {/* we used Array.from because we can't use for loop iside here not allowed */}
                {Array.from({ length: 20 }).map((_, index) => (
                    <div className="bg-white rounded-lg shadow-md p-4  flex flex-col items-center" key={index}>
                        <img
                            src="/ProductCar.png"
                            alt=""
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <h2 className="text-lg font-semibold mt-2">Product {index + 1}</h2>
                        <p className="text-gray-600">Description of Product {index + 1}</p>
                        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>

        
        

    );
}
export default ProductsBody;