import Page from '@modules/pages/entities/typeorm/Page';
import ICreatePageDTO from '@modules/pages/dtos/ICreatePageDTO';

export default interface IPagesRepository {
  create(data: ICreatePageDTO): Promise<Page>;
  save(page: Page): Promise<Page>;
  remove(id: string): Promise<void>;
  findById(id: string): Promise<Page | undefined>;
  findBySlug(slug: string): Promise<Page | undefined>;
  findByCategorySlug(category_slug: string): Promise<Page[]>;
}
