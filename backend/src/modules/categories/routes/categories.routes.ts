import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

const categoriesValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    slug: Joi.string().required(),
    is_menu: Joi.boolean(),
    rediret_page: Joi.string(),
    category_parent_id: Joi.string(),
  },
});

categoriesRouter.get('/', categoriesController.index);

categoriesRouter.post('/', categoriesValidation, categoriesController.create);

categoriesRouter.put('/:id', categoriesValidation, categoriesController.update);

export default categoriesRouter;
