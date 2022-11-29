import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: Number(process.env.PORT!),
  AUTH_SECRET: String(process.env.AUTH_SECRET!),
  TOKEN_EXPIRATION: String(process.env.TOKEN_EXPIRATION!),
};

export default env;
