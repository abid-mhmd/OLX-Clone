import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FooterBottom from "../components/layout/FooterBottom";
import Alert from "../components/common/Alert";

import { uploadImages } from "../services/clooudinaryService";
import {
  getProduct,
  updateProduct,
} from "../services/productService";

function EditAd() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [previewImages, setPreviewImages] = useState([]);

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

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    try {
      const product = await getProduct(id);

      if (!product) {
        navigate("/my-ads");
        return;
      }

      setFormData({
        title: product.title,
        category: product.category,
        price: product.price,
        location: product.location,
        description: product.description,
        images: product.images || [],
      });

      setPreviewImages(product.images || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));

    setPreviewImages(
      files.map((file) => URL.createObjectURL(file))
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      let imageUrls = formData.images;

      if (
        formData.images.length &&
        formData.images[0] instanceof File
      ) {
        imageUrls = await uploadImages(formData.images);
      }

      await updateProduct(id, {
        title: formData.title,
        category: formData.category,
        price: Number(formData.price),
        location: formData.location,
        description: formData.description,
        images: imageUrls,
      });

      setAlert({
        show: true,
        type: "success",
        message: "Ad Updated Successfully",
      });

      setTimeout(() => {
        navigate("/my-ads");
      }, 1500);
    } catch (error) {
      console.log(error);

      setAlert({
        show: true,
        type: "error",
        message: "Failed to Update Ad",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />

        <div className="min-h-screen flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
          onClose={() =>
            setAlert({
              ...alert,
              show: false,
            })
          }
        />
      )}

      <div className="max-w-4xl !mx-auto !py-10 !px-5">

        <div className="bg-white rounded-xl shadow !p-8">

          <h1 className="text-3xl font-bold !mb-8">
            Edit Ad
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product Title"
              className="w-full border rounded !p-3"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded !p-3"
            >
              <option>Cars</option>
              <option>Motorcycles</option>
              <option>Mobile Phones</option>
              <option>Furniture</option>
              <option>Electronics</option>
            </select>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border rounded !p-3"
            />

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border rounded !p-3"
            />

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border rounded !p-3"
            />

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 !gap-4">

                {previewImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="w-full h-32 object-cover rounded border"
                  />
                ))}

              </div>
            )}

            <button
              disabled={saving}
              className="w-full bg-blue-600 text-white !py-3 rounded-lg font-semibold"
            >
              {saving ? "Updating..." : "Update Ad"}
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default EditAd;