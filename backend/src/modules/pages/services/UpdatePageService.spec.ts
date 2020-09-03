import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import AppError from '@shared/errors/AppError';
import FakePagesRepository from '../repositories/fakes/FakePagesRepository';
import UpdatePageService from './UpdatePageService';

let fakePagesRepository: FakePagesRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let updatePageService: UpdatePageService;

describe('Update Page', () => {
  beforeEach(() => {
    fakePagesRepository = new FakePagesRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updatePageService = new UpdatePageService(
      fakePagesRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able update the page', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'New category',
      slug: 'new-category',
    });

    const page = await fakePagesRepository.create({
      title: 'New page',
      slug: 'new-page',
      html: '<h1>New Page</h1>',
      category_id: category.id,
    });

    const updatedPage = await updatePageService.execute({
      id: page.id,
      title: 'Updated Page',
      slug: 'updated-page',
      html: '<h1>Updated Page</h1>',
      category_id: category.id,
    });

    expect(updatedPage.title).toBe('Updated Page');
  });

  it('not should be able update non-existing page', async () => {
    await expect(
      updatePageService.execute({
        id: 'non-existing-page',
        title: 'title',
        slug: 'slug',
        html: 'html',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not should be able to update page with not exists category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'New category',
      slug: 'new-category',
    });

    const page = await fakePagesRepository.create({
      title: 'New page',
      slug: 'new-page',
      html: '<h1>New page</h1>',
      category_id: category.id,
    });

    await expect(
      updatePageService.execute({
        id: page.id,
        title: 'New page',
        slug: 'new-page',
        html: '<h1>New page</h1>',
        category_id: 'non-existing-category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not should be abe to update page with same slug from another', async () => {
    await fakePagesRepository.create({
      title: 'New page',
      slug: 'new-page',
      html: '<h1>New Page</h1>',
    });

    const page = await fakePagesRepository.create({
      title: 'Other page',
      slug: 'other-page',
      html: '<h1>Other Page</h1>',
    });

    await expect(
      updatePageService.execute({
        id: page.id,
        title: 'Other page',
        slug: 'new-page',
        html: '<h1>Other page</h1>',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
