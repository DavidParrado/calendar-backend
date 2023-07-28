import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import authRouter from './routes/auth.js';
import eventsRouter from './routes/events.js';
import { dbConnection } from './database/config.js';

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Directorio Publico
app.use( cors() );
app.use( express.static('public'));
app.use( express.json() );

// Rutas
// todo auth //crear, login, renew
app.use('/api/auth', authRouter)
app.use('/api/events', eventsRouter)
// todo: crud eventos


// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en ${ process.env.PORT }`);
})