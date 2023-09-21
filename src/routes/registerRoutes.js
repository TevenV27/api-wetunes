import express from 'express';
import { register } from '../controllers/userController.js';

const router = express.Router();

router.post('/', register); // Ruta para el registro

export default router;