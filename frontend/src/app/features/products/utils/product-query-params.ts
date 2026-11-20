import { ParamMap, Params } from '@angular/router';
import { ProductFilter } from 'src/app/core/models';

export const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 50;

export interface ProductListState {
  filter: ProductFilter;
  page: number;
  size: number;
}

const toNumber = (value: string | null): number | undefined => {
  if (value === null || value.trim() === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

export function queryParamsToState(params: ParamMap): ProductListState {
  const filter: ProductFilter = {};

  const search = params.get('search')?.trim();
  if (search) filter.search = search;

  const categoryId = params
    .getAll('categoryId')
    .flatMap((v) => v.split(','))
    .map(Number)
    .filter((n) => Number.isInteger(n) && n > 0);
  if (categoryId.length) filter.categoryId = categoryId;

  const brand = params.get('brand');
  if (brand) filter.brand = brand;

  if (params.get('featured') === 'true') filter.featured = true;

  const minPrice = toNumber(params.get('minPrice'));
  if (minPrice !== undefined) filter.minPrice = minPrice;

  const maxPrice = toNumber(params.get('maxPrice'));
  if (maxPrice !== undefined) filter.maxPrice = maxPrice;

  const minRating = toNumber(params.get('minRating'));
  if (minRating !== undefined) filter.minRating = minRating;

  const page = Math.max((toNumber(params.get('page')) ?? 1) - 1, 0);
  const size = Math.min(
    Math.max(toNumber(params.get('size')) ?? DEFAULT_PAGE_SIZE, 1),
    MAX_PAGE_SIZE
  );

  return { filter, page: Math.floor(page), size: Math.floor(size) };
}

export function stateToQueryParams({ filter, page, size }: ProductListState): Params {
  return {
    ...filter,
    page: page > 0 ? page + 1 : null,
    size: size !== DEFAULT_PAGE_SIZE ? size : null,
  };
}
