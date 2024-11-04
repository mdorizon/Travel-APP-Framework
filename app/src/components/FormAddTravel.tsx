import { useState } from "react";
import { TravelDTO } from "../types/travel.type";
import { toast } from "sonner";
import { create } from "../services/travel.service";

type FormAddTravelProps = {
    fetchTravels: () => void
}

const FormAddTravel = ({ fetchTravels }: FormAddTravelProps) => {
    const [credentials, setCredentials] = useState<TravelDTO>({
        name: '',
        city: '',
        country: '',
        image: '',
        description: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await create(credentials)
            toast.success('travel created !')
            console.log(response)
            fetchTravels()
        } catch (error) {
            toast.error('Error to create travel !')
            console.log('Error to create travel !', error)
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
            <input onChange={handleChange} type="text" name="name" placeholder="Travel name" />
            <input onChange={handleChange} type="text" name="city" placeholder="City name" />
            <input onChange={handleChange} type="text" name="country" placeholder="Country name" />
            <input onChange={handleChange} type="url" name="image" placeholder="Image URL" />
            <textarea onChange={handleChange} name="description" placeholder="Travel description"></textarea>
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default FormAddTravel;