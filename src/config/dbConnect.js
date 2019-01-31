import { Client } from 'pg';

export const client = new Client({
  connectionString: process.env.DB_URI,
  SSL: true
});
client.connect()
  .then(() => ('connected'))
  .catch(err => ('Cannot connect to database'));
