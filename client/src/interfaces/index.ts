export interface ServedData {
  percentage: string;
  number: number;
  group: string;
}

export interface EligibilityData {
  percentage: string;
  number: number;
  group: string;
}

export interface ServerResponse {
  data: ServedData[] | EligibilityData[];
}

export interface Filters {
  [key: string]: boolean;
}

export interface Option {
  value: string;
  text: string;
}

export interface GeographicalEligibilityState {
  geographicalEligibilityFilters: Filters;
  selectedOption: string;
}
export interface EligibilityState {
  eligibilityFilters: Filters;
}

export interface ServedState {
  servedFilters: Filters;
}
