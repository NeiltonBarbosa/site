import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/models/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import IPagesRepository from '../repositories/models/IPagesRepository';
import Page from '../entities/typeorm/Page';

interface IRequest {
  id: string;
  title: string;
  slug: string;
  html: string;
  category_id?: string;
}

@injectable()
class UpdatePageService {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    id,
    title,
    slug,
    html,
    category_id,
  }: IRequest): Promise<Page> {
    const page = await this.pagesRepository.findById(id);

    if (!page) {
      throw new AppError('Page not found.');
    }

    const pageSlugExists = await this.pagesRepository.findBySlug(slug);

    if (pageSlugExists && pageSlugExists.id !== id) {
      throw new AppError('This page slug already exists.');
    }

    page.title = title;
    page.slug = slug;
    page.html = html;

    if (category_id) {
      const category = await this.categoriesRepository.findById(category_id);

      if (!category) {
        throw new AppError('Category not exists.');
      }

      page.category_id = category_id;
    }

    await this.pagesRepository.save(page);

    return page;
  }
}

export default UpdatePageService;
