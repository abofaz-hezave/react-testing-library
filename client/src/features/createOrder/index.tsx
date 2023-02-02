import OrderEntry from './OrderEntry';
import OrderSummary from './OrderSummary';
import { useAppSelector } from "../../app/hooks";

function CreateOrder(): JSX.Element {
  const orderPhase = useAppSelector((state) => state.options.orderPhase)

  if (orderPhase === 'review') return <OrderSummary />
  return <OrderEntry />

}

export default CreateOrder;
