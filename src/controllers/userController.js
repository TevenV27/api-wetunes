import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendConfirmationEmail } from '../utils/emailService.js';

export const login = async (req, res) => {

    const jwtSecret = process.env.JWT_SECRET;
    try {
        let { email, password } = req.body;
        // Convierte el email a minúsculas
        email = email.toLowerCase();

        const user = await User.findOne( {email} );

        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

        res.status(200).json({ token, email: user.email, firstname: user.firstname, lastname: user.lastname, avataruser: user.avataruser, role: user.role });
    } catch (error) {
        console.error("Error en el proceso de login:", error);
        res.status(500).json({ error: 'Error del servidor' });
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

        // Convertir firstname y lastname a la primera letra mayúscula y el resto en minúsculas
        const formattedFirstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
        const formattedLastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();

        // Convertir el email a minúsculas
        const formattedEmail = email.toLowerCase();

        // Crear un nuevo usuario en la base de datos
        const newUser = new User({
            firstname: formattedFirstname,
            lastname: formattedLastname,
            email: formattedEmail,
            password: hashedPassword,
        });

        await newUser.save();

        // // Generar un token para el nuevo usuario
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });

        // Enviar correo de confirmación
        await sendConfirmationEmail(newUser.email, newUser.firstname);

        res.status(200).json({ token, email: newUser.email, firstname: newUser.firstname, lastname: newUser.lastname, avataruser: newUser.avataruser, role: newUser.role });
    } catch (error) {
        console.error("Error en el proceso de registro:", error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const userEmail = req.params.email; // Asumiendo que el parámetro en la URL se llama 'email'
        const user = await User.findOne({ email: userEmail }, { password: 0 }); // Excluye el campo 'password'

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error en el proceso de obtener usuario por email:", error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}
