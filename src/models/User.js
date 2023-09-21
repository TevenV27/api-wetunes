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
        default: '/uploads/default-avatar.png',
    },
    role: {
        type: String,
        default: "user",
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
});

const User = mongoose.model('User', userSchema);

export default User;