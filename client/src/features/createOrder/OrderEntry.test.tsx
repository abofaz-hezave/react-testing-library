import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import OrderEntry from './OrderEntry';
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
    <OrderEntry />
  );

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});

test('order button should be disabled if no scoops has been selected', async () => {
  const user = userEvent.setup();

  renderWithProviders(<OrderEntry />)
  const orderButton = screen.getByRole('button', { name: /order sundae/i })
  expect(orderButton).toBeDisabled()

  const firstInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await user.clear(firstInput)
  await user.type(firstInput, '1')
  expect(orderButton).toBeEnabled()

  await user.clear(firstInput)
  await user.type(firstInput, '0')
  expect(orderButton).toBeDisabled()

})

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();

    renderWithProviders(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const firstCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    await user.click(firstCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    renderWithProviders(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    const firstCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    await user.click(firstCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    renderWithProviders(<OrderEntry />);

    const firstCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    await user.click(firstCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(firstCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
