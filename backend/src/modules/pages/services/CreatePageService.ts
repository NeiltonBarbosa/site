import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '@modules/categories/repositories/models/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import Page from '../entities/typeorm/Page';
import IPagesRepository from '../repositories/models/IPagesRepository';

interface IRequest {
  title: string;
  slug: string;
  html: string;
  category_id?: string;
}

@injectable()
class CreatePageService {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ title, slug, html, category_id }: IRequest): Promise<Page> {
    const pageSlugExists = await this.pagesRepository.findBySlug(slug);

    if (pageSlugExists) {
      throw new AppError('This page slug already exists.');
    }

    if (category_id) {
      const categoryExists = await this.categoriesRepository.findById(
        category_id,
      );

      if (!categoryExists) {
        throw new AppError('Category not exists.');
      }
    }

    const page = await this.pagesRepository.create({
      title,
      slug,
      html,
      category_id,
    });

    return page;
  }
}

export default CreatePageService;
