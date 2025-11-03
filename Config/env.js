import {config} from 'dotenv'

config({
    path: '.env'
});

export const {DB_URI,PORT,JWT_EXPIRES_IN,JWT_SECRET} = process.env;
