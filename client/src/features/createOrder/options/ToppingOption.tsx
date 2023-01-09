import Col from 'react-bootstrap/Col';
import { OptionItem } from '../types';

function ToppingOption({ name, imagePath }: OptionItem) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        width="75%"
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}

export default ToppingOption;
