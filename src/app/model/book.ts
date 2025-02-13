import {Category} from "./category";

export interface Book {
  id?: number;

   name?: string;

  price?: string;

  priceNumber?: number;

  quantity?: number;

  salesQuantity?: number;

  author?: string;

  image?: string;

  description?: string;

  dateCreated?: string;

  dateUpdated?: string;

  categoryList?: string;

  categories?: Category[];


}
