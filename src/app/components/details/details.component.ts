import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductInfo, cardViewedFrom } from '../../types';
import { ProductsService } from '../../services';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import Iconify from '@iconify/iconify';
import { AddToCartModalComponent } from '../modals';
import { modalToggleHandler } from '../../utils';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store';
import { addToCart } from '../../store/actions';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, AddToCartModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  host: { ngSkipHydration: 'true' },
})
export class DetailsComponent implements OnInit {
  products: IProductInfo[] = [];

  viewingFrom: cardViewedFrom = 'detailsPage';

  route: ActivatedRoute = inject(ActivatedRoute);

  productsService = inject(ProductsService);

  productDetails: IProductInfo | null = null;

  productId: number | undefined = undefined;

  modalId: string = 'addToCartConfirmationModalDetailView';

  constructor(private store: Store<IAppState>) {
    const {
      snapshot: {
        params: { id = '' },
      },
    } = this.route;

    this.productId = Number(id);

    this.productsService
      .getProductById(Number(this.productId))
      .subscribe((value) => {
        this.productDetails = value;
      });

    this.productsService.getAllProducts.subscribe((value) => {
      this.products = value;
    });
  }

  addToCartHandler(quantity: number) {
    if (this.productDetails) {
      this.store.dispatch(addToCart({ ...this.productDetails, quantity }));

      modalToggleHandler(this.modalId, 'close');
    }
  }

  toggleModal() {
    modalToggleHandler(this.modalId, 'open');
  }

  ngOnInit() {
    Iconify.scan();
  }
}
