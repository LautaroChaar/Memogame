import { Router } from 'express';
import { verifyToken } from '../../Auth/index.js';
import { getUserData } from '../controllers/home.controller.js';

const routerHome = new Router();

routerHome.get('/home/:user', verifyToken, getUserData );

export { routerHome };