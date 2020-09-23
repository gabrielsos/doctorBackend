import db from '../database/connection';
import { Request, Response } from 'express';

export default class ClassesController {
  async index (request: Request, response: Response) {
    const doctor = await db.raw(`select d.*, group_concat(distinct e.name separator ', ') as specialty from doctor d inner join doctor_specialty de on (d.crm = de.doctor_crm) inner join specialty e on (de.specialty_id = e.id) group by d.crm`)

    return response.json(doctor[0]);
  }

  async getByCrm (request: Request, response: Response) {
    const { crm } = request.params;
    const doctor = await db.raw(`select d.*, group_concat(distinct e.name separator ', ') as specialty from doctor d inner join doctor_specialty de on (d.crm = de.doctor_crm) inner join specialty e on (de.specialty_id = e.id) where d.crm = ${crm} group by d.crm`)

    return response.json(doctor[0]);
  }

  async delete(request: Request, response: Response) {
    const { crm } = request.params;

    await db('doctor_specialty').delete().where('doctor_specialty.doctor_crm', '=', crm);
    await db('doctor').delete().where('doctor.crm', '=', crm);

    return response.json(crm);
  }

  async update(request: Request, response: Response) {
    const { crm } = request.params;
    const { name, telephone, city, state, specialtyId } = request.body;

    await db('doctor').update({
      name,
      crm,
      telephone,
      city,
      state
    }).where('doctor.crm', '=', crm);

    for(let i = 0; i < specialtyId.length; i++) {
      try {
        await db('doctor_specialty')
          .update({
            specialty_id: specialtyId[i]
          }).where('doctor_specialty.doctor_crm', '=', crm)
      } catch {
        console.log('especialidade ja cadastrada');
      }


    }

    return response.status(201).send();
  }

  async create (request: Request, response: Response) {
    const {
      name,
      crm,
      telephone,
      city,
      state,
      specialtyId
    } = request.body;

    const trx = await db.transaction();

    try {
      await trx('doctor').insert({
        name,
        crm,
        telephone,
        city,
        state,
      });

      for(let i = 0; i < specialtyId.length; i++) {
        await trx('doctor_specialty').insert({
          doctor_crm: crm,
          specialty_id: specialtyId[i]
        });
      }

      await trx.commit();

      return response.status(201).send();

    } catch (err) {

      await trx.rollback();
      return response.status(400).json({
        error: 'Unexpected error while creating new doctor'
      })
    }
  }
}
