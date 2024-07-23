import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  private _currentPage = new BehaviorSubject<number>(1);

  currentPage$ = this._currentPage.asObservable();

  setCurrentPage(page: number): void {
    this._currentPage.next(page);
  }

  getCurrentPage(): number {
    return this._currentPage.getValue();
  }
}
