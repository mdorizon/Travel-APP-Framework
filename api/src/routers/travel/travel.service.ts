import { Request, Response } from "express";
import connection from "../../config/database.config";


const getAll = async(req: Request, res: Response) => {
  connection.query('SELECT * FROM travel', (error, results) => {
    if (error) {
      res.status(500).send({ error: 'Error while fecthing data' });
      return;
    };

    res.status(200).send(results);
  });
}

const getOne = async(req: Request, res: Response) => {
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
}

const create = async(req: Request, res: Response) => {
  const { title, city, country, image, description } = req.body;
  connection.query('INSERT INTO travel (title, city, country, image, description) VALUES (?, ?, ?, ?, ?)', [title, city, country, image, description], function (error, results, fields) {
    if (error) {
      res.status(500).send({ error: 'Error while fecthing data' });
      return;
    };
    res.status(200).send({ message: "Travel created successfully" });
  });
}

const update = async(req: Request, res: Response) => {
  const { id } = req.params;

  connection.query("SELECT * FROM travel WHERE id = ?", [id], (error, results) => {
    if (error) {
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

      const sqlUpdate = 'UPDATE travel SET title=?, city=?, country=?, image=?, description=? WHERE id = ?';
      const values = [
        newTravel.title, 
        newTravel.city, 
        newTravel.country, 
        newTravel.image, 
        newTravel.description, 
        id
      ]
      connection.query(sqlUpdate, values, (error, results) => {
        if (error) {
          res.status(500).send({ error: 'Error while fecthing data' });
          return;
        };
        res.status(200).send({ message: "Travel updated successfully" });
      });
    }
  });
}

const remove = async(req: Request, res: Response) => {
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
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove
}