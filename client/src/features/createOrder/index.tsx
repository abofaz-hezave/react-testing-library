import OrderEntry from './OrderEntry';
import OrderSummary from './OrderSummary';
import OrderConfirmation from './OrderConfirmation';
import { useAppSelector } from "../../app/hooks";

function CreateOrder(): JSX.Element {
  const orderPhase = useAppSelector((state) => state.options.orderPhase)

  if (orderPhase === 'review') return <OrderSummary />
  if (orderPhase === 'completed') return <OrderConfirmation />
  return <OrderEntry />

}

export default CreateOrder;
