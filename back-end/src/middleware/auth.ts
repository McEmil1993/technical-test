import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload, } from '../../lib/types/jwt.payload.types';


export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const return_value : {
        result: number;
        message: string;
    } = {
        result: 0,
        message: ''
    }

    try {
        // Extract token from the 'Authorization' header
        const loginToken = req.headers['authorization']?.split(' ')[1] || ''; // Assuming Bearer scheme 

        if (!loginToken) {
            return_value.result = 401;
            return_value.message = 'Unauthorized: Token missing';
            return res.status( return_value.result).json(return_value);
        }

        const jsonData = jwt.verify(loginToken, process.env.JWT_SECRET as string);
        const decoded = jsonData as JwtPayload;

        return_value.result = 200;
        return_value.message = JSON.stringify(decoded);

        console.log('result:: ', return_value);
        
        next();
    } catch (err) {
        const error = err as Error;
        return_value.result = 403;
        return_value.message = 'Forbidden: Invalid token';

        console.error('Authentication error:', error.message);

        res.status(return_value.result).json(return_value);
    }
};