import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URI,
  SSL: true
});

const create = async () => {
  try {
    await client.connect();
    await client.query('DROP TABLE IF EXISTS users CASCADE;');
    await client.query('DROP TABLE IF EXISTS party CASCADE;');
    await client.query('DROP TABLE IF EXISTS office CASCADE;');
    await client.query('DROP TABLE IF EXISTS candidates CASCADE;');
    await client.query('DROP TABLE IF EXISTS vote CASCADE;');
    await client.end();
    console.log('user, party, office, candidates and vote tables dropped successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

create();
