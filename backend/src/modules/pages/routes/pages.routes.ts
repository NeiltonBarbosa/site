import { Router } from 'express';

import PageController from '../controllers/PagesController';

const pagesRouter = Router();
const pagesController = new PageController();

pagesRouter.post('/', pagesController.create);
pagesRouter.put('/:id', pagesController.update);
pagesRouter.delete('/:id', pagesController.destroy);

export default pagesRouter;
