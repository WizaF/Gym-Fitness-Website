const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const storeRouter = require('./routers/storeRouter');
const hostRouter = require('./routers/hostRouter');

const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/store', storeRouter);
app.use('/api/host', hostRouter);

app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  })
  .catch((error) => {
    console.log(error);
  });