import {config} from 'dotenv'

config({
    path: '.env'
});

export const {DB_URI,TEST_DB_URI,PORT,JWT_EXPIRES_IN,JWT_SECRET,ARCJET_KEY,NODE_ENV} = process.env;
