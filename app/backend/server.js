const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose'); 

require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT || 5000; 

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, { useNewURLParser: true }
); 
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

app.use(cors()); 
app.use(express.json());

const clientsRouter = require('./routes/clients'); 
const therapistsRouter = require('./routes/therapists');

app.use('/clients', clientsRouter); 
app.use('/therapists', therapistsRouter); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 