import { createAction, props } from '@ngrx/store';
import { ICartItem } from '../../../types';

export const addToCart = createAction('addToCart', props<ICartItem>());

export const removeFromCart = createAction(
  'removeFromCart',
  props<ICartItem>()
);

export const increaseProductQuantity = createAction(
  'increaseProductQuantity',
  props<ICartItem>()
);

export const decreaseProductQuantity = createAction(
  'decreaseProductQuantity',
  props<ICartItem>()
);

export const resetCart = createAction('resetCart');
