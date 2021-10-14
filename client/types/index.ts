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
