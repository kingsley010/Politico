[![Build Status](https://travis-ci.org/perfect090/Politico.svg?branch=develop)](https://travis-ci.org/perfect090/Politico) [![Maintainability](https://api.codeclimate.com/v1/badges/b68057f9abe8cc9796eb/maintainability)](https://codeclimate.com/github/perfect090/Politico/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b68057f9abe8cc9796eb/test_coverage)](https://codeclimate.com/github/perfect090/Politico/test_coverage) [![Coverage Status](https://coveralls.io/repos/github/perfect090/Politico/badge.svg)](https://coveralls.io/github/perfect090/Politico) 

# Politico
Politico is a platform that enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

# Features

Some of the interactions that can be done with the platform include:
<li> Creating an account and logging in </li>
<li> Creating a political party (this can only be done by the admin). </li>
<li> Creating a political office, which can only be done by the admin also. </li>
<li> Expressing interest to run for a political office, thereby becoming a candidate
come the elections. </li>
<li> Voting only one politician against a specific government office. </li>
<li> Viewing all political parties and politicians running for a specific government office. </li>
All these and many more are possible as long as the user has signed up and is logged in to the platform.

# Getting Started

These instructions will get you through the steps required in setting up the project on your local machine for development and testing purposes.

# Prerequisites

Firstly, you need to install node.js on your system by using the link <a href="https://nodejs.org/en">nodejs.org/en</a>, follow the instructions on the website to get started.</br></br>
Secondly, you need to clone this repository or download the zip file. To do this, you need to install git on your local computer from <a href="https://https://git-scm.com/downloads">git-scm.com/downloads</a> so as to be able to access the git bash user interface terminal.</br></br>
Thirdly, make sure you have a text editor like sublimetext, visual studio, atom etc. to be able to type in and edit your codes.</br></br>

# Installing

Installing the application is a quite easy. After cloning the repository to your local computer with the "git clone" command e.g. git clone https://github.com/perfect090/Politico.git. Change directory into the folder on your most preferred terminal, let's say git bash and run the command: <strong>npm install</strong>. This will install all the dependencies and development dependencies on your local machine.</br></br>
Once the installation has been completed, the server can be started with the <strong>npm start</strong> command which runs the start script (nodemon app.js --exec babel-node --presets babel-preset-env) in the package.json file.</br></br>
The same process can be used in running the tests by typing the command: <strong>npm start</strong> which runs the test script in the package.json file.

# Api Endpoints

The api endpoints that can currently be accessed are as follows:</br></br>

# POST /api/v1/parties/
This creates a political party.

# GET /api/v1/parties/:id/
This retrieves a specific political party.

# GET /api/v1/parties/
This gets all political parties.

# PATCH /api/v1/parties/:id/name
This edits a specific party name.

# DELETE /api/v1/parties/:id/
This deletes a perty by id.

# POST /api/v1/offices/
This creates a new political office.

# GET /api/v1/offices/
This gets all political offices.

# GET /api/v1/offices/:id
This gets a specific political office.</br></br>

# Author

<strong>Obioha Kingsley</strong>

# License

This project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT license </a>

