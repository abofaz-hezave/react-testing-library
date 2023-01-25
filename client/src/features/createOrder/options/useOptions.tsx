import { useMemo } from 'react';
import { useAppSelector } from "../../../app/hooks";
import { OptionsProps } from '../types';
import { ItemPrices } from "../../../constants";

function Options({ optionType }: OptionsProps) {
  const selectedOptions = useAppSelector((state) => state.options[optionType])
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLocaleLowerCase()


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: "USD",
      minimumFractionDigits: 2
    }).format(amount)
  }

  const calculation = useMemo(() => {
    const countsArray = Object.values(selectedOptions);
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    return formatCurrency(totalCount * ItemPrices[optionType])
  }, [selectedOptions, optionType]);



  return {
    title,
    calculation,
  };
}

export default Options;
