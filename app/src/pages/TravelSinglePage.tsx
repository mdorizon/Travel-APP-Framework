import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TravelType } from "../types/travel.type";

const TravelSinglePage = () => {
    const { id } = useParams()
    const [travel, setTravel] = useState<TravelType>({})
    const navigate = useNavigate()

    useEffect(() => {
        fetchTravels()
    }, [])

    const fetchTravels = async () => {
        const response = await fetch(`http://localhost:8000/travels/${id}`)
        const data = await response.json()
        setTravel(data)
    }

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8000/travels/${id}`, {
                method: "DELETE"
            })
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div>
            <img src={travel.image} />
            <h1>{travel.name}</h1>

            <button 
                className="bg-red-400 text-white text-xl px-4 py-2 hover:bg-red-500 transition-all" 
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
}

export default TravelSinglePage;