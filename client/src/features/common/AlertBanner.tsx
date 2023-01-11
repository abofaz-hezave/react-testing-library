import Alert, { AlertProps } from 'react-bootstrap/Alert';

interface AlertBannerProps {
  message?: string;
  variant?: AlertProps['variant'];
}

function AlertBanner({ message, variant }: AlertBannerProps): JSX.Element {
  const alertMessage =
    message || 'An unexpected error happend. Please try again later.';
  const alertVariant = variant || 'danger';
  return <Alert variant={alertVariant}>{alertMessage}</Alert>;
}

export default AlertBanner;
