import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePageService from '../services/CreatePageService';
import UpdatePageService from '../services/UpdatePageService';
import RemovePageService from '../services/RemovePageService';

export default class PageController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, slug, html, category_id } = request.body;

    const createPageService = container.resolve(CreatePageService);

    const page = await createPageService.execute({
      title,
      slug,
      html,
      category_id,
    });

    return response.status(201).json(page);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, slug, html, category_id } = request.body;

    const { id } = request.params;

    const updatePageService = container.resolve(UpdatePageService);

    const updatedPage = await updatePageService.execute({
      id,
      title,
      slug,
      html,
      category_id,
    });

    return response.json(updatedPage);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const removePageService = container.resolve(RemovePageService);

    await removePageService.execute({ id });

    return response.status(204).send();
  }
}
