import { useContext } from "react";
import { Form } from "react-bootstrap";
import { AppContext } from "../../App";

import styles from "./CountryPicker.module.css";

const CountryPicker = () => {
  const [{ where, countriesName }, dispatch] = useContext(AppContext);
  return (
    <div className={styles.container}>
      <Form className={styles.form}>
        <Form.Group>
          <Form.Control
            as="select"
            custom
            onChange={(e) =>
              dispatch({
                type: "COUNTRY_CHANGE",
                payload: (e.target as HTMLSelectElement).value,
              })
            }
            value={where}
            defaultValue="Global"
          >
            <option value="Global">Thế giới</option>
            {countriesName?.map((country: string) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CountryPicker;
