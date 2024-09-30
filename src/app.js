import express from "express";
import {engine} from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./database.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/user.router.js";


const app = express();
const PUERTO = 8080

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());
// initializePassport(); 

//handlebars
app.engine("handlebars", engine());
app.set("view engine","handlebars");
app.set("views", "./src/views");

//rutas
app.use("/", viewsRouter);
app.use("/api/sessions/", usersRouter);


app.listen(PUERTO, ()=>{
    console.log(`Servidor escuchando en el puerto ${PUERTO}`)
})