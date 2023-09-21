import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body; 
    const secret = process.env.JWT_SECRET;
    console.log("Datos recibidos:", req.body);
    try {
        const user = await User.findOne({ email }); 
        console.log("Usuario encontrado:", user);
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Las contraseñas coinciden:", isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        res.status(200).json({ token, email: user.email }); 
    } catch (error) {
        console.log("Error en el proceso de login:", error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const register = async (req, res) => {
    console.log('Iniciando función de registro');
    
    const { firstname, lastname, email, password } = req.body;
    const secret = process.env.JWT_SECRET;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Si el usuario no existe, hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario en la base de datos
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // // Generar un token para el nuevo usuario
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });

        res.status(201).json({ token, email: newUser.email });
    } catch (error) {
        console.error("Error en el proceso de registro:", error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
