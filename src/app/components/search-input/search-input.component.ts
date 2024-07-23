import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import Iconify from '@iconify/iconify';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  private inputObservable = new BehaviorSubject<string>('');

  inputValue$ = this.inputObservable.asObservable();

  timer: ReturnType<typeof setTimeout> | null = null;

  setInputValue(value: string): void {
    this.inputObservable.next(value);
  }

  timeOutCleaner() {
    if (this.timer) clearTimeout(this.timer);
  }

  changeHandler(event: Event) {
    const target = event.target as HTMLInputElement;

    const { value } = target;

    this.setInputValue(value);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Initialize Iconify
    Iconify.scan();
    if (isPlatformBrowser(this.platformId)) {
      this.inputValue$.subscribe((value) => {
        this.timeOutCleaner();

        this.timer = setTimeout(() => {
          this.onSearch.emit(value);
        }, 1000);
      });
    }
  }

  ngOnDestroy(): void {
    this.timeOutCleaner();
  }
}
