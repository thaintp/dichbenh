import { Col } from "react-bootstrap";
import CardChart from "./CardChart";

const Card = ({
  title,
  data,
  className,
}: {
  title: string;
  data: number[];
  className: string;
}) => {
  return data ? (
    <Col md={2} sm={4} xs={6} className={className}>
      {data[data.length - 1]}
      <br />
      {title}
      <div>[{(data[data.length - 1] - data[data.length - 2]).toString()}]</div>
      <CardChart data={data} />
    </Col>
  ) : (
    <></>
  );
};

export default Card;
