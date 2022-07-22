import { Router } from 'express';
import { register, login } from '../Controllers/auth.controller';
export const router = Router();

router.post('/register', register);
router.post('/login', login);
