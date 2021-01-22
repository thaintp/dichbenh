import React, { useContext } from "react";
import { Row } from "react-bootstrap";

import { AppContext } from "../../App";

import Card from "./Card/Card";
import styles from "./Cards.module.css";

const Cards = () => {
  const [
    { confirmedDaily, activeDaily, recoveredDaily, deathDaily },
  ] = useContext(AppContext);

  return (
    <Row className={"justify-content-center " + styles.container}>
      <Card
        title="Tổng ca nhiễm"
        className={styles.confirmed}
        data={confirmedDaily}
      />
      <Card data={activeDaily} title="Đang nhiễm" className={styles.active} />
      <Card title="Khỏi" className={styles.recovered} data={recoveredDaily} />
      <Card data={deathDaily} title="Tử vong" className={styles.deaths} />
    </Row>
  );
};

export default Cards;
