import { useState } from "react";
import CategoryBar from "../components/home/CategoryBar";
import CategorySection from "../components/home/CategorySection";
import ProductList from "../components/home/ProductList";
import Footer from "../components/layout/Footer";
import FooterBottom from "../components/layout/FooterBottom";
import Header from "../components/layout/Header";
function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div className="bg-white">
      <Header />
      <CategoryBar />
      <CategorySection
        selectCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ProductList selectedCategory={selectedCategory} />
      <Footer />
      <FooterBottom />
    </div>
  );
}

export default Home;
