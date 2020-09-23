import Knex from 'knex';

const db = Knex({
  client: 'mysql',
  connection: {
    host : 'sql10.freemysqlhosting.net',
    user : 'sql10367042',
    password : process.env.APP_DB_PASSWORD,
    database : 'sql10367042'
  },
  useNullAsDefault: true,
});

export default db;
