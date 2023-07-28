/*
  Event Routes
  /api/events
*/

import { Router } from 'express';
import { check } from 'express-validator';

import { validarJWT } from '../middlewares/validar-jwt.js';
import { getEventos, crearEvento, actualizarEvento, eliminarEvento } from '../controllers/events.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { isDate } from '../helpers/isDate.js';

const router = Router();

router.use( validarJWT );

router.get('/', getEventos );

router.post('/',[
  check('title', 'El titulo es obligatorio').notEmpty(),
  check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
  check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
  validarCampos
], crearEvento );

router.put('/:id',[
  check('title', 'El titulo es obligatorio').notEmpty(),
  check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
  check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
  validarCampos
], actualizarEvento );

router.delete('/:id', eliminarEvento );









export default router;