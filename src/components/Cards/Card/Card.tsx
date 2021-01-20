import { Col } from "react-bootstrap";
import CardChart from "./CardChart";
import CountUp from "react-countup";

import styles from "./Card.module.css";

const Card = ({
  title,
  data,
  className,
}: {
  title: string;
  data: number[];
  className: string;
}) => {
  const lastChange = data?.slice(-1)[0] - data?.slice(-2)[0];
  return data ? (
    <Col md={2} sm={4} xs={6} className={className + " " + styles.container}>
      <CountUp end={data.slice(-1)[0]} duration={2}></CountUp>
      <br />
      {title}
      <div>[{(lastChange < 0 ? "" : "+") + lastChange.toString()}]</div>
      <CardChart data={data} />
    </Col>
  ) : (
    <></>
  );
};

export default Card;
