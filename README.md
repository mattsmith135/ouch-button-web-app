# ouch-button-web-app

A project comprising of a physical button and web application that allows individuals who use a wheelchair to communicate when they are experiencing pain.

### Built with

- [MongoDB](https://www.mongodb.com/)
- [ExpressJS](https://expressjs.com/)
- [ReactJS](https://react.dev/)
- [NodeJS](https://nodejs.org/en)

## Getting Started

You can configure and run the project locally by following the steps below.

### Installation

1. Clone the repo
```
git clone https://github.com/mattsmith135/ouch-button-web-app.git
```
2. Setup frontend
```
cd app/client
npm install
```
3. Setup backend
```
cd ../backend
npm install
```
4. Install Nodemon
```
npm install -g nodemon
```

### Setup MySQL Database

1. Install [XAMP](https://www.apachefriends.org/)
2. Start MySQL and Apache 
3. Navigate to phpMyAdmin (should be on localhost)
4. Create a new schema called 'ouch_button'
5. Run the SQL code from /backend/sql/schema.sql to create the tables
6. Run the SQL code from /backend/sql/data.sql to populate the tables with data

### Start Backend

```
cd app/backend
nodemon server
```

### Start Frontend

```
cd app/client
npm start
```

### Developing with SASS

[SASS](https://sass-lang.com/) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. 

Provided you have the frontend development page running and your files are linked correctly, changes made to .scss files should be in-effect immediately after saving.