const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("connection successful...."))
    .catch((err) => console.log(err));