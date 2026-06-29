import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch, IoHeartOutline } from "react-icons/io5";
import { HiOutlineLocationMarker, HiOutlineChevronRight } from "react-icons/hi";
import { FiUser } from "react-icons/fi"; // Fixed package path from react-fi to react-icons/fi
import { useAuth } from "../../hooks/useAuth";
import LoginModal from "../auth/LoginModal";

function Header() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto flex items-center justify-between !gap-3 !px-4 !py-2">
          <Link to="/" className="flex-shrink-0 !mr-2">
            <img
              src="image.png"
              alt="OLX"
              className="w-[64px] h-[38px] object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center bg-white border border-[#cbd5e1] rounded-full w-[270px] h-[48px] !px-4 cursor-pointer hover:border-gray-400 transition-all shadow-sm">
            <HiOutlineLocationMarker className="text-[#0071ff] text-xl !mr-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="India"
              defaultValue="India"
              className="w-full bg-transparent outline-none text-[15px] text-[#002f34] font-normal"
            />
            <HiOutlineChevronRight className="text-gray-400 text-xl !ml-auto" />
          </div>
          <div className="flex flex-1 max-w-[720px] h-[48px] bg-white border border-[#cbd5e1] rounded-full overflow-hidden focus-within:border-[#0071ff] transition-all !pr-1 items-center shadow-sm">
            <input
              type="text"
              placeholder='Search "Cars"'
              className="flex-1 bg-transparent !px-5 outline-none text-[15px] text-[#002f34] placeholder-gray-400"
            />
            <button className="w-[40px] h-[40px] bg-[#0071ff] rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors flex-shrink-0">
              <IoSearch size={20} />
            </button>
          </div>
          <div className="flex items-center !gap-6 text-[#002f34] !ml-2">
            <Link
              to="/my-ads"
              className="flex flex-col items-center justify-center text-[#002f34] hover:text-[#0071ff] transition-colors group"
            >
              <IoHeartOutline
                size={26}
                className="text-[#002f34] group-hover:text-[#0071ff]"
              />

              <span className="text-[12px] font-medium text-[#002f34] !mt-0.5">
                My Ads
              </span>
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center focus:outline-none"
                >
                  <div className="w-[40px] h-[40px] bg-[#005c9e] text-white rounded-full flex items-center justify-center font-semibold text-lg border-[2px] border-[#ffce32] shadow-sm hover:scale-105 transition-transform">
                    {user.displayName ? user.displayName[0].toLowerCase() : "m"}
                  </div>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-xl shadow-xl w-48 !py-2 z-50">
                    <p className="!px-4 !py-2 text-sm text-gray-700 font-semibold truncate">
                      {user.displayName || "User"}
                    </p>
                    <hr className="!my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left !px-4 !py-2 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex flex-col items-center justify-center text-[#002f34] hover:text-[#0071ff] transition-colors"
              >
                <FiUser size={24} />
                <span className="text-[12px] font-bold text-[#002f34] !mt-0.5">
                  Login
                </span>
              </button>
            )}
            <Link
              to="/post-ad"
              className="relative inline-flex items-center justify-center h-[48px] !px-5 font-bold text-[14px] tracking-wide text-[#002f34] bg-white rounded-full transition-transform active:scale-95 shadow-[0_2px_4px_rgba(0,0,0,0.08)] border-[5px] border-transparent"
              style={{
                background:
                  "linear-gradient(white, white) padding-box, " +
                  "linear-gradient(135deg, #ffce32 0%, #ffce32 40%, #23e5db 40%, #23e5db 75%, #3a77ff 75%, #3a77ff 100%) border-box",
              }}
            >
              <span className="flex items-center !gap-1 font-bold text-[#002f34]">
                <span className="text-xl font-light leading-none !mb-0.5">
                  +
                </span>{" "}
                SELL
              </span>
            </Link>
          </div>
        </div>
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default Header;
