const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const clucksRouter=require('./routes/clucks')
const methodOverride=require('method-override');
const knex = require("./db/queries") 


const app = express()
app.set("view engine", "ejs")
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))



app.use((req, res, next) => {
  res.locals.username = req.cookies.username || ""
  next()
})

app.get("/sign_in", (req, res) => {
  res.render("sign");
})


app.get("/", (req, res) => {
  knex 
    .index() 
    .then(data => {
      res.render("index", {clucks:data})
    })
})


app.post("/sign_out", (req, res) => {
  res.clearCookie("username")
  res.redirect("/")
})



app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method
    return method 
  }

}))

app.use((req, res, next) => {
  res.locals.username = req.cookies.username || ""
  next()
})


app.use("/clucks", clucksRouter);

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30
app.post("/sign_in", (req, res) => {
  res.cookie("username", req.body.username, { maxAge: COOKIE_MAX_AGE })
  res.redirect("/clucks/")
})


const PORT = 3000;
const ADDRESS = 'localhost';

app.listen(PORT, ADDRESS, () => {
  console.log(`Application listening at ${ADDRESS}:${PORT}`);
})
