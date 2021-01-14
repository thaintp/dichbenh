import axios from "axios";

export const fetchData = async () => {
  try {
    const res = await axios.get(
      "https://pomber.github.io/covid19/timeseries.json"
    );
    const data = res.data;

    let world: dailyDataType[] = [];
    let countriesName = Object.keys(data);

    countriesName.forEach((name) => {
      const countryData = data[name];

      countryData.forEach(
        (
          { date, confirmed, recovered, deaths }: dailyDataType,
          index: number
        ) => {
          if (world[index] === undefined) {
            world.push({ confirmed, recovered, deaths, date });
          } else {
            world[index].confirmed += confirmed;
            world[index].recovered += recovered;
            world[index].deaths += deaths;
          }
        }
      );
    });
    return {
      countriesName,
      data,
      worldChart: world,
      worldStats: world[world.length - 1],
    };
  } catch (error) {
    console.log(error);
  }
};
