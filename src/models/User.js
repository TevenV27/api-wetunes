import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    avataruser: {
        type: String,
        default: 'default-avatar.png',
    },
    role: {
        type: String,
        default: "user",
    },
    confirmAccount: {
        type: Boolean,
        default: false,
    },
    typeAccount: {
        type: String,
        default: "freemium",
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Utiliza una expresión regular para validar el formato del correo electrónico
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
            },
            message: 'El correo electrónico debe ser válido.',
        },
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
