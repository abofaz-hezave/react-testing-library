import SummaryForm from './summaryForm';
import useOptions from "./options/useOptions";
import { useAppSelector } from "../../app/hooks";
import { formatCurrency } from "../../utils/commonUtils";

function OrderSummary(): JSX.Element {
  const { calculation: scoopTotal } = useOptions({ optionType: 'scoops' })
  const { calculation: toppingTotal } = useOptions({ optionType: 'toppings' })
  const scoops = useAppSelector((state) => state.options.scoops)
  const toppings = useAppSelector((state) => state.options.toppings)

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(scoopTotal)}</h2>
      <ul>{Object.entries(scoops).map(([key, value]) => (
        <li key={key}>
          {value} {key}
        </li>
      ))}</ul>
      {toppingTotal > 0 ? (
        <>
          <h2>Toppings: {formatCurrency(toppingTotal)}</h2>
          <ul>{Object.keys(toppings).map((key) => <li key={key}>{key}</li>)}</ul>
        </>
      ) : null}
      <SummaryForm />
    </div>);
}

export default OrderSummary;
