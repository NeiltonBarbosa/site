import { v4 } from 'uuid';

import Page from '@modules/pages/entities/typeorm/Page';
import ICreatePageDTO from '@modules/pages/dtos/ICreatePageDTO';
import IPagesRepository from '../models/IPagesRepository';

class FakePagesRepository implements IPagesRepository {
  private pages: Page[] = [];

  public async create({
    title,
    slug,
    html,
    category_id,
  }: ICreatePageDTO): Promise<Page> {
    const page = new Page();

    Object.assign(page, { id: v4(), title, slug, html, category_id });

    this.pages.push(page);

    return page;
  }

  public async save(page: Page): Promise<Page> {
    const findIndex = this.pages.findIndex(
      pageIndex => pageIndex.id === page.id,
    );

    this.pages[findIndex] = page;

    return page;
  }

  public async remove(id: string): Promise<void> {
    const pageIndex = this.pages.findIndex(findIndex => findIndex.id === id);

    this.pages.splice(pageIndex, 1);
  }

  public async findById(id: string): Promise<Page | undefined> {
    const page = this.pages.find(findPage => findPage.id === id);

    return page;
  }

  public async findBySlug(slug: string): Promise<Page | undefined> {
    const page = this.pages.find(findPage => findPage.slug === slug);

    return page;
  }

  public async findByCategorySlug(category_slug: string): Promise<Page[]> {
    const pages = this.pages.filter(
      filterPage => filterPage.category.slug === category_slug,
    );

    return pages;
  }
}

export default FakePagesRepository;
