import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();

    renderWithProviders(<CreateOrder />);
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
    renderWithProviders(<CreateOrder />);
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
    renderWithProviders(<CreateOrder />);

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
