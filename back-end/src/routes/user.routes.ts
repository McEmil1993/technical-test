import { Router } from 'express';
import {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser
} from '../controllers/userController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateJWT, getAllUsers);
router.get('/users/edit/:id', authenticateJWT, getUserById);
router.post('/users/create', authenticateJWT, createUser);
router.put('/users/update/:id', authenticateJWT, updateUser);
router.delete('/users/delete/:id', authenticateJWT, deleteUser);

export default router;