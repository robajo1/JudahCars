import Body from "../components/HomeComponents/Body";
import Search from "../components/HomeComponents/Search";

function Home() {
  return (
    <>
      <img
        src="/HomeCar.png"
        alt=""
        className="h-[80vh] w-screen object-cover"
      />
      <Search />
      <Body />
    </>
  );
}
export default Home;
