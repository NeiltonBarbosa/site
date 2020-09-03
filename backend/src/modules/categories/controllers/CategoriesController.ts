import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCategoryService from '../services/CreateCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';
import ListCategoryService from '../services/ListCategoryService';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategoryService = container.resolve(ListCategoryService);

    const categories = await listCategoryService.execute();

    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      slug,
      is_menu,
      redirect_page,
      category_parent_id,
    } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({
      name,
      slug,
      is_menu,
      redirect_page,
      category_parent_id,
    });

    return response.status(201).json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      slug,
      is_menu,
      redirect_page,
      category_parent_id,
    } = request.body;

    const { id } = request.params;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    const category = await updateCategoryService.execute({
      id,
      name,
      slug,
      is_menu,
      redirect_page,
      category_parent_id,
    });

    return response.json(category);
  }
}
