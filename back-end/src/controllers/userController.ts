import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    fetchUserByEmail,
    insertUser,
    fetchUserById,
    fetchAllUsers,
    updateUserById,
    deleteUserById
} from '../../lib/query/user.query';
import { IUser, IUserReturn, IUSerToken } from '../../lib/interfaces/user.interfaces';
import { userLogin, userSchema } from '../../lib/schema/user.schema';
import { parse } from 'path';



export const register = async (req: Request, res: Response) => {

    const return_value: {
        result: number;
        message: string;
        data: IUser
    } = {
        result: 0,
        message: '',
        data: null!
    }
    try {
        // Validate request body
        const parsed = userSchema.parse(req.body);
        const { name, email, password, role } = parsed;
        // Check if the email already exists
        const { result: existingUser, error: fetchError } = await fetchUserByEmail(email);

        if (fetchError) {
            const err = fetchError as Error;
            throw new Error(err.message);
        }

        if (existingUser) {
            return_value.result = 400;
            return_value.message = 'Email already exists';
            return res.status(return_value.result).json(return_value);

        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userRole = role ?? 'user';
        // Insert new user
        const { results, error: insertError } = await insertUser(name, email, hashedPassword, userRole);

        if (insertError) {
            const err = insertError as Error;
            throw new Error(err.message);
        }

        const user_data: IUser = {
            id: (results as any).insertId,
            name: email,
            email: email,
            role: role,
        }

        // Generate JWT token
        const token = jwt.sign({ id: user_data.id, role: user_data.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        const user_token: IUSerToken = {
            token: token,
            name: user_data.name,
            email: user_data.email,
            role: user_data.role!
        }

        return_value.result = 200;
        return_value.message = 'Success Register!';
        return_value.data = user_token;
        // Respond with token
        res.status(return_value.result).json(return_value);

        // return_value.result = 201;
        // return_value.message = 'Success Register!';
        // return_value.data = user_data;

        // // Respond with success
        // res.status(return_value.result).json(return_value);


    } catch (error) {
        const err = error as Error;
        return_value.result = 400;
        return_value.message = err.message;
        return res.status(return_value.result).json(JSON.parse(err.message));

    }
};

export const login = async (req: Request, res: Response) => {
    const return_value: {
        result: number;
        message: string;
        data: IUser
    } = {
        result: 0,
        message: '',
        data: null!
    }
    try {
        const parsed = userLogin.parse(req.body);
        const { email, password } = parsed;
        // Check if the email already exists
 

        // Fetch user by email
        const { result, error } = await fetchUserByEmail(email);

        if (error) {
            const err = error as Error;
            throw new Error(err.message);
        }
        const user = result as IUser;

        if (!user) {
            return_value.result = 400;
            return_value.message = 'Invalid credentials';
            return res.status(return_value.result).json(return_value);
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password!);

        if (!isValidPassword) {
            return_value.result = 400;
            return_value.message = 'Wrong password';
            return res.status(return_value.result).json(return_value);
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        const user_token: IUSerToken = {
            token: token,
            name: user.name,
            email: user.email,
            role: user.role!
        }

        return_value.result = 200;
        return_value.message = 'Success Login!';
        return_value.data = user_token;
        // Respond with token
        res.status(return_value.result).json(return_value);

    } catch (error) {
        const err = error as Error;
        return_value.result = 400;
        return_value.message = err.message;
        return res.status(return_value.result).json(JSON.parse(err.message));
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    const return_value: {
        result: number;
        message: string;
        data: IUserReturn
    } = {
        result: 0,
        message: '',
        data: null!
    }
    try {
        const { results, error } = await fetchAllUsers();

        if (error) {
            const err = error as Error;
            throw new Error(err.message);
        }

        const result : IUserReturn = {
            data: results as IUser[]
        }

        return_value.result = 200;
        return_value.message = 'Success Fetch all User!';
        return_value.data = result;

        res.status(return_value.result).json(return_value);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { result, error } = await fetchUserById(id);

        if (error) {
            const err = error as Error;
            throw new Error(err.message);
        }

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const { results, error } = await updateUserById(id, name, email, role);

        if (error) {
            const err = error as Error;
            throw new Error(err.message);
        }

        res.json({ message: 'User updated successfully' });
        
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { results, error } = await deleteUserById(id);

        if (error) {
            const err = error as Error;
            throw new Error(err.message);
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const createUser = async (req: Request, res: Response) => {
    const return_value: {
        result: number;
        message: string;
        data: IUser
    } = {
        result: 0,
        message: '',
        data: null!
    }
    try {
        // Validate request body
        const parsed = userSchema.parse(req.body);
        const { name, email, password, role } = parsed;
        // Check if the email already exists
        const { result: existingUser, error: fetchError } = await fetchUserByEmail(email);

        if (fetchError) {
            const err = fetchError as Error;
            throw new Error(err.message);
        }

        if (existingUser) {
            return_value.result = 400;
            return_value.message = 'Email already exists';
            return res.status(return_value.result).json(return_value);

        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const { results, error: insertError } = await insertUser(name, email, hashedPassword, role);

        if (insertError) {
            const err = insertError as Error;
            throw new Error(err.message);
        }

        const user_data: IUser = {
            id: (results as any).insertId,
            name: email,
            email: email,
            role: role,
        }

        return_value.result = 201;
        return_value.message = 'Success Register!';
        return_value.data = user_data;

        // Respond with success
        res.status(return_value.result).json(return_value);


    } catch (error) {
        const err = error as Error;
        return_value.result = 400;
        return_value.message = err.message;
        return res.status(return_value.result).json(JSON.parse(err.message));

    }
};