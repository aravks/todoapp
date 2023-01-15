const express = require('express');
const app = express();
const database = require('./config/db');
const { routes } = require('./route/todoRoute');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

//Middleware
app.use(express.json({ extended: false }));

app.use(cors());

routes(app);

database();

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
