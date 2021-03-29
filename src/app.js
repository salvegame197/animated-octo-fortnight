import './config/dotenv';
import './database/mongodb';
import express from 'express';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import recoveryRoutes from './routes/recovery';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user', userRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/recovery', recoveryRoutes);
  }
}

export default new App().app;
