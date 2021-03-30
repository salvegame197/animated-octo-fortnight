import './config/dotenv';
import './database/mongodb';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import recoveryRoutes from './routes/recovery';

const whiteList = [`'${process.env.API_DOMAIN}'`];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not alloewd by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user', userRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/recovery', recoveryRoutes);
  }
}

export default new App().app;
