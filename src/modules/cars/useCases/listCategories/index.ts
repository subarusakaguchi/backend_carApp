import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';
import { ListCategoriesController } from './ListCategoryController';

const categoriesRepository = null;

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
);

export { listCategoriesController };
