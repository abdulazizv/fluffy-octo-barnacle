import { Knex } from 'knex'
import 'dotenv/config'

const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const config: {[key: string]: Knex.Config} = {
    development: {
        client: DB_CLIENT,
        connection:{
            database:DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
            port: +DB_PORT,
            host: DB_HOST
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './database/migrations'
        },
        seeds:{
            directory: './database/seeds'
        },
    },
    staging:{
        client:DB_CLIENT,
        connection:{
            database:DB_NAME,
            user:DB_USER,
            password: DB_PASSWORD,
            port: +DB_PORT,
            host: DB_HOST
        },
        pool:{
            min:2,
            max:10
        },
        migrations:{
            tableName:'knex_migrations'
        }
    },
    production: {
        client: DB_CLIENT,
        connection: {
          database: DB_NAME,
          user: DB_USER,
          password: DB_PASSWORD,
          port: +DB_PORT,
          host: DB_HOST,
        },
        pool: {
          min: 2,
          max: 10,
        },
        migrations: {
          tableName: 'knex_migrations',
        },
      },
}

export default config;