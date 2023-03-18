import express from 'express';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import './config/database.js';
import './models/user.js';
import { passportConfig } from './config/passport.js';
import indexRoute from './routes/index.js';
import userRoute from './routes/users.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app       = express();

passportConfig(passport);

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRoute);
app.use(userRoute);

app.listen(3000);