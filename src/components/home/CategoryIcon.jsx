function CategoryIcon({ category }) {
  return (
    <div className="flex flex-col items-center cursor-pointer group flex-shrink-0 w-[96px]">
      <div className="w-24 h-24 rounded-xl bg-[#f3f5f6] border border-gray-200/60 flex items-center justify-center transition-all duration-200 group-hover:border-gray-300 group-hover:shadow-sm">
        <img
          src={category.image}
          alt={category.name}
          className="w-16 h-16 object-contain transform transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <p className="!mt-3 text-center text-[14px] font-bold text-[#002f34] leading-tight tracking-wide">
        {category.name}
      </p>
    </div>
  );
}

export default CategoryIcon;
