import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DB_URI,
});
client.connect()
  .then(() => ('connected'))
  .catch(err => ('Cannot connect to database'));

module.exports = client;
