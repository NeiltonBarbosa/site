import { Router } from 'express';

import categoriesRouter from '@modules/categories/routes/categories.routes';
import menusRouter from '@modules/categories/routes/menus.routes';
import pagesRouter from '@modules/pages/routes/pages.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/menus', menusRouter);
routes.use('/pages', pagesRouter);

export default routes;
