import { Client } from 'pg';

// Connecting to heroku postgres
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect()
  .then(() => ('connected'))
  .catch(err => ('Cannot connect to database'));

// Exporting client
module.exports = client;
