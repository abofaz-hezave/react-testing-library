import { useMemo } from 'react';
import { useAppSelector } from "../../app/hooks";
import { ItemPrices } from "../../constants";
import { formatCurrency } from "../../utils/commonUtils";

function useOrderEntry() {
  const { scoops, toppings } = useAppSelector((state) => state.options)


  const grandTotalCalculation = useMemo(() => {
    const scoopsTotalCount = Object.values(scoops).reduce((total, value) => total + value, 0);
    const toppingsTotalCount = Object.values(toppings).reduce((total, value) => total + value, 0);
    const grandTotal = (scoopsTotalCount * ItemPrices.scoops) + (toppingsTotalCount * ItemPrices.toppings)

    return formatCurrency(grandTotal)
  }, [scoops, toppings])

  return { scoops, grandTotalCalculation };
}

export default useOrderEntry;
