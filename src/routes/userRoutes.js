import express from 'express';
import { getUserByEmail } from '../controllers/userController.js';

const router = express.Router();

router.get('/:email', getUserByEmail); // Ruta para iniciar sesión

export default router;