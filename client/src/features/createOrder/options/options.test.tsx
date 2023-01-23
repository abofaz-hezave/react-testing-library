import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/testUtils';
import Options from './index';

test('displays image for each scoops item from the server', async () => {
  renderWithProviders(<Options optionType="scoops" />);

  const scoopImages = (await screen.findAllByRole('img', {
    name: /scoop$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each toppings item from the server', async () => {
  renderWithProviders(<Options optionType="toppings" />);

  const toppingImages = (await screen.findAllByRole('img', {
    name: /topping$/i,
  })) as HTMLImageElement[];
  expect(toppingImages).toHaveLength(2);

  const altTexts = toppingImages.map((element) => element.alt);
  expect(altTexts).toEqual(['M&Ms topping', 'Hot fudge topping']);
});

test('update scoop subtotal when scoops change', async () => {
  renderWithProviders(
    <Options optionType="scoops" />
  );

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinButton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinButton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
