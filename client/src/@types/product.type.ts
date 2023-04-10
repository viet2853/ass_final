export type TProduct = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type TResListProductData = {
  docs: TProduct[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export enum EOrderBy {
  ASC = "asc",
  DESC = "desc",
}
export enum ESortBy {
  NAME = "name",
  PRICE = "price",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export type TQueryParamsProduct = {
  _page?: number;
  _limit?: number;
  _orderBy?: EOrderBy;
  _sortBy?: ESortBy;
  _search?: string;
  _categoryId?: string;
};
