import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/testUtils';
import Options from './index';

test('displays image for each item from the server', async () => {
  renderWithProviders(<Options optionType="scoops" />);

  const scoopImages = (await screen.findAllByRole('img', {
    name: /scoop$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
