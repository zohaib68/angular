import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeFromCart,
  resetCart,
} from '../../actions/cart';
import { ICartItem } from '../../../types';

export interface ICartState {
  items: ICartItem[];
}

export const initialCartState: ICartState = {
  items: [],
};

const _cartReducer = createReducer(
  initialCartState,
  on(addToCart, ({ items, ...restState }, item) => {
    return {
      ...restState,
      items: [...items, item],
    };
  }),
  on(increaseProductQuantity, ({ items, ...restState }, { id }) => {
    return {
      ...restState,
      items: items.map((item) => {
        console.log(id, 'whatisId', item.id);
        if (item.id === id) return { ...item, quantity: item.quantity + 1 };
        return { ...item };
      }),
    };
  }),
  on(decreaseProductQuantity, ({ items, ...restState }, { id }) => {
    return {
      ...restState,
      items: items.map((item) => {
        if (item.id === id) return { ...item, quantity: item.quantity - 1 };
        return { ...item };
      }),
    };
  }),
  on(removeFromCart, ({ items, ...restState }, { id }) => {
    return {
      ...restState,
      items: items.filter((item) => {
        return item.id !== id;
      }),
    };
  }),
  on(resetCart, (state) => ({ ...initialCartState }))
);

export function cartReducer(
  state: ICartState | undefined,
  action: any
): ICartState {
  return _cartReducer(state, action);
}
