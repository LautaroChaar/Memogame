import dotenv from 'dotenv';
dotenv.config();

export const config = {
  isAdmin: true,

  atlas: {
    strConn:`mongodb+srv://lautarochaar:memogame@cluster0.xwcnhkg.mongodb.net/memogame?retryWrites=true&w=majority`
  },

  server: {
    PERS: process.env.PERS,
    SECRET_KEY: process.env.SECRET_KEY,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    URL: process.env.URL || 'http://localhost:3000'
  }
}