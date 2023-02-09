import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoopOption from './ScoopOption';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup()
  render(
    <ScoopOption name='' imagePath='' updateOptionsCount={jest.fn()} />
  );
  const scoopInput = screen.getByRole('spinbutton');

  //negative number
  await user.clear(scoopInput);
  await user.type(scoopInput, '-1');
  expect(scoopInput).toHaveClass('is-invalid');

  //decimal number
  await user.clear(scoopInput);
  await user.type(scoopInput, '1.3');
  expect(scoopInput).toHaveClass('is-invalid');

  //correct number
  await user.clear(scoopInput);
  await user.type(scoopInput, '2');
  expect(scoopInput).not.toHaveClass('is-invalid');
});

