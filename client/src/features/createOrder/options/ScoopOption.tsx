import Col from 'react-bootstrap/Col';
import { OptionItem } from '../types';

function ScoopOption({ name, imagePath }: OptionItem) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        width="75%"
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
}

export default ScoopOption;
