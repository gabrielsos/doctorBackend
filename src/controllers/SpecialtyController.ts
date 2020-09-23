import db from '.././database/connection';
import { Request, Response } from 'express';
import { uuid } from 'uuidv4';

export default class SpecialtyController {
  async index (request: Request, response: Response) {
    const specialty = await db.raw(`select * from specialty`);

    return response.json(specialty[0]);
  }

  async create (request: Request, response: Response) {
    const {
      name,
    } = request.body;

    const trx = await db.transaction();

    try {
      await trx('specialty').insert({
        id: uuid(),
        name
      });

      await trx.commit();

      return response.status(201).send();

    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new specialty'
      })
    }
  }
}
