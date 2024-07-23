import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PaginatorService } from '../../../services';

export interface IPaginator {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PaginatorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() totalPages: number = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  isMobile: boolean = window.innerWidth <= 768;

  maxPageNumbers: number = 5;

  pageNumbers: number[] = [];

  startPage: number = 1;

  endPage: number = 1;

  baseStyle: string = `btn btn-xs`;

  paginatorService = inject(PaginatorService);

  currentPage: number = 1;

  handleResize(): void {
    this.isMobile = window.innerWidth <= 768;

    this.setMaxPageNumbers(this.isMobile);
  }

  setMaxPageNumbers(isMobile: boolean): void {
    this.maxPageNumbers = isMobile ? 3 : 5;

    this.updatePageNumbers();
  }

  updatePageNumbers(): void {
    const halfMaxPageNumbers = Math.floor(this.maxPageNumbers / 2);

    this.startPage = Math.max(
      1,
      this.paginatorService.getCurrentPage() - halfMaxPageNumbers
    );

    this.endPage = Math.min(
      this.totalPages,
      this.startPage + this.maxPageNumbers - 1
    );

    this.pageNumbers = [];

    for (let i = this.startPage; i <= this.endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  isActive(pageNumber: number): boolean {
    return pageNumber === this.paginatorService.getCurrentPage();
  }

  buttonDisableStateManageMent(isDisabled: boolean): string {
    return isDisabled ? 'pointer-events-none' : '';
  }

  previousPage(): void {
    const value = this.paginatorService.getCurrentPage();

    if (value > 1) {
      const valueToSet = value - 1;

      this.paginatorService.setCurrentPage(valueToSet);

      this.onPageChange.emit(valueToSet);
    }
  }

  nextPage(): void {
    const value = this.paginatorService.getCurrentPage();

    if (value < this.totalPages) {
      const valueToSet = value + 1;

      this.paginatorService.setCurrentPage(valueToSet);

      this.onPageChange.emit(valueToSet);
    }
  }

  goToPage(page: number): void {
    this.paginatorService.setCurrentPage(page);

    this.onPageChange.emit(page);
  }

  ngOnInit(): void {
    this.updatePageNumbers();

    this.setMaxPageNumbers(this.isMobile);

    this.paginatorService.currentPage$.subscribe((page) => {
      this.currentPage = page;

      this.updatePageNumbers();
    });

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.updatePageNumbers();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}
