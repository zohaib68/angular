import { IProductInfo } from '../products';

export interface ICartItem extends IProductInfo {
  quantity: number;
}
