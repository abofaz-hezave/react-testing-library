import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "./App";

test('all order phases for the happy path', async () => {
  const user = userEvent.setup();

  const { unmount } = render(<App />);

  // add ice cream scoops and toppings
  const firstInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(firstInput);
  await user.type(firstInput, "1");

  const secondInput = screen.getByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(secondInput);
  await user.type(secondInput, '2');

  const firstCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' })
  await user.click(firstCheckbox)

  // find and click order summary button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i })
  await user.click(orderSummaryButton)

  // check summary subtotals
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and click button
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and toppings have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  unmount();
})
