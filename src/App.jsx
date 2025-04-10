import Home from "./pages/Home"
import Products from "./pages/Products"
import AboutUs from "./pages/About us"
import Header from "./components/Header"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import NoPage from "./pages/NoPage"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
