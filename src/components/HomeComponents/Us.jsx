import BrandCard from "./BrandCard";
import ChooseUsCard from "./ChooseUsCard";

function Us(params) {
    return(
        <div className="w-[70vh] mx-auto py-12 h-auto">
            <h1 className="text-2xl text-b font-bold">{params.title}</h1>
            <div className="flex gap-9.5 m-5">
                {params.showChooseUs && (
                    <>
                        <ChooseUsCard />
                        <ChooseUsCard />
                    </>
                )}
                {params.showBrand && (
                    <>
                        <BrandCard />
                        <BrandCard />
                    </>
                )}
            </div>
        </div>
    )
}
export default Us;