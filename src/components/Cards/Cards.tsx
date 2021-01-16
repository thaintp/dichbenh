import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { AppContext } from "../../App";
import Card from "./Card";

const Cards = () => {
  const [state] = useContext(AppContext);

  return (
    <Row className="today-row justify-content-center">
      <Card
        title="Confirmed"
        className="confirmed"
        data={state.confirmedDaily}
      />

      <Card
        title="Recovered"
        className="recovered"
        data={state.recoveredDaily}
      />

      <Card data={state.deathDaily} title="Deaths" className="deaths" />

      <Card data={state.activeDaily} title="Active" className="active" />
    </Row>
  );
};

export default Cards;
