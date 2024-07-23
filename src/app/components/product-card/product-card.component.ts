import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProductInfo, cardViewedFrom } from '../../types';
import Iconify from '@iconify/iconify';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProductInfo | undefined;

  @Output() productSelectioEvent: EventEmitter<IProductInfo> =
    new EventEmitter();

  @Input() viewingFrom!: cardViewedFrom;

  shouldCollapse: boolean = false;

  renderLearnMoreBtn: boolean = true;

  middleSectionHeight: string = 'h-44';

  collapseHandler() {
    this.shouldCollapse = !this.shouldCollapse;

    if (!this.shouldCollapse) {
      this.middleSectionHeight = 'h-44';
    } else {
      this.middleSectionHeight = 'h-auto';
    }
  }

  constructor(private store: Store) {}

  addToCartHandler(product: IProductInfo | undefined) {
    if (product) this.productSelectioEvent.emit(product);
  }

  modalIdHandler(id?: number) {
    return `${id}-add-to-cart-modal`;
  }

  ngOnInit() {
    Iconify.scan();

    if (this.viewingFrom === 'detailsPage') this.renderLearnMoreBtn = false;
  }
}
