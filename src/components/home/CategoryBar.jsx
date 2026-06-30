import { HiMenuAlt2 } from "react-icons/hi";

function CategoryBar() {
  const categories = [
    "Cars",
    "Motorcycles",
    "Mobile Phones",
    "For Rent: Houses & Apartments",
    "Beds-Wardrobes",
    "Furniture",
    "Fashion",
    "Pets",
  ];

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border-b border-[#e2e8f0] shadow-sm select-none">
      <div className="max-w-[1280px] !mx-auto flex items-center justify-between !px-6 !py-3 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex items-center !gap-3">
          <button className="bg-[#3A77FF] text-white !px-5 h-[38px] rounded-full flex items-center !gap-2.5 font-bold text-[13px] tracking-wider hover:bg-[#2563eb] transition-colors shadow-sm flex-shrink-0">
            <HiMenuAlt2 size={18} className="stroke-1" />
            <span>ALL CATEGORIES</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="text-[14px] font-medium text-[#002f34] bg-white border border-[#cbd5e1] hover:border-gray-400 !px-4 h-[38px] rounded-full flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="hidden lg:flex items-center !pl-6 border-l border-gray-200 text-gray-500 font-medium text-[13px] h-[24px] tracking-wide flex-shrink-0">
          {formattedDate}
        </div>
      </div>
    </div>
  );
}

export default CategoryBar;
