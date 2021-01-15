import axios from "axios";

export const extractDaily = (dailyData: dailyDataType[]) => {
  let confirmedDaily: number[] = [];
  let recoveredDaily: number[] = [];
  let deathDaily: number[] = [];
  let activeDaily: number[] = [];
  let dateDaily: string[] = [];
  dailyData.forEach(({ confirmed, recovered, deaths, date }) => {
    confirmedDaily.push(confirmed);
    recoveredDaily.push(recovered);
    deathDaily.push(deaths);
    activeDaily.push(confirmed - recovered - deaths);
    dateDaily.push(date);
  });
  return {
    confirmedDaily,
    recoveredDaily,
    deathDaily,
    activeDaily,
    dateDaily,
  };
};

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
      ...extractDaily(world),
    };
  } catch (error) {
    console.log(error);
  }
};
