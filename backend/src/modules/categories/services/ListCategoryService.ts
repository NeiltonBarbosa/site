import { injectable, inject } from 'tsyringe';

import ICategoriesRepository from '../repositories/models/ICategoriesRepository';
import Category from '../entities/typeorm/Category';

@injectable()
class ListCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}

export default ListCategoryService;
