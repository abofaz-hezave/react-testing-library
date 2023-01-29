import { useMemo } from 'react';
import { useAppSelector } from "../../app/hooks";
import { ItemPrices } from "../../constants";
import { formatCurrency } from "../../utils/commonUtils";

function useCreateOrder() {
  const { scoops, toppings } = useAppSelector((state) => state.options)

  const scoopsTotalCount = Object.values(scoops).reduce((total, value) => total + value, 0);
  const toppingsTotalCount = Object.values(toppings).reduce((total, value) => total + value, 0);
  const grandTotal = (scoopsTotalCount * ItemPrices.scoops) + (toppingsTotalCount * ItemPrices.toppings)

  const grandTotalCalculation = useMemo(() => {
    return formatCurrency(grandTotal)
  }, [grandTotal]);


  return {
    grandTotalCalculation,
  };
}

export default useCreateOrder;
