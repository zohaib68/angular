import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store';
import { ICartState } from '../../store/reducers/cart';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../utils';
import { ICartItem, IProductInfo } from '../../types';
import {
  decreaseProductQuantity,
  increaseProductQuantity,
} from '../../store/actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  $cartState: Observable<ICartState>;

  cartState: ICartState | undefined;

  totalPrice: number = 0;

  subscription: Subscription | undefined;

  constructor(private stote: Store<IAppState>) {
    this.$cartState = this.stote.select((state) => state.cart);
  }

  mutateQuantityHandler({
    item,
    quantity,
    action,
  }: {
    item: IProductInfo;
    quantity: number;
    action: 'plus' | 'minus';
  }) {
    if (action === 'plus')
      this.stote.dispatch(increaseProductQuantity({ ...item, quantity }));
    else this.stote.dispatch(decreaseProductQuantity({ ...item, quantity }));
  }

  ngOnInit() {
    this.subscription = this.$cartState.subscribe((value) => {
      this.cartState = value;
      this.totalPrice = value.items.reduce((acc: number, next: ICartItem) => {
        const productPrice = next.quantity * next.price;
        return acc + productPrice;
      }, 0);
    });
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
