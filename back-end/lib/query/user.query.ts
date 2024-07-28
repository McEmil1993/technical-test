import { db } from '../utils/db';


export const fetchUserByEmail = async (email: string) => {

    try {
const { result, error } = await db.preparedQueryFirst(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    
    return { result, error };
    } catch (err) {
        const error = err as Error;
        return { results: null, error };
    }

    
};

export const insertUser = async (name: string, email: string, password: string, role: string) => {
    try {
        const { results, error } = await db.preparedQuery(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );
        return { results, error };
    } catch (err) {
        const error = err as Error;
        return { results: null, error };
    }

};

export const fetchUserById = async (id: string) => {


    try {
        const { result, error } = await db.preparedQueryFirst(
            'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
            [id]
        );
        return { result, error };
    } catch (err) {
        const error = err as Error;
        return { results: null, error };
    }

};

export const fetchAllUsers = async () => {
    try {
        const { results, error } = await db.rawQuery(
            'SELECT id, name, email, role, created_at FROM users'
        );
        return { results, error };
    } catch (err) {
        const error = err as Error;
        return { results: null, error };
    }

};

export const updateUserById = async (id: string, name: string, email: string, role: string) => {
    try {
        const { results, error } = await db.preparedQuery(
            'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
            [name, email, role, id]
        );
        return { results, error };
    } catch (err) {
        const error = err as Error;
        return { results: null, error };
    }

};

export const deleteUserById = async (id: string) => {
    try {
        const { results, error } = await db.preparedQuery(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return { results, error };
    } catch (err) {
        const error = err as Error;
        return { results: null, error };
    }

};