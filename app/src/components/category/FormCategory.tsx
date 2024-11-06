import { useEffect, useState } from "react";
import { CategoryDTO } from "../../types/category.type";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, findOneCategoryById, updateCategory } from "../../services/category.service";
import { toast } from "sonner";
import Input from "../ui/Input";
import Button from "../ui/Button";

type FormCategoryProps = {
    fetchCategories?: () => void
}

const FormCategory = ({ fetchCategories }: FormCategoryProps) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<CategoryDTO>({
        name: "",
        description: ""
    });
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchCategory();
    }, [id])

    const fetchCategory = async () => {
        try {
            const category = await findOneCategoryById(id as string)
            setCredentials(category)
        } catch (error) {
            console.log('Error to fetch category !', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (id) {
                await updateCategory(credentials, id);
                toast.success('category Updated !')
                navigate(`/category/${id}`)
            } else {
                await createCategory(credentials)
                fetchCategories()
                toast.success('category created !')
            }
        } catch (error) {
            if (id) {
                toast.error('Error to update category !')
                console.log('Error to update category !', error)
            } else {
                toast.error('Error to create category !')
                console.log('Error to create category !', error)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-5">
                <Input onChange={handleChange} name="name" placeholder="Category name" value={credentials.name} required={true} />
                <Input onChange={handleChange} name="description" placeholder="Category description" value={credentials.description} />
                <Button type="submit" text={`${id ? "Editer" : "Ajouter"}`}></Button>
            </div>
        </form>
    );
}

export default FormCategory;