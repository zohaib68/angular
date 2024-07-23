import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalHeaderComponent } from '../modal-header';

@Component({
  selector: 'app-add-to-cart-modal',
  standalone: true,
  imports: [CommonModule, ModalHeaderComponent],
  templateUrl: './add-to-cart-modal.component.html',
  styleUrl: './add-to-cart-modal.component.css',
})
export class AddToCartModalComponent {
  @Output() addToCartEvent: EventEmitter<number> = new EventEmitter<number>();

  @Input() modalId!: string;

  quantity: number = 1;

  modalTitle: string = 'Add Product';

  quantityHandler(action: 'plus' | 'minus') {
    const minusQuantity = () => {
      if (this.quantity !== 1) this.quantity = this.quantity - 1;
    };

    const plusQuantity = () => {
      this.quantity = this.quantity + 1;
    };

    if (action === 'minus') minusQuantity();
    else plusQuantity();
  }

  addProductHandler() {
    this.addToCartEvent.emit(this.quantity);
  }
}
