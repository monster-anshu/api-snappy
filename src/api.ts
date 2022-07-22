import { Router } from 'express';
import { router as user_routes } from './Routes/user.routes';
import { router as auth_routes } from './Routes/auth.routes';
import { router as messages_routes } from './Routes/messages.routes';
import { handle_error } from './Utils/handle_error';
import cors, { CorsOptions } from 'cors';
export const api = Router();

const corsOption: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};
api.use(cors(corsOption));
api.use('/auth', auth_routes);
api.use('/user', user_routes);
api.use('/chat', messages_routes);
api.use(handle_error);
