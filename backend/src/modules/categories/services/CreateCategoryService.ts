import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Category from '../entities/typeorm/Category';
import ICategoriesRepository from '../repositories/models/ICategoriesRepository';

interface IRequest {
  name: string;
  slug: string;
  is_menu?: boolean;
  redirect_page?: string;
  category_parent_id?: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    name,
    slug,
    is_menu,
    redirect_page,
    category_parent_id,
  }: IRequest): Promise<Category> {
    const categorySlugExists = await this.categoriesRepository.findBySlug(slug);

    if (categorySlugExists) {
      throw new AppError('This category slug already exists.');
    }

    const category = await this.categoriesRepository.create({
      name,
      slug,
      is_menu,
      redirect_page,
      category_parent_id,
    });

    return category;
  }
}

export default CreateCategoryService;
