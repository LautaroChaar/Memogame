import { Router } from 'express';
import { updateUserScore } from '../controllers/score.controller.js';

const routerScore = new Router();

routerScore.post('/score/', updateUserScore );

export { routerScore };