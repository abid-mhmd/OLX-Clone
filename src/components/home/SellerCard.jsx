import { Phone } from "lucide-react";

export default function SellerCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow 1p-5">
      <h2 className="text-lg font-bold !mb-5">Seller Information</h2>
      <div className="flex items-center !gap-3 !mb-5">
        {product.userPhoto ? (
          <img
            src={product.userPhoto}
            alt={product.userName}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#3A77FF] text-white flex items-center justify-center text-xl font-bold">
            {product.userName?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h3 className="font-semibold">{product.userName}</h3>
          <p className="text-sm text-gray-500">Member on OLX</p>
        </div>
      </div>
      <button className="w-full bg-[#3A77FF] hover:bg-blue-700 text-white rounded-lg !py-3 font-semibold flex items-center justify-center !gap-2">
        <Phone size={18} />
        Contact Seller
      </button>
    </div>
  );
}
