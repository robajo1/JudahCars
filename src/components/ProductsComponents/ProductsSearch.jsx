function ProductsSearch() {
    return (
        <div className="flex items-center justify-center w-full">
            <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-2 border border-gray-300 rounded m-2.5"
            />
        </div>
    );
}
export default ProductsSearch;