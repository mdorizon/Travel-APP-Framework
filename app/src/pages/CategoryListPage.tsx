import { useState } from "react";
import { CategoryType } from "../types/category.type";
import { findAllCategories } from "../services/category.service";
import CategoryList from "../components/CategoryList";
import FormCategory from "../components/FormCategory";

const CategoryListPage = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])

  const fetchCategories = async () => {
      try {
          const categories = await findAllCategories()
          setCategoryList(categories);
      } catch (error) {
          console.log('Error to fetch categories', error)
      }
  }

  return (
      <div>
          <h1 className="text-4xl text-red-400 mb-10">Share your categories</h1>

          <FormCategory fetchCategories={fetchCategories} />

          <CategoryList categoryList={categoryList} fetchCategories={fetchCategories} />
      </div>
  );
}

export default CategoryListPage;