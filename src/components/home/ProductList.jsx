import ProductCard from "./ProductCard";
import { products } from "../../utils/constants";
import { exp } from "firebase/firestore/pipelines";

function ProductList() {
  return (
    <section className="max-w-7xl !mx-auto !px-5 !py-10">
      <h2 className="text-2xl font-bold !mb-6">Fresh Recomentation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 !gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
