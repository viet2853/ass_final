export type TResSuccess<T> = {
  message: string;
  data?: T;
};
export type TResError = {
  message: string;
};
