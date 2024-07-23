import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import appStore from './store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideHttpClient, withFetch } from '@angular/common/http';

const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__localStorageTest__';
    localStorage.setItem(testKey, testKey);

    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const localStorageSyncReducer = (reducer: any) => {
  return isLocalStorageAvailable()
    ? localStorageSync({ keys: ['cart'], rehydrate: true })(reducer)
    : reducer;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(appStore, { metaReducers: [localStorageSyncReducer] }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
    }),
  ],
};
