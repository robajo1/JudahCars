import ProductsSearch from "../components/ProductsComponents/ProductsSearch";
import ProductsBody from "../components/ProductsComponents/ProductsBody";
function Products() {
    return(
        <>
            <img src="/ProductCar.png" alt="" className="h-[80vh]   w-screen " />
            <ProductsSearch />
            <ProductsBody />
        </>
    )
}
export default Products;