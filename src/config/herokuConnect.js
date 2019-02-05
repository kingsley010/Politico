import { Client } from 'pg';

// Connecting to heroku postgres
const client = new Client({
  connectionString: process.env.POSTGRES_URI,
});
client.connect()
  .then(() => ('connected'))
  .catch(err => ('Cannot connect to database'));

module.exports = client;
