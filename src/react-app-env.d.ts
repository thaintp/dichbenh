/// <reference types="react-scripts" />

interface dataType {
  cases?: number;
  active?: number;
  confirmed?: number;
  recovered?: number;
  deaths?: number;
  lastUpdate?: Date;
}

interface timeSeriesType {
  confirmed: number;
  date: string;
  deaths: number;
  recovered: number;
}
