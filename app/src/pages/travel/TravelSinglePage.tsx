import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TravelType } from "../../types/travel.type";
import { findOneById, remove } from "../../services/travel.service";
import Button from "../../components/ui/Button";
import { toast } from "sonner";

const TravelSinglePage = () => {
    const { id } = useParams()
    const [travel, setTravel] = useState<TravelType>({})
    const navigate = useNavigate()

    useEffect(() => {
        if(id) fetchTravel()
    }, [])

    const fetchTravel = async () => {
        try {
            const travel = await findOneById(id as string)
            setTravel(travel);
        } catch (error) {
            console.log('Error to fetch travels', error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await remove(id as string)
            console.log(response)
            toast.success('travel deleted !')
            navigate('/')
        } catch (error) {
            toast.error('failed to delete travel !')
            console.log('Error to fetch travels', error)
        }
    }


    return (
        <div>
            <img src={travel.image} />
            <h1>{travel.title}</h1>
            <Link to={`/edit/${id}`}>Editer</Link>

            <Button
                text="Delete"
                variant="danger"
                onClick={handleDelete}
            >
            </Button>
        </div>
    );
}

export default TravelSinglePage;