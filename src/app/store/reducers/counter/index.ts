import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../../actions';

export interface ICounterState {
  value: number;
}

export const initialICounterState: ICounterState = {
  value: 0,
};

const _counterReducer = createReducer(
  initialICounterState,
  on(increment, (state) => ({ ...state, value: state.value + 1 })),
  on(decrement, (state) => ({ ...state, value: state.value - 1 })),
  on(reset, (state) => ({ ...state, value: 0 }))
);

export function counterReducer(
  state: ICounterState | undefined,
  action: any
): ICounterState {
  return _counterReducer(state, action);
}
