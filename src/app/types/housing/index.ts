export interface HousingLocationInterface {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}

export type cardViewedFrom = 'dashboard' | 'detailsPage';
