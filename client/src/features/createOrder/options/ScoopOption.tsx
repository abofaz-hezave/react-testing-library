import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ItemComponentProps } from '../types';
import useScoopOption from "./useScoopOption";

function ScoopOption({ name, imagePath, updateOptionsCount }: ItemComponentProps) {
  const { isValid, onChangeScoop } = useScoopOption({ name, updateOptionsCount })

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        width="75%"
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={onChangeScoop}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}

export default ScoopOption;
