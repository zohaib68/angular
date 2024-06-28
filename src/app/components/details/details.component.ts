import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocationInterface, cardViewedFrom } from '../../types';
import { HousingService } from '../../services';
import { HouseCardComponent } from '../houseCard/house-card/house-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, HouseCardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  viewingFrom: cardViewedFrom = 'detailsPage';

  route: ActivatedRoute = inject(ActivatedRoute);

  housingService = inject(HousingService);

  houseDetails: HousingLocationInterface | undefined;

  houseId: number | undefined = undefined;

  constructor() {
    const {
      snapshot: {
        params: { id = '' },
      },
    } = this.route;

    this.houseId = Number(id);

    this.houseDetails = this.housingService.getHousingLocationById(
      Number(this.houseId)
    );
  }
}
