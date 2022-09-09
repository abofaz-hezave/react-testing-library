import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useSummaryForm from './useSummaryForm';

function SummaryForm() {
  const { isTermsChecked, setIsTermsChecked } = useSummaryForm();
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isTermsChecked}
          onChange={(event) => setIsTermsChecked(event.target.checked)}
          label={<span>I agree to Terms and Conditions</span>}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isTermsChecked}>
        Confirm order
      </Button>
    </Form>
  );
}

export default SummaryForm;
