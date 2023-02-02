import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import useSummaryForm from './useSummaryForm';

function SummaryForm() {
  const { isTermsChecked, setIsTermsChecked, onSubmitSummary } = useSummaryForm();
  return (
    <Form onSubmit={onSubmitSummary}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isTermsChecked}
          onChange={(event) => setIsTermsChecked(event.target.checked)}
          label={
            <span>
              I agree to{' '}
              <OverlayTrigger
                placement="right"
                overlay={() => (
                  <Popover id="terms-and-conditions">
                    <Popover.Body>
                      no ice cream will actually be delivered
                    </Popover.Body>
                  </Popover>
                )}
              >
                <span>Terms and Conditions</span>
              </OverlayTrigger>
            </span>
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isTermsChecked}>
        Confirm order
      </Button>
    </Form>
  );
}

export default SummaryForm;
