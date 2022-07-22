import { Router } from 'express';
import { set_avatar, all_users, get_me } from '../Controllers/user.controller';
import { fetch_user } from '../Middleware/user.middleware';
export const router = Router();

router.use(fetch_user);
router.patch('/setAvatar', set_avatar);
router.get('/allusers', all_users);
router.get('/me', get_me);
