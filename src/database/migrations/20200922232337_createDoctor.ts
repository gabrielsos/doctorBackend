import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('doctor', table => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name').notNullable();
    table.string('crm').notNullable();
    table.string('telephone').notNullable();
    table.string('city').notNullable();
    table.string('uf').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
}
