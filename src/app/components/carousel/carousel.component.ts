import { Component, OnInit, OnDestroy, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { IProductInfo } from '../../types';
import { ProductsService } from '../../services';
import Iconify from '@iconify/iconify';
import { PaginatorComponent } from '../../utils';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  productsService = inject(ProductsService);

  products: IProductInfo[] = [];

  changeHandler(page: number) {
    const product = this.products[page - 1];

    if (product) {
      const elem = document.getElementById(product.image);

      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor() {
    this.productsService.getAllProducts.subscribe((value) => {
      this.products = value;
    });
  }

  ngOnInit() {
    Iconify.scan();
  }
}
