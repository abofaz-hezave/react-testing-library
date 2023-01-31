import OrderEntry from './OrderEntry';
import OrderSummary from './OrderSummary';
import useCreateOrder from "./useCreateOrder";

function CreateOrder(): JSX.Element {
  const { orderPhase, setOrderPhase } = useCreateOrder()

  if (orderPhase === 'review') return <OrderSummary setOrderPhase={setOrderPhase} />
  return <OrderEntry setOrderPhase={setOrderPhase} />

}

export default CreateOrder;
