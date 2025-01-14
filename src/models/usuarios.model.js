import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    usuario: String,
    password: String,
    rol: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'user'

    }
})

const UsuarioModel = mongoose.model("usuarios",usuarioSchema);

export default UsuarioModel;