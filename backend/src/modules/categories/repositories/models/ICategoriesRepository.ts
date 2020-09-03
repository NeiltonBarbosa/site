import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import Category from '@modules/categories/entities/typeorm/Category';

export default interface ICategoriesRepository {
  findById(id: string): Promise<Category | undefined>;
  findBySlug(slug: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
  findMenu(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}
