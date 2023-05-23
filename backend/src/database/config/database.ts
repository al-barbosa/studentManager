import { Options } from 'sequelize';
require('dotenv').config()


const config: Options = {

  username: process.env.DB_USER || 'root',

  password: process.env.DB_PASS || 'senha',

  database: process.env.DB_NAME || 'educat_db',

  host: process.env.DB_HOST || 'localhost',

  port: Number(process.env.DB_PORT) || 3306,

  dialect: 'mysql',

}


export = config;