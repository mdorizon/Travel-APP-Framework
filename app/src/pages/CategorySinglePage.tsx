import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { CategoryType } from "../types/category.type"
import { findOneCategoryById, removeCategory } from "../services/category.service"
import { toast } from "sonner"
import Button from "../components/Button"

const CategorySinglePage = () => {
  const { id } = useParams()
  const [category, setCategory] = useState<CategoryType>({})
  const navigate = useNavigate()

  useEffect(() => {
    if(id) fetchCategory()
  }, [])

  const fetchCategory = async () => {
    try {
      const category = await findOneCategoryById(id as string)
      console.log(category)
      setCategory(category);
    } catch (error) {
      console.log('Error to fetch categories', error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await removeCategory(id as string)
      console.log(response)
      toast.success('category deleted !')
      navigate('/category')
    } catch (error) {
      toast.error('failed to delete category !')
      console.log('Error to delete category', error)
    }
  }


  return (
    <div>
      <h1 className="text-2xl">{category.name}</h1>
      <p>{category.description}</p>
      <Link to={`/category/edit/${id}`}>Editer</Link>

      <Button
          text="Delete"
          variant="danger"
          onClick={handleDelete}
      >
        </Button>
    </div>
  );
}

export default CategorySinglePage;