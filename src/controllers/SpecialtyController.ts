import db from '.././database/connection';
import { Request, Response } from 'express';

export default class SpecialtyController {
  async create (request: Request, response: Response) {
    const {
      name,
    } = request.body;

    const date = Date.now();
    const date2 = Date.now();
    const trx = await db.transaction();
    console.log(name, date, date2)

    try {
      await trx('specialty').insert({
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
