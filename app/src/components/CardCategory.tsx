import { Link } from "react-router-dom";
import { CategoryType } from "../types/category.type";

type CardCategoryProps = {
  category: CategoryType
}

const CardCategory = ({ category }: CardCategoryProps) => {
  return (
    <div className="shadow-md">
        <div className="h-[100px] overflow-hidden">
          <Link to={`/category/${category.id}`}>
              <h2 className="text-xl text-zinc-500 fond-bold mt-2">{category.name}</h2>
            <p>
              {category?.description?.substring(0, 50)}
              {category?.description?.length > 50 && "..."}
            </p>
          </Link>
        </div>
    </div>
);
}

export default CardCategory;