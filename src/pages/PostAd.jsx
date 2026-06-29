import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../services/clooudinaryService";
import { createProduct } from "../services/productService";
import { validateProduct } from "../utils/validation";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FooterBottom from "../components/layout/FooterBottom";
import Alert from "../components/common/Alert";

function PostAd() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    location: "",
    description: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const error = validateProduct(formData);
    if (error) {
      setAlert({ show: true, type: "error", message: error });
      return;
    }
    try {
      setLoading(true);
      const imageUrls = await uploadImages(formData.images);
      await createProduct({
        title: formData.title,
        category: formData.category, 
        price: Number(formData.price),
        location: formData.location,
        description: formData.description,
        images: imageUrls,
        userId: user?.uid ,
        userName: user?.displayName || "User",
        userPhoto: user?.photoURL || "",
        date: new Date().toLocaleDateString(),
      });
      setAlert({
        show: true,
        type: "success",
        message: "Product Added Successfully",
      });
      setTimeout(() => {
        navigate("/my-ads");
      }, 1500);
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "Failed to Add Product",
      });
    } finally {
      setLoading(false);
    }
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

      <div className="bg-[#f2f4f5] min-h-screen !py-10 !px-4 font-sans select-none">
        <div className="max-w-[770px] !mx-auto bg-white rounded-lg border border-[#cbd5e1]/70 !p-8 sm:p-10 shadow-sm">
          <h1 className="text-[24px] font-bold text-[#002f34] !mb-8 uppercase tracking-wide border-b border-gray-100 !pb-3">
            Post Your Ad
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#002f34] !mb-2">
                Category <span className="text-gray-500 text-xs !ml-0.5">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-[48px] bg-white border border-[#cbd5e1] rounded-md !px-4 outline-none focus:border-[#3A77FF] text-[15px] text-[#002f34] transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%2s')] bg-no-repeat bg-[right_16px_center]"
              >
                <option value="">Select a category</option>
                <option value="Cars">Cars</option>
                <option value="Motorcycles">Motorcycles</option>
                <option value="Mobile Phones">Mobile Phones</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002f34] !mb-2">
                Title <span className="text-gray-500 text-xs !ml-0.5">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. iPhone 13 Pro Max 256GB"
                className="w-full h-[48px] border border-[#cbd5e1] rounded-md !px-4 outline-none focus:border-[#3A77FF] text-[15px] text-[#002f34] placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002f34] !mb-2">
                Price <span className="text-gray-500 text-xs !ml-0.5">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute !left-4 text-gray-500 text-[15px]">₹</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full h-[48px] border border-[#cbd5e1] rounded-md !pl-9 !pr-4 outline-none focus:border-[#3A77FF] text-[15px] text-[#002f34] placeholder-gray-400 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002f34] !mb-2">
                Description
              </label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item..."
                className="w-full border border-[#cbd5e1] rounded-md !p-4 outline-none focus:border-[#3A77FF] text-[15px] text-[#002f34] placeholder-gray-400 transition-all resize-none h-[115px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002f34] !mb-2">
                Location <span className="text-gray-500 text-xs !ml-0.5">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Kozhikode, Kerala"
                className="w-full h-[48px] border border-[#cbd5e1] rounded-md !px-4 outline-none focus:border-[#3A77FF] text-[15px] text-[#002f34] placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002f34] !mb-2">
                Images
              </label>
              <label className="flex flex-col items-center justify-center w-full h-[48px] border border-dashed border-[#cbd5e1] rounded-md cursor-pointer hover:bg-gray-50/50 transition-colors bg-white">
                <span className="text-sm text-gray-500 font-normal">
                  Choose Files <span className="text-gray-400 text-xs !ml-1">No file chosen</span>
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            {previewImages.length > 0 && (
              <div className="grid grid-cols-4 !gap-3 !pt-1">
                {previewImages.map((image, index) => (
                  <div key={index} className="aspect-square w-full rounded-md border border-gray-200 overflow-hidden bg-gray-50">
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="!pt-4">
              <button
                disabled={loading}
                className="w-full h-[48px] bg-[#3A77FF] text-white rounded-md font-bold text-[15px] tracking-wide hover:bg-blue-600 transition-all shadow-sm flex items-center justify-center disabled:opacity-70"
              >
                {loading ? "Posting Ad..." : "Post Ad"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostAd;