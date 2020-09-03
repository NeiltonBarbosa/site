import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import FakePagesRepository from '../repositories/fakes/FakePagesRepository';
import CreatePageService from './CreatePageService';

let fakePagesRepository: FakePagesRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createPageService: CreatePageService;

describe('Create Page', () => {
  beforeEach(() => {
    fakePagesRepository = new FakePagesRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createPageService = new CreatePageService(
      fakePagesRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able create a new page', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'New category',
      slug: 'new-category',
    });

    const page = await createPageService.execute({
      title: 'New page',
      slug: 'new-page',
      html: '<h1>Hello World</h1>',
      category_id: category.id,
    });

    expect(page).toHaveProperty('id');
    expect(page.title).toEqual('New page');
  });

  it('not should be able to create a new page with same slug from another', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'New category',
      slug: 'new-category',
    });

    await createPageService.execute({
      title: 'New page',
      slug: 'new-page',
      html: '<h1>Hello World</h1>',
      category_id: category.id,
    });

    await expect(
      createPageService.execute({
        title: 'Other page',
        slug: 'new-page',
        html: '<h1>Hello World</h1>',
        category_id: category.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not should be able to create a new page with not exists category', async () => {
    await expect(
      createPageService.execute({
        title: 'New page',
        slug: 'new-page',
        html: '<h1>Hello world</h1>',
        category_id: 'non-existing-category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
