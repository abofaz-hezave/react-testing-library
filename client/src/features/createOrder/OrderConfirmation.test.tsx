import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import OrderConfirmation from './OrderConfirmation';
import { server } from '../../mocks/server';
import { renderWithProviders } from '../../utils/testUtils';

test('shows alert when submitting order return error', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order ', (req, res, ctx) =>
      res(ctx.status(500))
    ),
  );
  renderWithProviders(
    <OrderConfirmation />
  );

  await waitFor(async () => {
    const alerts = await screen.findByRole('alert');
    console.log(9);

    expect(alerts).toHaveTextContent('An unexpected error happend. Please try again later.');
  });
});
