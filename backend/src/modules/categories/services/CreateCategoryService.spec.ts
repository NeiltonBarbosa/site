import AppError from '@shared/errors/AppError';
import CreateCategoryService from './CreateCategoryService';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';

let categoriesRepository: FakeCategoriesRepository;
let createCategoryService: CreateCategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    categoriesRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryService.execute({
      name: 'New Category',
      slug: 'new-category',
    });

    expect(category).toHaveProperty('id');
  });

  it('not should be abe to create a new category with same slug from another', async () => {
    await createCategoryService.execute({
      name: 'New Category',
      slug: 'new-category',
    });

    await expect(
      createCategoryService.execute({
        name: 'New Category',
        slug: 'new-category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
