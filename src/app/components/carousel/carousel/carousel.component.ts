import { Component, OnInit, OnDestroy, inject, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HousingLocationInterface } from '../../../types';
import { HousingService } from '../../../services';
import Iconify from '@iconify/iconify';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class CarouselComponent implements OnInit, OnDestroy {
  housingService = inject(HousingService);

  houses: HousingLocationInterface[] = [];

  imgToShow: string = '';

  iteratingIndex: number = 0;

  timer: ReturnType<typeof setInterval> | null = null;

  imageIterationAdvanceSetter() {
    if (this.iteratingIndex === this.houses.length - 1) this.iteratingIndex = 0;
    else this.iteratingIndex = this.iteratingIndex + 1;
  }

  imageIterationBackWardSetter() {
    if (this.iteratingIndex === 0) this.iteratingIndex = this.houses.length - 1;
    else this.iteratingIndex = this.iteratingIndex - 1;
  }

  imageSliderHanlder() {
    this.timer = setInterval(() => {
      this.imageIterationAdvanceSetter();

      this.imgToShow = this.houses[this.iteratingIndex]?.photo || '';
    }, 3000);
  }

  navigateHandler(method: 'advance' | 'backward'): void {
    if (this.timer) clearInterval(this.timer);

    if (method === 'advance') this.imageIterationAdvanceSetter();
    else this.imageIterationBackWardSetter();

    this.imgToShow = this.houses[this.iteratingIndex]?.photo || '';

    this.imageSliderHanlder();
  }

  cleaner(): void {
    this.imgToShow = '';

    this.houses = [];

    this.iteratingIndex = 0;

    if (this.timer) clearInterval(this.timer);
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.houses = this.housingService.getAllHousingLocations();

    this.imgToShow = this.houses[this.iteratingIndex]?.photo || '';
  }

  ngOnInit() {
    Iconify.scan();

    if (isPlatformBrowser(this.platformId)) this.imageSliderHanlder();
  }

  ngOnDestroy() {
    this.cleaner();
  }
}
