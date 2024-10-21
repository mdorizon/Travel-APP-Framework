import express, { Request, Response } from "express";
const app = express()
const port = 8000

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
app.get('/travel/:id', (req: Request, res: Response) => {
    res.send(travelList.find(({id}) => id === Number(req.params.id)))
})

//create travel (app.post)

//Update travel (app.put)

//Delete travel (app.delete)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})