import axios from "axios";

const url: string = "https://disease.sh/v3/covid-19";

export const fetchGlobalData = async () => {
  try {
    const {
      data: { cases, active, recovered, deaths, updated },
    } = await axios.get(`${url}/all`);

    const res: dataType = {
      cases,
      active,
      recovered,
      deaths,
      lastUpdate: new Date(updated),
    };
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocalData = async (country: string) => {
  try {
    const {
      data: { cases, active, recovered, deaths, updated },
    } = await axios.get(`${url}/countries/${country}`);

    const res: dataType = {
      cases,
      active,
      recovered,
      deaths,
      lastUpdate: new Date(updated),
    };
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );
    interface returnObjType2 {
      positive: number;
      recovered: number;
      death: number;
      dateChecked: Date;
    }
    return data.map(
      ({ positive, recovered, death, dateChecked }: returnObjType2) => ({
        confirmed: positive,
        recovered,
        deaths: death,
        date: dateChecked,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountriesName = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get("https://covid19.mathdro.id/api/countries");
    return countries.map(({ name }: { name: string }) => name);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTimeSeries = async () => {
  try {
    const data = await axios.get(
      "https://pomber.github.io/covid19/timeseries.json"
    );
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
