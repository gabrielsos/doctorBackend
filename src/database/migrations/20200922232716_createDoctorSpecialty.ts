import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('doctor_specialty', table => {
    table.string('doctor_crm')
      .references('crm')
      .inTable('doctor')
      .onUpdate('cascade')
      .onDelete('cascade');

    table.string('specialty_id')
      .references('id')
      .inTable('specialty')
      .onUpdate('cascade')
      .onDelete('cascade');

    table.primary(['doctor_crm', 'specialty_id']);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('doctor_specialty');
}

