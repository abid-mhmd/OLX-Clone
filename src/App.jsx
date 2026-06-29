import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import PostAd from "./pages/PostAd";
import MyAds from "./pages/MyAds";
import NotFound from "./pages/NoFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { exp } from "firebase/firestore/pipelines";
import ProtectedRoute from "./components/auth/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/post-ad"
          element={
            <ProtectedRoute>
              <PostAd />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-ads"
          element={
            <ProtectedRoute>
              <MyAds />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
