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
        title="Tổng ca nhiễm"
        className={styles.confirmed}
        data={state.confirmedDaily}
      />
      <Card
        data={state.activeDaily}
        title="Đang nhiễm"
        className={styles.active}
      />
      <Card
        title="Khỏi"
        className={styles.recovered}
        data={state.recoveredDaily}
      />
      <Card data={state.deathDaily} title="Tử vong" className={styles.deaths} />
    </Row>
  );
};

export default Cards;
