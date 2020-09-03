import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ListCategoryService from './ListCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoryService: ListCategoryService;

describe('List Category', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoryService = new ListCategoryService(fakeCategoriesRepository);
  });

  it('should be able listing categories', async () => {
    const newCategory = await fakeCategoriesRepository.create({
      name: 'New category',
      slug: 'new-category',
    });

    const otherCategory = await fakeCategoriesRepository.create({
      name: 'Other category',
      slug: 'other-category',
    });

    const categories = await listCategoryService.execute();

    expect(categories).toEqual([newCategory, otherCategory]);
  });
});
