import Us from "./Us"

function Body() {
    return(
        <div className="h-auto w-screen  flex flex-col  justify-center items-center">
            <Us title="Explore Our Premium Brands" showBrand={true}/>
            <Us title="Explore all Vehicels" showVehicels={true}/>
            <Us title="Why Choose Us" showChooseUs={true}/>
        </div>
    )
}
export default Body