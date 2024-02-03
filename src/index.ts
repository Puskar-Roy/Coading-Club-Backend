import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from './controllers/authController';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import config from './config/config';
import CheckError from './util/checkError';
import errorHandler from './middleware/errorMiddleware';
import authRoutes from './routes/authRoutes';

const app: Express = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.json());
app.use(
  session({
    secret: 'fgnjfngfhngfgffgnfnfngf',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
import './database/connectDb';

app.use('/api/v0.1/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ success: true, message: 'API IS WORKING 🥳' });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new CheckError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`[⚡] Server Is Running on http://localhost:${config.PORT}`);
});

export default app;
