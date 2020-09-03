import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import UpdateCategoryService from './UpdateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let updateCategoryService: UpdateCategoryService;

describe('Update Category', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateCategoryService = new UpdateCategoryService(fakeCategoriesRepository);
  });

  it('should be able update the category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'New category',
      slug: 'new-category',
    });

    const updatedCategory = await updateCategoryService.execute({
      id: category.id,
      name: 'Update category',
      slug: 'update-category',
    });

    expect(updatedCategory.name).toBe('Update category');
    expect(updatedCategory.slug).toBe('update-category');
  });

  it('not should be able update non-existing category', async () => {
    await expect(
      updateCategoryService.execute({
        id: 'non-existing-category',
        name: 'Update category',
        slug: 'update-category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not should be abe to update category with same slug from another', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'New category',
      slug: 'new-category',
    });

    await fakeCategoriesRepository.create({
      name: 'Other category',
      slug: 'other-category',
    });

    await expect(
      updateCategoryService.execute({
        id: category.id,
        name: 'New category',
        slug: 'other-category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
