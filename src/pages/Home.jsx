import CategoryBar from "../components/home/CategoryBar";
import CategorySection from "../components/home/CategorySection";
import ProductList from "../components/home/ProductList";
import Footer from "../components/layout/Footer";
import FooterBottom from "../components/layout/FooterBottom";
import Header from "../components/layout/Header";
function Home() {
  return (
    <div className="bg-white">
      <Header />
      <CategoryBar />
      <CategorySection />
      <ProductList />
      <Footer />
      <FooterBottom />
    </div>
  );
}

export default Home;
