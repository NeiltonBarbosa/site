import { Repository, getRepository } from 'typeorm';

import Category from '@modules/categories/entities/typeorm/Category';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '../models/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(data);

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id);

    return category;
  }

  public async findBySlug(slug: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: {
        slug,
      },
    });

    return category;
  }

  public async findMenu(): Promise<Category[]> {
    const menu = await this.ormRepository.find({
      where: {
        is_menu: true,
      },
    });

    return menu;
  }

  public async findAll(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }
}

export default CategoriesRepository;
