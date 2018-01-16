

## Installation

The app is built using Node.js, with the server run by npm express package.

### Requirements

Node.js and npm are required to run this app. Verify that you have node and npm installed by running `node v` and `npm -v` in a terminal/console window. If not, you can install using the links below:

* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)

### To Run

Clone or download this git repository into a new project folder. Navigate to your new project folder. To launch the app run:

```
$ npm install
$ npm start
```
Local server runs at http://localhost:3001/. Manually close down the server when you are finished with `Ctrl-C`.

### npm Packages used:

[**Express**](https://www.npmjs.com/package/express)
A small, robust tooling for HTTP servers. For single page applications, web sites, hybrids, or public HTTP APIs. Support for over 14 template engines via [consolidate.js](https://github.com/tj/consolidate.js).

[**sqlite3**](https://github.com/mapbox/node-sqlite3)
To provide provide local data storage for individual applications and devices.

[**sequelize**](https://www.npmjs.com/package/sequelize)
A promise-based Node.js ORM for SQLite amongst others.

[**body-parser**](https://www.npmjs.com/package/body-parser)
Node.js body parsing middleware to parse incoming request bodies in a middleware before handlers, available under the req.body property.
