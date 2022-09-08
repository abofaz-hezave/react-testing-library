import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from './index';

test('initial conditions', () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  expect(confirmButton).toBeDisabled();
});

test('checkbox disabling and enabling the button', () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });

  fireEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});
