import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose.connect(
      `${process.env.MONGODB_CONNECT}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      (err) => {
        if (err) {
          console.warn(`MongoDB not Connected: ${err}`);
        } else {
          console.info(`MongoDB Connected`);
        }
      }
    );
  }
}

export default new Database();
