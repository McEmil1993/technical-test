import { z } from 'zod';

// User schema for validation
export const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(13).email(),
    password: z.string().min(6),
    role: z.string()
});

export const userLogin = z.object({
    email: z.string().min(13).email(),
    password: z.string().min(6),

});