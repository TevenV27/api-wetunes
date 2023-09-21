import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        const secret = process.env.JWT_SECRET;

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded.id;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Token no válido' });
    }
};

export default authMiddleware;