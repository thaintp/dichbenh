import React, { useContext } from "react";
import { Row } from "react-bootstrap";

import { AppContext } from "../../App";

import Card from "./Card/Card";
import styles from "./Cards.module.css";

const Cards = () => {
  const [state] = useContext(AppContext);

  return (
    <Row className={"justify-content-center " + styles.container}>
      <Card
        title="Confirmed"
        className={styles.confirmed}
        data={state.confirmedDaily}
      />
      <Card
        title="Recovered"
        className={styles.recovered}
        data={state.recoveredDaily}
      />
      <Card data={state.deathDaily} title="Deaths" className={styles.deaths} />
      <Card data={state.activeDaily} title="Active" className={styles.active} />
    </Row>
  );
};

export default Cards;
