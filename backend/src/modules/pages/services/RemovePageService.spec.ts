import AppError from '@shared/errors/AppError';
import FakePagesRepository from '../repositories/fakes/FakePagesRepository';
import RemovePageService from './RemovePageService';

let fakePagesRepository: FakePagesRepository;
let removePageService: RemovePageService;

describe('Remove Page', () => {
  beforeEach(() => {
    fakePagesRepository = new FakePagesRepository();
    removePageService = new RemovePageService(fakePagesRepository);
  });

  it('should be able remove page', async () => {
    const page = await fakePagesRepository.create({
      title: 'New page',
      html: '<html>New page</html>',
      slug: 'new-page',
    });

    await removePageService.execute({ id: page.id });

    const findPage = await fakePagesRepository.findById(page.id);

    expect(findPage).toBeUndefined();
  });

  it('not should be able remove non-existing page', async () => {
    await expect(
      removePageService.execute({ id: 'non-existing-page' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
