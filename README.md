# Hadir API

This repo is the API for Hadir System which are developed on ExpressJS with integration of 3rd party libraries such as JWT and bcrypt. Database connection also included which only configured into MongoDB at this moment.

## Live Example

[https://hadir-api.herokuapp.com/api/v2/](https://hadir-api.herokuapp.com/api/v2/)

## Install

1.  `git clone https://github.com/irfanrosly/hadir-api`
2.  `npm install` or `yarn install`
3.  Create .env file and define PORT, DB and SECRET
    ```dosini
    PORT=8080
    DB='mongodb://root@localhost:27017/boilerexpress'
    SECRET='iloveboilerexpress'
    ```
4.  For window, please change `nodemon server.js` into `node server.js` if you happened to experience error while running the application
5.  Run `npm start` or `yarn start`

## Built With

- [JWT](https://jwt.io/) - Method for representing claims securely between two parties
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing function
- [Mongoose](https://github.com/Automattic/mongoose) - Connect to MongoDB
