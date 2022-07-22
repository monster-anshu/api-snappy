import { Router } from 'express';
import { router as user_routes } from './Routes/user.routes';
import { router as auth_routes } from './Routes/auth.routes';
import { router as messages_routes } from './Routes/messages.routes';
import { handle_error } from './Utils/handle_error';
import cors from 'cors';
export const api = Router();

api.use(
  cors({
    origin: '*',
  }),
);
api.use('/auth', auth_routes);
api.use('/user', user_routes);
api.use('/chat', messages_routes);
api.use(handle_error);
