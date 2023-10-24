var express = require("express");
var app = express();
const bodyparser = require('body-parser')
const port = 8000;
var router = require("./routes/router");
const path = require ('path');
const session = require('express-session')
const mySQLstore = require ("express-mysql-session") (session);
const db = require ("./connect")
//untuk menjalankan req.body
app.use(bodyparser.json())
//fungsinya menjalankan post
app.use(bodyparser.urlencoded({ extended: true }))
const sessionStore = new mySQLstore({
  expiration : 24 * 60 * 60 *1000,
  clearExpired : true,
  createDatabaseTable : true,
},
db
)
app.use(
  session({
  secret: 'secret-key',
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
}))

app.set("view engine", "ejs");
app.set("views", "view");
//untuk menggabungkan folder dengan folder public dan untuk mengakses folder public
app.use(express.static(path.join(__dirname, "public"),{
  setHeaders : (res, path)=>{
    //jika file nya berakhir dengan css maka atur header nya dengan contentt type css
    if (path.endsWith('.css')){
      res.setHeader("Content-Type", "text/css");
    }else if(path.endsWith(".js")){
      res.setHeader("Content-Type","application/javascript");
    }
  }
}));

app.use(router);


app.listen(port, () => {
  console.log("server ini sudah berjalan");
});