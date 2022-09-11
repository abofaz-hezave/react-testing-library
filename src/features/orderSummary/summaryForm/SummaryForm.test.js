import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('checkbox disabling and enabling the button', async () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });

  await userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  await userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});
