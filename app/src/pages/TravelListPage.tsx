import { useState } from "react";
import FormAddTravel from "../components/FormAddTravel";
import TravelList from "../components/TravelList";
import { TravelType } from "../types/travel.type";
import { Toaster } from "sonner";
import { findAll } from "../services/travel.service";

const TravelListPage = () => {
    const [travelList, setTravelList] = useState<TravelType[]>([])

    const fetchTravels = async () => {
        try {
            const travels = await findAll()
            setTravelList(travels);
        } catch (error) {
            console.log('Error to fetch travels', error)
        }
    }

    return (
        <div>
            <h1 className="text-4xl text-red-400 mb-10">Share your travel</h1>

            <FormAddTravel fetchTravels={fetchTravels} />

            <TravelList travelList={travelList} fetchTravels={fetchTravels} />
            <Toaster richColors position="bottom-right" />
        </div>
    );
}

export default TravelListPage;