import { useEffect, useState } from "react";
import { TravelDTO } from "../types/travel.type";
import { toast } from "sonner";
import { create, findOneById, update } from "../services/travel.service";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";

type FormTravelProps = {
    fetchTravels?: () => void
}

const FormTravel = ({ fetchTravels }: FormTravelProps) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<TravelDTO>({
        title: "",
        city: "",
        country: "",
        image: "",
        description: ""
    });
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchTravel();
    }, [id])

    const fetchTravel = async () => {
        try {
            const travel = await findOneById(id as string)
            setCredentials(travel)
        } catch (error) {
            console.log('Error to fetch travel !', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (id) {
                await update(credentials, id);
                toast.success('travel Updated !')
                navigate(`/${id}`)
            } else {
                await create(credentials)
                fetchTravels()
                toast.success('travel created !')
            }
        } catch (error) {
            if (id) {
                toast.error('Error to update travel !')
                console.log('Error to update travel !', error)
            } else {
                toast.error('Error to create travel !')
                console.log('Error to create travel !', error)
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
                <Input onChange={handleChange} name="title" placeholder="Travel name" value={credentials.title} required={true} />
                <Input onChange={handleChange} name="city" placeholder="City name" value={credentials.city} />
                <Input onChange={handleChange} name="country" placeholder="Country name" value={credentials.country} />
                <Input onChange={handleChange} type="url" name="image" placeholder="Image URL" value={credentials.image} />
                <Input onChange={handleChange} name="description" placeholder="Travel description" value={credentials.description} />
                <Button type="submit" text={`${id ? "Editer" : "Ajouter"}`}></Button>
            </div>
        </form>
    );
}

export default FormTravel;