import { Component, Input } from '@angular/core';
import { HousingLocationInterface, cardViewedFrom } from '../../../types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Iconify from '@iconify/iconify';

@Component({
  selector: 'app-house-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.css',
  host: { ngSkipHydration: 'true' },
})
export class HouseCardComponent {
  @Input() houseDetails!: HousingLocationInterface | undefined;

  @Input() viewingFrom!: cardViewedFrom;

  renderLearnMoreBtn: boolean = true;

  ngOnInit() {
    // Initialize Iconify
    Iconify.scan();
    if (this.viewingFrom === 'detailsPage') this.renderLearnMoreBtn = false;
  }
}
