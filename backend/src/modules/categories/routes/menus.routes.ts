import { Router } from 'express';

import MenusController from '../controllers/MenusController';

const menusRouter = Router();
const menusController = new MenusController();

menusRouter.get('/', menusController.index);

export default menusRouter;
