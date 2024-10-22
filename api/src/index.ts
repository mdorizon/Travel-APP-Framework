import express, { Request, Response } from "express";
const app = express()
const port = 8000

app.use(express.json())

const travelList = 
[
    {
        "id": 1,
        "name": "Paris",
        "city": "Paris",
        "country": "France",
        "image": "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
        "description": "Paris is known for its iconic landmarks like the Eiffel Tower, art museums like the Louvre, and its romantic atmosphere."
    },
    {
        "id": 2,
        "name": "New York City",
        "city": "New York",
        "country": "USA",
        "image": "https://www.planetware.com/photos-large/USNY/new-york-city-empire-state-building.jpg",
        "description": "New York City is famous for its skyline, Central Park, Times Square, and vibrant cultural life."
    }
]

app.get('/', (req: Request, res: Response) => {
    res.send('Travel App !')
})

//get all travels (app.get)
app.get('/travels', (req: Request, res: Response) => {
    res.send(travelList)
})

//get one travel (app.get)
app.get('/travels/:id', (req: Request, res: Response) => {
    const travel = travelList.find(({ id }) => id === Number(req.params.id));
    if (!travel) {
        res.status(404).send({ message: "Travel not found" });
    }
    res.send(travel);
})

//create travel (app.post)
app.post('/travels', (req: Request, res: Response) => {
    // Get data body
    const travel = req.body
    // Create id
    const id = (travelList.length + 1)
    travel.id = id;
    // Add data body into array
    travelList.push(travel)
    // Send data created
    res.send(travel)
})

//Update travel (app.put)
app.put('/travels/:id', (req: Request, res: Response) => {
    const { id } = req.params
    const updateTravelData = req.body
    const index = travelList.findIndex(t => t.id === Number(id));
    travelList[index] = {
        ...travelList[index],
        ...updateTravelData
    }
    
    res.send(travelList)
})

//Delete travel (app.delete)
app.delete('/travels/:id', (req: Request, res: Response) => {
    const { id } = req.params

    const index = travelList.findIndex(t => t.id === Number(id));
    if (index !== -1) {
        travelList.splice(index, 1); // Supprime l'élément à l'index trouvé
    }
    res.status(204)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})