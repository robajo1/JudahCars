import Body from "../components/HomeComponents/Body";
import Search from "../components/HomeComponents/Search";
import "./home.css";

function Home() {
  return (
    <>
      <img src="/HomeCar.png" alt="" className="home-hero-image"/>
     
      <Search />
      <Body />
    
    </>
  );
}
export default Home;
