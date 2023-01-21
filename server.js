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

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
