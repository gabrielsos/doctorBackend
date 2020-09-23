import Knex from 'knex';
import path from 'path';

const db = Knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'doctorsDB'
  },
  useNullAsDefault: true,
});

export default db;
