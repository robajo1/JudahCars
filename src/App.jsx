import Home from "./pages/Home"
import Products from "./pages/Products"
import AboutUs from "./pages/About us"
import Header from "./components/Header"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import NoPage from "./pages/NoPage"
import Footer from "./components/Footer"
import DetailsBody from "./components/DetailComponents/DetailsBody"
import LoginRegister from "./pages/LoginRegiste"
function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="detail" element={<DetailsBody />} />
            <Route path="login" element={<LoginRegister />} />
            <Route path="register" element={<LoginRegister />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />

    </>
  )
}

export default App
