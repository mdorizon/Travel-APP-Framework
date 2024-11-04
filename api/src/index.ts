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
    connection.query('SELECT * FROM travel', (error, results) => {
        if (error) {
            res.status(500).send({ error: 'Error while fecthing data' });
            return;
        };

        res.status(200).send(results);
    });
})

//get one travel (app.get)
app.get('/travels/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    connection.query('SELECT * FROM travel WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send({ error: 'Error while fecthing data' });
            return;
        };

        if (Array.isArray(results) && results.length === 0) {
            res.status(404).send({ error: "Travel not found" });
            return;
        }

        if (Array.isArray(results) && results.length === 1) {
            res.status(200).send(results[0]);
            return;
        }
    });
})

//create travel (app.post)
app.post('/travels', (req: Request, res: Response) => {
    const { title, city, country, image, description } = req.body;
    connection.query('INSERT INTO travel (title, city, country, image, description) VALUES (?, ?, ?, ?, ?)', [title, city, country, image, description], function (error, results, fields) {
        if (error) {
            res.status(500).send({ error: 'Error while fecthing data' });
            return;
        };
        res.status(200).send({ message: "Travel created successfully" });
    });
})

//Update travel (app.put)
app.put("/travels/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    connection.query("SELECT * FROM travel WHERE id = ?", [id], (error, results) => {
            if (error) {
                console.log("error: ", error);
                res.status(500).send({ error: "Error while fetching data" });
                return;
            }
            if (Array.isArray(results) && results.length === 0) {
                res.status(404).send({ error: "Travel not found" });
                return;
            }

            if (Array.isArray(results) && results.length === 1) {
                const currentTravel = results[0];
                const newTravel = {
                ...currentTravel,
                ...req.body,
                };
                updateRequest(newTravel);
            }
        }
    );
    function updateRequest(travel:any) {
        connection.query('UPDATE travel SET title=?, city=?, country=?, image=?, description=? WHERE id = ?', [travel.title, travel.city, travel.country, travel.image, travel.description, id], function (error, results) {
            if (error) {
                res.status(500).send({ error: 'Error while fecthing data' });
                return;
            };
            res.status(200).send({ message: "Travel updated successfully" });
        });
    }
});

//Delete travel (app.delete)
app.delete('/travels/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    // Vérifier si l'id existe dans la base de données
    connection.query("SELECT * FROM travel WHERE id = ?", [id], (error, results) => {
        if (error) {
            res.status(500).send({ error: 'Error while fecthing data' });
            return;
        };
        if (Array.isArray(results) && results.length === 0) {
            res.status(404).send({ error: "Travel not found" });
            return;
        };
        idFoundDelete();
    });

    // Si l'id existe on peut supprimer
    function idFoundDelete() {
        connection.query('DELETE FROM travel WHERE id = ?', [id], (error, results) => {
            if (error) {
                res.status(500).send({ error: 'Error while fecthing data' });
                return;
            };
    
            res.status(200).send({ message: 'Success to delete' });
        });
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})