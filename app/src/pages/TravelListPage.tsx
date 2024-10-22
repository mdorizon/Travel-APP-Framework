import FormAddTravel from "../components/FormAddTravel";
import TravelList from "../components/TravelList";

const TravelListPage = () => {
    return (
        <div>
            <h1 className="text-4xl text-red-400 mb-10">Share your travel</h1>

            <FormAddTravel />

            <TravelList />
        </div>
    );
}

export default TravelListPage;