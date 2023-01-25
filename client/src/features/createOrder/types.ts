export type OptionType = 'scoops' | 'toppings';

export interface OptionsProps {
  optionType: OptionType;
}

export interface OptionItem {
  name: string;
  imagePath: string;
}

export interface UpdateOptionsCountPayload {
  itemName: string;
  newItemCount: number;
  optionType: OptionType;
}

export interface ItemComponentProps extends OptionItem {
  updateOptionsCount(itemName: string, newItemCount: number): { payload: UpdateOptionsCountPayload; type: string; }

}
