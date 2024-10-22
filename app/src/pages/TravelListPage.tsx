import { useState } from "react";
import FormAddTravel from "../components/FormAddTravel";
import TravelList from "../components/TravelList";
import { TravelType } from "../types/travel.type";
import { Toaster } from "sonner";

const TravelListPage = () => {
    const [travelList, setTravelList] = useState<TravelType[]>([])

    const fetchTravels = async () => {
        const response = await fetch("http://localhost:8000/travels")
        const data = await response.json()
        setTravelList(data);
    }

    return (
        <div>
            <h1 className="text-4xl text-red-400 mb-10">Share your travel</h1>

            <FormAddTravel fetchTravels={fetchTravels} />

            <TravelList travelList={travelList} fetchTravels={fetchTravels} />
            <Toaster position="bottom-right" />
        </div>
    );
}

export default TravelListPage;