import { Component, inject, OnDestroy } from '@angular/core';
import { IProductInfo, cardViewedFrom } from '../../types';
import { ProductsService } from '../../services';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Subscription } from 'rxjs';
import { AddToCartModalComponent } from '../modals';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store';
import { addToCart } from '../../store/actions';
import { modalToggleHandler } from '../../utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    SearchInputComponent,
    ProductCardComponent,
    AddToCartModalComponent,
  ],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  products: IProductInfo[] = [];

  productsToRender: IProductInfo[] = [];

  productsService = inject(ProductsService);

  viewingFrom: cardViewedFrom = 'dashboard';

  subscription: Subscription;

  selectedProductToAdd: IProductInfo | null = null;

  modalId: string = 'addToCartConfirmationModal';

  constructor(private store: Store<IAppState>) {
    this.subscription = this.productsService.getAllProducts.subscribe(
      (value) => {
        this.products = value;

        this.productsToRender = value;
      }
    );
  }

  addToCartHandler(quantity: number) {
    if (this.selectedProductToAdd) {
      this.store.dispatch(
        addToCart({ ...this.selectedProductToAdd, quantity })
      );

      modalToggleHandler('addToCartConfirmationModal', 'close');

      this.selectedProductToAdd = null;
    }
  }

  productSelectionListener(product: IProductInfo) {
    this.selectedProductToAdd = product;

    modalToggleHandler('addToCartConfirmationModal', 'open');
  }

  searchHandler(value: string) {
    const filteredProducts = this.products.filter(
      (product) =>
        product.title.includes(value) || product.category.includes(value)
    );

    this.productsToRender = filteredProducts;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
