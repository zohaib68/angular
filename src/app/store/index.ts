import { Store } from '@ngrx/store';
import { ICounterState, counterReducer } from './reducers';
import { ICartState, cartReducer } from './reducers/cart';

export interface IAppState {
  counter: ICounterState;
  cart: ICartState;
}

export type TAppState = Store<IAppState>;

const appStore = { counter: counterReducer, cart: cartReducer };

export default appStore;
