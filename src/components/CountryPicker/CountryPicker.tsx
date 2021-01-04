import { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import { fetchCountriesName } from "../../api";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({
  handleCountryChange,
}: {
  handleCountryChange: Function;
}) => {
  const [countriesName, setCountriesName] = useState<string[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountriesName(await fetchCountriesName());
    };
    fetchAPI();
  }, []);

  return (
    <div>
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="">Global</option>
          {countriesName.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
