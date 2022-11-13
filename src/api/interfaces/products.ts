import { Decimal, ID, ISOTimestamp } from "./common";

export interface Product {
  id: ID;
  namePl: string;
  nameEn: string | null;
  descriptionPl: string | null;
  descriptionEn: string | null;
  imageUuid: string | null;
  price: Decimal | null;
  slug: string;

  insertedAt: ISOTimestamp;
  updatedAt: ISOTimestamp;
}

export interface CreateProductParams {
  namePl: string;
  nameEn?: string | null;
  descriptionPl?: string | null;
  descriptionEn?: string | null;
  price?: Decimal | null;
  slug?: string | null;
}

export type UpdateProductParams = Partial<CreateProductParams>;
