import { categories } from "../../utils/categories";
import CategoryIcon from "./CategoryIcon";

function CategorySection() {
  return (
    <section className="max-w-[1280px] !mx-auto !py-6 !px-6">
      <div className="flex items-start !gap-8 overflow-x-auto no-scrollbar !py-2">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
