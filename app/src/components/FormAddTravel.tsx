import { useState } from "react";
import { TravelDTO } from "../types/travel.type";
import { toast } from "sonner";

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
            const response = await fetch(`http://localhost:8000/travels`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json()
            toast.success('travel created !')
            console.log(data)
            fetchTravels()
        } catch (e) {
            console.log(e)
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