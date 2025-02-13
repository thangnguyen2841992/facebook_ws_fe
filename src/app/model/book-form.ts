import {Category} from "./category";

export interface BookForm {
  name?: string;

  price?: number;

  author?: string;

  quantity?: number;

  description?: string;

  categoryIds?: number[];
}
