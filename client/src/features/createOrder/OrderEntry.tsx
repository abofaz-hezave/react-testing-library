import Button from "react-bootstrap/Button";
import Options from './options';
import useOptions from "./options/useOptions";
import useOrderEntry from "./useOrderEntry";

function OrderEntry(): JSX.Element {
  const { grandTotalCalculation, onSubmitOrder } = useOrderEntry()
  const { calculation: scoopTotal } = useOptions({ optionType: 'scoops' })

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <h2>Grand total: {grandTotalCalculation}</h2>

      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <Button
        disabled={scoopTotal === 0}
        onClick={onSubmitOrder}
        className='my-4'
      >
        Order Sundae!
      </Button>
    </div>
  );
}

export default OrderEntry;
