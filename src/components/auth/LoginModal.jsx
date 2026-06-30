import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import Loader from "../common/Loader";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

function LoginModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      emoji: "🎸",
      text: "Help us become one of the safest places to buy and sell",
    },
    {
      emoji: "🛍️",
      text: "Buy or sell anything in your local community",
    },
    {
      emoji: "💙",
      text: "Keep all your favourites in one place",
    },
  ];

  async function handleGoogleLogin() {
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 !px-4">
      <div className="bg-white w-full max-w-md rounded-lg !p-8 relative">
        <button onClick={onClose} className="absolute !right-5 !top-5 text-3xl">
          <IoClose />
        </button>
        <div className="flex flex-col items-center">
          <div className="text-7xl !mb-5">{slides[slide].emoji}</div>
          <div className="flex items-center !gap-5">
            <button
              onClick={() =>
                setSlide((slide - 1 + slides.length) % slides.length)
              }
              className="text-3xl text-gray-400"
            >
              ‹
            </button>
            <p className="font-semibold text-center w-64 text-lg">
              {slides[slide].text}
            </p>
            <button
              onClick={() => setSlide((slide + 1) % slides.length)}
              className="text-3xl text-gray-400"
            >
              ›
            </button>
          </div>
          <div className="flex !gap-2 !mt-5 !mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  slide === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button className="w-full border-2 border-[#3A77FF] text-[#3A77FF] font-semibold rounded !py-3 flex justify-center items-center !gap-2 !mb-4">
            <HiOutlineDevicePhoneMobile size={22} />
            Continue with phone
          </button>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border rounded !py-3 flex justify-center items-center !gap-3 hover:bg-gray-50"
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                <FcGoogle size={22} />
                Continue with Google
              </>
            )}
          </button>
          <p className="!my-4 font-semibold">OR</p>
          <button className="underline font-semibold">Login with Email</button>
          <p className="text-gray-400 text-xs !mt-8 text-center">
            All your personal details are safe with us.
          </p>
          <p className="text-gray-400 text-xs text-center !mt-2">
            By continuing, you accept OLX Terms & Conditions and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
