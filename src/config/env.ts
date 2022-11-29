import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: Number(process.env.PORT!),
  AUTH_SECRET: String(process.env.AUTH_SECRET!),
  TOKEN_EXPIRATION: String(process.env.TOKEN_EXPIRATION!),
  SUPER_ADMIN_EMAIL: String(process.env.SUPER_ADMIN_EMAIL!),
  SUPER_ADMIN_PASSWORD: String(process.env.SUPER_ADMIN_EMAIL!),
  CORS_ORIGIN: String(process.env.CORS_ORIGIN!),
};

export default env;
