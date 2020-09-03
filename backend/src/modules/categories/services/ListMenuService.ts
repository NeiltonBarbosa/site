import { injectable, inject } from 'tsyringe';
import Category from '../entities/typeorm/Category';
import ICategoriesRepository from '../repositories/models/ICategoriesRepository';

@injectable()
class MenuService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const menu = await this.categoriesRepository.findMenu();

    return menu;
  }
}

export default MenuService;
