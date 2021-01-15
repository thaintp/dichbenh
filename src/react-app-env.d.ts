/// <reference types="react-scripts" />

interface dailyDataType {
  confirmed: number;
  recovered: number;
  deaths: number;
  date: string;
}

interface fetchedDataType {
  data: Record<string, dailyDataType[]>;
  countriesName: string[];
  worldChart: dailyDataType[];
  worldStats: dailyDataType;
  where: string;
  confirmedDaily: number[];
  deathDaily: number[];
  activeDaily: number[];
  dateDaily: string[];
}

type Action =
  | { type: "INIT"; payload: any }
  | { type: "COUNTRY_CHANGE"; payload: string };
