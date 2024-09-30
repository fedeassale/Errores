import mongoose from "mongoose";

mongoose.connect("mongodb+srv://fedeassale17:fedeassale17@cluster0.nxt6m.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>console.log("Conectados a la Base de Datos"))
    .catch((error)=>console.log("tenemos un error:", error));