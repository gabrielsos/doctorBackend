import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('specialty', table => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('(curtime())'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('(curtime())'));
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

