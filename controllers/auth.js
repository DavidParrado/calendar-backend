import { request, response } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js';
import { generarJWT } from '../helpers/jwt.js';

export const crearUsuario = async( req = request, res = response ) => {
  
  const { name, email, password } = req.body;

  try {

    let usuario = await Usuario.findOne({ email });

    if( usuario ) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo'
      });
    }

    usuario = new Usuario( req.body );

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);
    
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}


export const loginUsuario = async( req = request, res = response ) => {
  
  const { email, password } = req.body;

  try {
    
    const usuario = await Usuario.findOne({ email });

    if( !usuario ) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }
    
    const validPassword = bcrypt.compareSync( password, usuario.password )
  
    if( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })
    
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      msg: 'hable con el administrador'
    })
  }

}


export const revalidarToken = async ( req = request, res = response ) => {
  
  const { uid, name } = req;

  try {

    const token = await generarJWT( uid, name );
    
    res.status(200).json({
      ok: true,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'hable con el admin'
    })
  }

}