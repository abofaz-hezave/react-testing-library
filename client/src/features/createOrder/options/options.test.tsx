import { screen } from '@testing-library/react';
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
