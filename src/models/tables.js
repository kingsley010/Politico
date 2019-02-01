export const userTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL primary key,
    firstname varchar (30) NOT NULL,
    lastname varchar (30) NOT NULL,
    othername varchar (30),
    email varchar (30) UNIQUE NOT NULL,
    password varchar (65) NOT NULL,
    phonenumber varchar (14) UNIQUE NOT NULL,
    passporturl varchar (100) UNIQUE NOT NULL,
    isAdmin varchar (5) DEFAULT 'false',
    registered TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
  INSERT INTO users (firstname, lastname, othername, email, password, phonenumber, passporturl, isAdmin) VALUES ('kaka', 'perfect', 'macho', 'kaks@gmail.com', '$2y$12$G4/WuYEvc49yA3BwVfgeEeWyKgF2MgHz26aLx7BzEskW7eC8YhCRK', '12345678901', 'kaks.jpg', 'true');

  `;

export const partyTable = `
    CREATE TABLE party (
      id SERIAL primary key,
      name varchar (40) NOT NULL,
      hqAddress varchar (70) NOT NULL,
      logoUrl varchar (50) NOT NULL,
      registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    INSERT INTO party (name, hqAddress, logoUrl) VALUES ('abc', 'Abuja', 'abc.jpeg');
`;  

export const officeTable = `
  CREATE TABLE office (
    id SERIAL primary key,
    type varchar (20) NOT NULL,
    name varchar (40) NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    INSERT INTO office (type, name) VALUES ('federal', 'presidency');
`;

export const candidateTable = `
CREATE TABLE candidate (
    id SERIAL primary key,
    office int references office(id),
    party int references party(id),
    candidate int references users(id),
    registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    INSERT INTO candidate (office, party, candidate) VALUES ('1', '1', '1');
`;

export const voteTable = `
CREATE TABLE vote (
    id SERIAL primary key,
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
    candidate int references candidate(id),
    office int references office(id),
    voter int references users(id)
    );
`;
