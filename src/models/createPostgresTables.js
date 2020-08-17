import { Client } from 'pg';
import dotenv from 'dotenv';
import { userTable, partyTable, officeTable, candidateTable, voteTable } from './tables';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  SSL: true
});

const create = async () => {
  try {
    await client.connect();
    await client.query(userTable);
    await client.query(partyTable);
    await client.query(officeTable);
    await client.query(candidateTable);
    await client.query(voteTable);
    await client.end();
    console.log('users, party, office, candidates and votes tables created successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

create();
