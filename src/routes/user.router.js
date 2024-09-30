import { Router } from "express";
import UsuarioModel from "../models/usuarios.model.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import {createHash,isValidPassword} from "../utils/util.js";

const router = Router ();

router.post("/register",async (req,res)=>{
    let{usuario, password} = req.body;
    try {
        //verificamos si existe el usuario
        const existeUsuario = await UsuarioModel.findOne({usuario});
        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe");
            }

            const nuevoUsuario = new UsuarioModel({
                usuario,
                password: createHash(password)
            });
            await nuevoUsuario.save();

            //generar el token 
            const token = jwt.sign({usuario: nuevoUsuario.usuario},"coderhouse",{expiresIn: "1h"})

            res.cookie("coderCookieToken",token,{
                maxAge:360000,
                httpOnly: true
            })
            res.redirect("/home");
    } catch (error) {
        res.status(500).send("error interno del servidor");

        
    }
})

//login

router.post("/login",async(req,res)=>{
    let{usuario,password} = req.body;

    try {
        const usuarioEncontrado = await UsuarioModel.findOne({usuario});
        if (!usuarioEncontrado) {
            return res.status(400).send("El usuario no existe");
            }
        
        if(!isValidPassword(password,usuarioEncontrado)){
            return res.status(401).send("Lo ingresado no es correcto")
        }

        const token = jwt.sign({usuario: usuarioEncontrado.usuario},"coderhouse",{expiresIn: "1h"})

            res.cookie("coderCookieToken",token,{
                maxAge:360000,
                httpOnly: true
            })
            res.redirect("/home");
    } catch (error) {
        res.status(500).send("error interno del servidor");
    }
})





export default router;
