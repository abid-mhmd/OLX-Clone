import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FooterBottom from "../components/layout/FooterBottom";
import Alert from "../components/common/Alert";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { useAuth } from "../hooks/useAuth";
import { deleteProduct, getUserProducts } from "../services/productService";

function MyAds() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectId, setSelectId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    if (user?.uid) {
      loadProducts();
    }
  }, [user]);

  async function loadProducts() {
    try {
      const data = await getUserProducts(user.uid);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(selectId);
      setProducts((prev) => prev.filter((item) => item.id !== selectId));
      setAlert({
        show: true,
        type: "success",
        message: "Ad Deleted Successfully",
      });
    } catch (error) {
      console.error(error);
      setAlert({ show: true, type: "error", message: "Failed to Delete" });
    } finally {
      setShowDialog(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center bg-[#f2f4f5]">
          <div className="w-10 h-10 border-4 border-[#3A77FF] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      {showDialog && (
        <ConfirmDialog
          title="Delete Ad"
          message="Are you sure you want to delete this ad?"
          onCancel={() => setShowDialog(false)}
          onConfirm={handleDelete}
        />
      )}
      <div className="bg-[#f2f4f5] min-h-screen !py-10 !px-6 sm:px-10">
        <div className="max-w-[1240px] !mx-auto">
          <div className="flex justify-between items-center !mb-8">
            <h1 className="text-[32px] font-bold text-[#002f34]">My Ads</h1>
            <Link
              to="/post-ad"
              className="bg-[#3A77FF] text-white !px-5 h-[48px] rounded-md font-bold text-[15px] flex items-center justify-center hover:bg-blue-600 transition shadow-sm"
            >
              + Post New Ad
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center !py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#002f34]">
                No Ads Found
              </h2>
              <p className="text-gray-500 !mt-2">
                Start selling by posting your first ad.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 !gap-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-300/70 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full h-[165px] bg-gray-50 overflow-hidden">
                      <img
                        src={product.images?.[0] || "placeholder.png"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="!p-4 !pb-2">
                      <h2 className="text-[20px] font-bold text-[#002f34] leading-tight">
                        ₹ {Number(product.price).toLocaleString("en-IN")}
                      </h2>
                      <h3 className="text-[15px] text-gray-700 !mt-1 font-normal line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-400 !mt-1">
                        {product.date || "29 Jun 2026"}
                      </p>
                    </div>
                  </div>

                  <div className="flex !gap-2 !p-4 !pt-0 !mt-2">
                    <Link
                      to={`/edit-ad/${product.id}`}
                      className="flex-1 h-[36px] border border-[#3A77FF] text-[#3A77FF] rounded-md flex justify-center items-center gap-1.5 font-medium text-[14px] hover:bg-blue-50/50 transition bg-white"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setSelectId(product.id);
                        setShowDialog(true);
                      }}
                      className="flex-1 h-[36px] border border-rose-400 text-rose-500 rounded-md flex justify-center items-center gap-1.5 font-medium text-[14px] hover:bg-rose-50/50 transition bg-white"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyAds;
