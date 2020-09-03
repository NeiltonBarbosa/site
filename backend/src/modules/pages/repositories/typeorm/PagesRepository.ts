import ICreatePageDTO from '@modules/pages/dtos/ICreatePageDTO';
import { Repository, getRepository } from 'typeorm';
import Page from '@modules/pages/entities/typeorm/Page';
import IPagesRepository from '../models/IPagesRepository';

class PagesRepository implements IPagesRepository {
  private ormRepository: Repository<Page>;

  constructor() {
    this.ormRepository = getRepository(Page);
  }

  public async create({
    title,
    slug,
    html,
    category_id,
  }: ICreatePageDTO): Promise<Page> {
    const page = this.ormRepository.create({
      title,
      slug,
      html,
      category_id,
    });

    await this.ormRepository.save(page);

    return page;
  }

  public async save(page: Page): Promise<Page> {
    return this.ormRepository.save(page);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<Page | undefined> {
    const page = await this.ormRepository.findOne(id);

    return page;
  }

  public async findBySlug(slug: string): Promise<Page | undefined> {
    const page = await this.ormRepository.findOne({
      where: {
        slug,
      },
    });

    return page;
  }

  public async findByCategorySlug(category_slug: string): Promise<Page[]> {
    const pages = await this.ormRepository.find({
      where: {
        category: {
          slug: category_slug,
        },
      },
    });

    return pages;
  }
}

export default PagesRepository;
