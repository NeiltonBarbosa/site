import { container } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/models/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/repositories/typeorm/CategoriesRepository';

import IPagesRepository from '@modules/pages/repositories/models/IPagesRepository';
import PagesRepository from '@modules/pages/repositories/typeorm/PagesRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IPagesRepository>(
  'PagesRepository',
  PagesRepository,
);
