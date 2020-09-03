import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMenuService from '../services/ListMenuService';

export default class MenusController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMenuService = container.resolve(ListMenuService);

    const menus = await listMenuService.execute();

    return response.json(menus);
  }
}
