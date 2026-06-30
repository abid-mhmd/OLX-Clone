import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Tag } from "lucide-react";
import { db } from "../config/firebase";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SellerCard from "../components/home/SellerCard";
import { getProduct } from "../services/productService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const data = await getProduct(id);

      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />

        <div className="min-h-screen flex justify-center items-center">
          <div className="w-10 h-10 rounded-full border-4 border-[#3A77FF] border-t-transparent animate-spin" />
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />

        <div className="min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold !mb-5">Product Not Found</h1>

          <button
            onClick={() => navigate("/")}
            className="underline text-[#3A77FF]"
          >
            Go Home
          </button>
        </div>

        <Footer />
      </>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.image];

  return (
    <>
      <Header />

      <div className="bg-[#f2f4f5] min-h-screen !py-6">
        <div className="max-w-6xl !mx-auto !px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center !gap-1 !mb-5"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <div className="grid md:grid-cols-3 !gap-6">
            <div className="md:col-span-2 !space-y-5">
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={images[currentImage]}
                    alt={product.title}
                    className="w-full h-96 object-cover"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImage(
                            (currentImage - 1 + images.length) % images.length,
                          )
                        }
                        className="absolute !left-3 top-1/2 -translate-y-1/2 bg-white rounded-full !p-2 shadow"
                      >
                        <ChevronLeft />
                      </button>

                      <button
                        onClick={() =>
                          setCurrentImage((currentImage + 1) % images.length)
                        }
                        className="absolute !right-3 top-1/2 -translate-y-1/2 bg-white rounded-full !p-2 shadow"
                      >
                        <ChevronRight />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex !gap-3 !p-3 overflow-x-auto">
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => setCurrentImage(index)}
                        className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                          currentImage === index
                            ? "border-[#3A77FF]"
                            : "border-transparent"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow !p-5">
                <h2 className="text-3xl font-bold">₹ {product.price}</h2>

                <h1 className="text-xl !mt-2 font-semibold">{product.title}</h1>

                <div className="flex flex-wrap !gap-5 !mt-4 text-gray-500">
                  <span className="flex items-center !gap-1">
                    <Tag size={16} />
                    {product.category}
                  </span>
                  <span className="flex items-center !gap-1">
                    <MapPin size={16} />
                    {product.location}
                  </span>
                  <span className="flex items-center !gap-1">
                    <Calendar size={16} />
                    {product.date}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow !p-5">
                <h2 className="font-bold text-lg !mb-3">Description</h2>
                <p className="text-gray-600 leading-7">{product.description}</p>
              </div>
            </div>
            <SellerCard product={product} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
