import path from 'path';

module.exports = {
  client: 'mysql',
  connection: {
    host : 'sql10.freemysqlhosting.net',
    user : 'sql10367042',
    password : process.env.APP_DB_PASSWORD,
    database : 'sql10367042'
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true,
};
