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

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings change', async () => {
  renderWithProviders(<Options optionType='toppings' />)

  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  const firstCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' })
  await userEvent.click(firstCheckbox)



  // expect(firstCheckbox).not.toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  const secondCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  await userEvent.click(secondCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  await userEvent.click(firstCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.5')
})
