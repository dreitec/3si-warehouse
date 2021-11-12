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

export interface FiltersValueText {
  [key: string]: string;
}

export interface Option {
  value: string;
  text: string;
}

export interface FiltersBaseState {
  programFilters: Filters;
  otherFilters: Filters;
  selectedFilterType: string;
}
export interface GeographicalEligibilityState extends FiltersBaseState {
  selectedOption: string;
}
export interface GeographicalFiltersBaseState extends FiltersBaseState {
  selectedOption: string;
}

export interface ProvidersState extends FiltersBaseState {
  programFilters: Filters;
  otherFilters: Filters;
  selectedFilterType: string;
  siteFilers: Filters;
  selectedOption: string;
}

export interface ProvidersData {
  data: any[];
}

export interface GapsState {
  filters: Filters;
}

export interface ITableState {
  programFilters: Filters;
  otherFilters: Filters;
  selectedViewBy: string;
  siteFilters: Filters;
  exporting: boolean;
}
