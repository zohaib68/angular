import { Component, inject } from '@angular/core';
import { HousingLocationInterface, cardViewedFrom } from '../../types';
import { HousingService } from '../../services';
import { HouseCardComponent } from '../houseCard/house-card/house-card.component';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HouseCardComponent, CarouselComponent],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  houses: HousingLocationInterface[] = [];
  housingService = inject(HousingService);
  viewingFrom: cardViewedFrom = 'dashboard';

  constructor() {
    this.houses = this.housingService.getAllHousingLocations();
  }
}
