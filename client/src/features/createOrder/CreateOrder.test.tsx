import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import CreateOrder from './index';
import { server } from '../../mocks/server';
import { renderWithProviders } from '../../utils/testUtils';

test('shows alert when scoops and toppings routes return error', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops ', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  renderWithProviders(
    <CreateOrder />
  );

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});
