# Build RestAPI with nodeJS and Express

This is a tutorial based on the NodeJS course with Mosh Hamedi and can be found in this address: https://www.youtube.com/watch?v=pKd0Rpw7O48

### install package.json

to install the json file, type in the terminal: npm init --yes

### install express

to install express, type in the terminal: npm i express

### install the node package module (nodemon)

Type in terminal npm i -g nodemon
this will refresh the browser each time we save in Visual Studio code

### Create the main file

Create app.js or index.js and write all the code in it, namely start with requiring express and calling app to hold an object of type express(). This represents our application.

Add the corresponding methods of CRUD (get, post, put, delete).

In this exercise, we will only use the get request.

### change the environment variable for the port

Declare a constant to store a port by typing process.env.PORT || 3000
This is essential in a production environment because we cannot decide on a specific port as it might be unavailable.

If you want to set a port, write set PORT=5000 (or change to the port number) in the terminal and it will be set automatically as an environment variable. In mac, use export instead of set.

## install joi for validation

Install Joi to facilitate input validation
write in terminal: npm i joi
add require('joi') on top

## start the program

Write in terminal node index.js and type localhost:3000 in the the browser to see the app
