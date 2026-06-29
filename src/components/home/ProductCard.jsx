import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
    >
      <div className="relativ">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 object-cover"
        />
        <button className="absolute !top-3 !right-3 bg-white rounded-full !p-2">
          <IoHeartOutline size={20} />
        </button>
      </div>
      <div className="!p-4">
        <h2 className="font-bold text-xl">₹{product.price.toLocaleString()}</h2>
        <p className="!mt-2 text-gray-700">{product.title}</p>
        <div className="flex justify-between !mt-5 text-xs text-gray-500">
          <span>{product.location}</span>
          <span>{product.date}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;