import express, { Request, Response } from "express";
import cors from 'cors'
import mysql from "mysql2";

const app = express()
const port = 8000

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

// Connection to the mysql database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: 'travel_app'
});

connection.connect((e) => {
    if(e){
        console.log(e)
    } else {
        console.log('Connected to database !')
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Travel App !')
})

//get all travels (app.get)
app.get('/travels', (req: Request, res: Response) => {
    connection.query('SELECT * FROM travel', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

//get one travel (app.get)
app.get('/travels/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    connection.query('SELECT * FROM travel WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

//create travel (app.post)
app.post('/travels', (req: Request, res: Response) => {
    const { name, city, country, image, description } = req.body;
    connection.query('INSERT INTO travel (name, city, country, image, description) VALUES (?, ?, ?, ?, ?)', [name, city, country, image, description], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

//Update travel (app.put)
app.put('/travels/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, city, country, image, description } = req.body;
    connection.query('UPDATE travel SET name=?, city=?, country=?, image=?, description=? WHERE id = ?', [name, city, country, image, description, id], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

//Delete travel (app.delete)
app.delete('/travels/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    connection.query('DELETE FROM travel WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        res.status(204).send()
    });
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})