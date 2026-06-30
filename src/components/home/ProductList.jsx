import ProductCard from "./ProductCard";
import { getProducts } from "../../services/productService";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import LoginModal from "../auth/LoginModal";

function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleStartSellingClick = () => {
    if (user) {
      navigate("/post-ad");
    } else {
      setShowLogin(true);
    }
  };

  const filteredProductes =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="max-w-7xl !mx-auto !px-5 !py-10">
      <h2 className="text-2xl font-bold !mb-6">Fresh Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 !gap-6">
        {filteredProductes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        <div className="bg-[#3A77FF] rounded-2xl shadow text-white flex flex-col justify-center items-center text-center !p-6 min-h-[250px]">
          <h3 className="text-2xl font-bold !mb-3 leading-tight px-4">
            Want to see your stuff here?
          </h3>
          <p className="text-sm font-light !mb-6 max-w-[220px] opacity-90">
            Make some extra cash by selling things in your community.
          </p>
          <button
            onClick={handleStartSellingClick}
            className="border-2 border-white bg-transparent hover:bg-white hover:text-[#3A77FF] transition text-white font-semibold rounded-lg !py-2.5 !px-6 text-sm"
          >
            Start selling
          </button>
        </div>
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </section>
  );
}

export default ProductList;
