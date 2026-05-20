const express = require('express');
const app = express();
// const cors=require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// require('dotenv').config();

// import mongoose from "mongoose"
// import dotenv from "dotenv"

// dotenv.config()

app.use(bodyParser.json());
const PORT = 30000 || process.env.PORT;
mongoose.connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    }))
  .catch(err => console.log(err))


// app.use(cors());

// app.use('/host', hostRouter);
// app.use('/store', storeRouter);






