import { useContext } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import { AppContext } from "../../App";

import styles from "./CountryPicker.module.css";

const CountryPicker = () => {
  const [state, dispatch] = useContext(AppContext);
  return (
    <div>
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) =>
            dispatch({
              type: "COUNTRY_CHANGE",
              payload: (e.target as HTMLSelectElement).value,
            })
          }
        >
          <option value="Global">Global</option>
          {state.countriesName?.map((country: string) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
