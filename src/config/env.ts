import dotenv from 'dotenv';
dotenv.config();

const ENV = {
    NODE_ENV:process.env.NODE_ENV,
    PORT:process.env.PORT,
    API_V:process.env.API_V,
    API_TOKEN:process.env.API_TOKEN,
    DB_URL:process.env.DB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRATION_TIME:process.env.JWT_EXPIRATION_TIME
}

export default ENV;