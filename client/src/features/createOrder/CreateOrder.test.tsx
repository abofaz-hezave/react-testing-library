import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import CreateOrder from './index';
import { server } from '../../mocks/server';

test('shows alert when scoops and toppings routes return error', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops ', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<CreateOrder />);

  const alerts = await screen.findAllByRole('alert', {
    name: 'An unexpected error happend. Please try again later.',
  });

  expect(alerts).toHaveLength(2);
});
