import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Category from '../entities/typeorm/Category';
import ICategoriesRepository from '../repositories/models/ICategoriesRepository';

interface IRequest {
  id: string;
  name: string;
  slug: string;
  is_menu?: boolean;
  redirect_page?: string;
  category_parent_id?: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    id,
    name,
    slug,
    is_menu,
    redirect_page,
    category_parent_id,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    const categorySlugExists = await this.categoriesRepository.findBySlug(slug);

    if (categorySlugExists && categorySlugExists.id !== id) {
      throw new AppError('This category slug already exists.');
    }

    Object.assign(category, {
      name,
      slug,
      is_menu,
      redirect_page,
      category_parent_id,
    });

    await this.categoriesRepository.save(category);

    return category;
  }
}

export default UpdateCategoryService;
