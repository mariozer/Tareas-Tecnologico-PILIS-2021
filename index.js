const express = require ("express");
//const router = express.Router();
const routes = require ("./routes");
const path = require ("path");
const bodyParser = require ("body-parser");
const expressValidator = require("express-validator");
// helpers con algunas funciones
const helpers = require("./helpers");

//crear una CONEXION A  BBDD
const db = require("./config/db");
// Importar el modelo
require("./models/Proyectos");
require("./models/Tareas");

db.sync()     // db.authenticate()
    .then(() => console.log("Conectado al Servidor"))
    .catch(error => console.log(error))

// crear una app de express
const app = express();
app.use(expressValidator());

//donde cargar los archivos staticos
app.use(express.static("public"));

// Habilitar Pug
app.set("view engine", "pug");
// añadir la carpeta de las vistas
app.set("view", path.join(__dirname, "./views"));

// Pasar var dump a la aplication
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})

//habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", routes());

app.listen(3000);
// node app.js     **imprime en consola**
// nodemon ./server.js localhost 8080
// http://localhost:3000
