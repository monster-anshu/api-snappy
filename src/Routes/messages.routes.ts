import { Router } from 'express';
import { send_message, get_messages } from '../Controllers/message.controller';
import { fetch_user } from '../Middleware/user.middleware';
export const router = Router();

router.use(fetch_user);
router.post('/:id', send_message);
router.get('/:id', get_messages);
