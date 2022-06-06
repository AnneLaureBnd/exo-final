import express from "express";
import dotenv from 'dotenv';
import route from './routes/home.js';
import session from 'express-session';

dotenv.config();
const {APP_HOST: hostname, APP_PORT: port, APP_DSN: dsn, APP_SECRET: secret} = process.env;
const app = express();

app.set('view engine', 'ejs')
app.use(express.static("/public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    name: 'user',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
  }))

app.use(function(req, res, next) {
  res.locals.username = req.session.username;
  next();
});

app.use('/', route);

app.listen(port, () => {
    console.log(`App listening at http://${hostname}:${port}`);
})
