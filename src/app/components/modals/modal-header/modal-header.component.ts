import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  standalone: true,
  imports: [],
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.css',
})
export class ModalHeaderComponent {
  @Input() title: string = '';
}
