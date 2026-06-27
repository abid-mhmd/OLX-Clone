import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import PostAd from "./pages/PostAd";
import MyAds from "./pages/MyAds"
import NotFound from "./pages/NoFound";
import { BrowserRouter, Routes ,Route} from "react-router-dom";
import { exp } from "firebase/firestore/pipelines";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/post-ad" element={<PostAd/>}/>
        <Route path="my-ads" element={<MyAds/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App;