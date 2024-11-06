import { Request, Response } from "express";
import connection from "../../config/database.config";


const getAll = async(req: Request, res: Response) => {
  connection.query('SELECT * FROM category', (e, results) => {
    if (e) {
      res.status(500).send({ error: 'Error while fecthing data' });
      return;
    };

    res.status(200).send(results);
  });
}

const getOne = async(req: Request, res: Response) => {
  const id = req.params.id
  connection.query('SELECT * FROM category WHERE id = ?', [id], (e, results) => {
    if (e) {
      res.status(500).send({ error: 'Error while fecthing data' });
      return;
    };

    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "Category not found" });
      return;
    }

    if (Array.isArray(results) && results.length === 1) {
      res.status(200).send(results[0]);
      return;
    }
  });
}

const create = async(req: Request, res: Response) => {
  const { name, description } = req.body;
  connection.query('INSERT INTO category (name, description) VALUES (?, ?)', [name, description], (e, results) => {
    if (e) {
      res.status(500).send({ error: 'Error while fecthing data' });
      return;
    };
    res.status(200).send({ message: "Category created successfully" });
  });
}

const update = async(req: Request, res: Response) => {
  const { id } = req.params;
  connection.query("SELECT * FROM category WHERE id = ?", [id], (e, results) => {
    if (e) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }
    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "Category not found" });
      return;
    }

    if (Array.isArray(results) && results.length === 1) {
      const currentCategory = results[0];
      const newCategory = {
        ...currentCategory,
        ...req.body,
      };

      const sqlUpdate = 'UPDATE category SET name=?, description=? WHERE id = ?';
      const values = [
        newCategory.name, 
        newCategory.description, 
        id
      ]
      connection.query(sqlUpdate, values, (e, results) => {
        if (e) {
          res.status(500).send({ error: 'Error while fecthing data' });
          return;
        };
        res.status(200).send({ message: "Category updated successfully" });
      });
    }
  });
}

const remove = async(req: Request, res: Response) => {
  const id = req.params.id;

  // Vérifier si l'id existe dans la base de données
  connection.query("SELECT * FROM category WHERE id = ?", [id], (e, results) => {
    if (e) {
      res.status(500).send({ error: 'Error while fecthing data' });
      return;
    };
    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "Category not found" });
      return;
    };
    idFoundDelete();
  });

  // Si l'id existe on peut supprimer
  function idFoundDelete() {
    connection.query('DELETE FROM category WHERE id = ?', [id], (e) => {
      if (e) {
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