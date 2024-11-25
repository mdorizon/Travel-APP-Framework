import { Request, Response } from "express";
import connection from "../../config/database.config";
import { ResultSetHeader } from "mysql2";


const getAll = async(req: Request, res: Response) => {
  connection.query('SELECT * FROM comment', (e, results) => {
    if (e) {
      res.status(500).send({ error: 'Error while fecthing data' });
      return;
    };

    res.status(200).send(results);
  });
}


const getAllForOneTravel = async(req: Request, res: Response) => {
  const id = req.params.id
  connection.query("SELECT * FROM comment WHERE travel_id = ?", [id], (e, results) => {
    if (e) {
      res.status(500).send({ error: 'Error while fecthing data' });
      return;
    };

    res.status(200).send(results);
  });
}

const create = async(req: Request, res: Response) => {
  const { pseudo, content } = req.body;

  connection.query('INSERT INTO comment (pseudo, content, travel_id) VALUES (?, ?, ?)', [pseudo, content, 61], (e, results) => {
    if (e) {
      res.status(500).send({ error: 'Error while fecthing data' })
      return;
    }

    res.status(200).send(results);
  })
}

const update = async(req: Request, res: Response) => {
  res.send('update comment');
}

const remove = async(req: Request, res: Response) => {
  res.send('delete comment');
}

export default {
  getAll,
  getAllForOneTravel,
  create,
  update,
  remove
}