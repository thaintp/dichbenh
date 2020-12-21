import axios from "axios";

const url: string = "https://covid19.mathdro.id/api";

export const fetchGlobalData = async () => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);
    const res: dataType = {
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
      lastUpdate,
    };
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocalData = async (country: string) => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(`${url}/countries/${country}`);
    const res: dataType = {
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
      lastUpdate,
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
    } = await axios.get(`${url}/countries`);
    return countries.map(({ name }: { name: string }) => name);
  } catch (error) {
    console.log(error);
  }
};
