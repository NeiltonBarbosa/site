import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPagesRepository from '../repositories/models/IPagesRepository';

interface IRequest {
  id: string;
}

@injectable()
class RemovePageService {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const pageExists = await this.pagesRepository.findById(id);

    if (!pageExists) {
      throw new AppError('Page not found.');
    }

    await this.pagesRepository.remove(id);
  }
}

export default RemovePageService;
