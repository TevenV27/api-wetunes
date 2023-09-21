import express, { json } from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { connect } from './src/utils/db.js';
import registerRoutes from './src/routes/registerRoutes.js';
import loginRoutes from './src/routes/loginRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

// Settings CORS
app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:3000',
        'https://wetunes.vercel.app',
      ]
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
  
      if (!origin) {
        return callback(null, true);
      }
  
      return callback(new Error('Not allowed by CORS'));
    }
  }));

// Conectar a la base de datos
connect();

app.get('/', (req, res) => {
    res.json({ message: 'Api wetunes app' });
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});