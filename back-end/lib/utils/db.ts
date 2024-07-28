import { createPool, ConnectionOptions } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();


export const createSQLConnection = (connectionOptions: ConnectionOptions) => {
    const BASE_SQL = createPool(connectionOptions);

    return {
        preparedQuery: async (query: string, values: (string | number | bigint)[]) => {
            try {
                const [results, columnDefinition] = await BASE_SQL.execute(query, values);
                return { results, columnDefinition, error: null };
            } catch (error) {
                return { results: null, columnDefinition: null, error };
            }
        },

        
        preparedQueryFirst: async (query: string, values: string[]) => {
            try {
                const [results] = await BASE_SQL.execute(query, values);
                const singleResult = Array.isArray(results) && results.length > 0 ? results[0] : null;
                return { result: singleResult, error: null };
            } catch (error) {
                return { result: null, error: error instanceof Error ? { message: error.message } : { message: 'Unknown error' } };
            }
        },

        rawQuery: async (query: string) => {
            try {
                const [results, columnDefinition] = await BASE_SQL.execute(query);
                return { results, columnDefinition, error: null };
            } catch (error) {
                return { results: null, columnDefinition: null, error };
            }
        },

    };
};

// Define your database connection options
const connectionOptions = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    port: parseInt(process.env.SQL_PORT || '3306', 10),
};

// Create the SQL connection instance
export const db = createSQLConnection(connectionOptions);