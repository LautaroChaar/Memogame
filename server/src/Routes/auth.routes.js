import { Router } from 'express';
import { registerUser, userLogin } from '../controllers/auth.controller.js';

const routerAuth = new Router();

routerAuth.post('/login',userLogin);

routerAuth.post('/register', registerUser);

export { routerAuth };