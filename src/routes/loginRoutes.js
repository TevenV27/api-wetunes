import express from 'express';
import { login } from '../controllers/userController.js';

const router = express.Router();

router.post('/', login); // Ruta para iniciar sesión

export default router;