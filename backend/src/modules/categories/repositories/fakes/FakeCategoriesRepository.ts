import { v4 } from 'uuid';

import Category from '@modules/categories/entities/typeorm/Category';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '../models/ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findBySlug(slug: string): Promise<Category | undefined> {
    const category = this.categories.find(
      findCategory => findCategory.slug === slug,
    );

    return category;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = this.categories.find(
      findCategory => findCategory.id === id,
    );

    return category;
  }

  public async findMenu(): Promise<Category[]> {
    const menus = this.categories.filter(category => category.is_menu);

    return menus;
  }

  public async findAll(): Promise<Category[]> {
    return this.categories;
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: v4() }, data);

    this.categories.push(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    this.categories[categoryIndex] = category;

    return category;
  }
}

export default FakeCategoriesRepository;
