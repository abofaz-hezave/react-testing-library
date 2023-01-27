import Col from 'react-bootstrap/Col';
import { ItemComponentProps } from '../types';
import Form from "react-bootstrap/Form";

function ToppingOption({ name, imagePath, updateOptionsCount }: ItemComponentProps) {
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox"
          onChange={(event) => updateOptionsCount(name, event.target.checked ? 1 : 0)}
          label={name} />
      </Form.Group>
    </Col>
  );
}

export default ToppingOption;
