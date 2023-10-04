require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const userRoutes = require('./routes/user.routes');
const todoRoutes = require('./routes/todo.routes');

const app = express();
const PORT = process.env.PORT || 3001;

const sessionConfig = {
  name: 'Todo_List',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Hello',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app.use('/user', userRoutes);
app.use('/tasks', todoRoutes);

app.listen(PORT, () => {
  console.log(`server start ${PORT}`);
});
