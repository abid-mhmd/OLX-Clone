import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Alert from "../components/common/Alert";
import { uploadImages } from "../services/cloudinaryService";

const categories = [
  "Cars",
  "Bikes",
  "Properties",
  "Mobiles",
  "Services",
  "Furniture",
  "Pets",
  "Others",
];

export default function EditAd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    location: "",
  });

  // Fetch existing ad data
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            title: data.title || "",
            price: data.price || "",
            description: data.description || "",
            category: data.category || "",
            location: data.location || "",
          });
          setPreviews(data.images || (data.img ? [data.img] : []));
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.category || !form.location) {
      setAlert({
        show: true,
        message: "Please fill all required fields!",
        type: "warning",
      });
      return;
    }

    setSaving(true);

    try {
      let imageUrls = previews;

      // Upload only if user selected new images
      if (images.length > 0) {
        imageUrls = await uploadImages(images);
      }

      await updateDoc(doc(db, "products", id), {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        location: form.location,
        images: imageUrls,
        img: imageUrls[0] || "",
      });

      setAlert({
        show: true,
        message: "Ad updated successfully!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/my-ads");
      }, 1200);
    } catch (error) {
      console.error("Error updating ad:", error);

      setAlert({
        show: true,
        message: "Failed to update ad",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#f2f4f5] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#3a77ff] border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f2f4f5] !py-10 !px-4">
        <div className="max-w-[740px] !mx-auto bg-white rounded-2xl border border-gray-200/70 !p-10 shadow-sm">
          <h1 className="text-[32px] font-bold text-[#002f34] !mb-8">
            Edit Ad
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[14px] text-gray-800 font-normal !mb-2">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full h-[48px] bg-white border border-gray-300 rounded-[4px] !px-4 text-[15px] text-[#002f34] outline-none focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%235a6872%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_16px_center] bg-no-repeat"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[14px] text-gray-800 font-normal !mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. iPhone 13 Pro Max 256GB"
                className="w-full h-[48px] border border-gray-300 rounded-[4px] !px-4 text-[15px] text-[#002f34] outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-[14px] text-gray-800 font-normal !mb-2">
                Price *
              </label>
              <div className="flex items-center w-full h-[48px] border border-gray-300 rounded-[4px] !px-4 text-[15px] text-[#002f34] focus-within:border-blue-500">
                <span className="text-gray-500 !mr-3">₹</span>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="flex-1 h-full outline-none text-[#002f34] bg-transparent placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] text-gray-800 font-normal !mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your item..."
                className="w-full border border-gray-300 rounded-[4px] !p-4 text-[15px] text-[#002f34] outline-none focus:border-blue-500 placeholder-gray-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-[14px] text-gray-800 font-normal !mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Kozhikode, Kerala"
                className="w-full h-[48px] border border-gray-300 rounded-[4px] !px-4 text-[15px] text-[#002f34] outline-none focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-[14px] text-gray-800 font-normal !mb-2">
                Images
              </label>
              {previews.length > 0 && (
                <div className="flex !gap-2 !mb-3 flex-wrap">
                  {previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="w-full border border-dashed border-gray-300 rounded-[4px] !px-4 !py-4 text-sm text-gray-400 bg-white cursor-pointer file:hidden"
              />
              <p className="text-xs text-gray-400 !mt-1.5">
                Upload new images to replace existing ones
              </p>
            </div>

            <div className="flex !gap-4 !pt-4 justify-end">
              <button
                type="button"
                onClick={() => navigate("/My-Ads")}
                className="w-[180px] h-[48px] border border-[#002f34] text-[#002f34] font-semibold rounded-[4px] text-[15px] hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-[220px] h-[48px] bg-[#3a77ff] hover:bg-blue-600 text-white font-bold rounded-[4px] text-[15px] transition disabled:opacity-60 shadow-sm"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
    </>
  );
}
