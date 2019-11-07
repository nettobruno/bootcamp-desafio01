import { Router } from 'express';
import ProjectController from './app/controllers/ProjectController';

const routes = new Router();

routes.post('/project', ProjectController.store);

export default routes;
