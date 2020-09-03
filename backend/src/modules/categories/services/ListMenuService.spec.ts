import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ListMenuService from './ListMenuService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listMenuService: ListMenuService;

describe('List Menu', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listMenuService = new ListMenuService(fakeCategoriesRepository);
  });

  it('should be able to list categories if the same is menu', async () => {
    await fakeCategoriesRepository.create({
      name: 'New category',
      slug: 'new-category',
    });

    const categoryMenu = await fakeCategoriesRepository.create({
      name: 'Category menu',
      slug: 'category-menu',
      is_menu: true,
    });

    const menu = await listMenuService.execute();

    expect(menu).toEqual([categoryMenu]);
  });
});
