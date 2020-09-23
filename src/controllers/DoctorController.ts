import * as Knex from 'knex';
import db from '../database/connection';
import { Request, Response } from 'express';

export default class ClassesController {
  async index (request: Request, response: Response) {
    const doctor = await db.raw(`select d.*, group_concat(distinct e.name separator ', ') as specialty from doctor d inner join doctor_specialty de on (d.id = de.doctor_id) inner join specialty e on (de.specialty_id = e.id) group by d.id`)

    console.log(doctor[0]);

    return response.json(doctor);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.body;

    console.log(id);

    await db('doctor').delete().where('doctor.id', '=', id);
    await db('doctor_specialty').delete().where('doctor_specialty.doctor_id', '=', id);

    return response.json({status: 'done'});
  }

  async update(request: Request, response: Response) {
    const { id, name, crm, telephone, city, uf, specialtyId } = request.body;

    console.log(specialtyId);

    await db('doctor').update({
      name,
      crm,
      telephone,
      city,
      uf
    }).where('doctor.id', '=', id);

    for(let i = 0; i < specialtyId.length; i++) {
      console.log(specialtyId[i]);
      try {
        await db('doctor_specialty').delete('*').where('doctor_id', '=', id);

        await db('doctor_specialty')
          .insert({
            doctor_id: id,
            specialty_id: specialtyId
          })
      } catch {
        console.log('especialidade ja cadastrada');
      }
    }

    return response.json({status: 'done'});
  }

  async create (request: Request, response: Response) {
    const {
      name,
      crm,
      telephone,
      city,
      uf,
      specialtyId
    } = request.body;

    try {
      await db('doctor').insert({
        name,
        crm,
        telephone,
        city,
        uf,
      });

      const doctorId = await db('doctor').where('crm', '=', crm).select('id');

      await db('doctor_specialty').insert({
        doctor_id: doctorId[0].id,
        specialty_id: specialtyId
      });

      return response.status(201).send();

    } catch (err) {

      return response.status(400).json({
        error: 'Unexpected error while creating new doctor'
      })
    }
  }
}
