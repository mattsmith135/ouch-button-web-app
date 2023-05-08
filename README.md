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

### Setup MongoDB Atlas and create .env file

1. Within the 'backend' folder, create a .env file that is similar to the .env.example file

1. Sign into [MongoDB Atlas](https://account.mongodb.com/account/login?nds=true). Login credentials are listed on the Google Drive in a file titled 'Creds'

2. Select the 'Connect' button listed on the database cluster

3. Under the 'Connect to your application' heading, select 'Drivers'

4. Copy the connection string (ie. mongodb+srv//...) and paste it in the .env file next to 'ATLAS_URI'

5. Navigate to the 'Network Access' option under the 'Security' heading in the sidenav

6. Select the 'Add IP Address button'

7. In the 'Access List Entry' field, enter your IP address. To find your IP address ask Google 'What's my IP' 

8. In the 'Comment' field, type 'Dev IP Address - `<yourname>`' (ie. Dev IP Address - Adam Baker)

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