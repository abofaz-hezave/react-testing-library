export type OptionType = 'scoops' | 'toppings';

export interface OptionItem {
  name: string;
  imagePath: string;
}

export interface UpdateOptionsCountPayload {
  itemName: string;
  newItemCount: number;
  optionType: OptionType;
}

