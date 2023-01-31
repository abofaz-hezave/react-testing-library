import Button from "react-bootstrap/Button";
import { SetOrderPhase } from "./types";
import Options from './options';
import useOrderEntry from "./useOrderEntry";

function OrderEntry({ setOrderPhase }: { setOrderPhase: SetOrderPhase }): JSX.Element {
  const { scoops, grandTotalCalculation } = useOrderEntry()
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <h2>Grand total: {grandTotalCalculation}</h2>

      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <Button
        disabled={Object.keys(scoops).length === 0}
        onClick={() => setOrderPhase("review")}
        className='my-4'
      >
        Order Sundae!
      </Button>
    </div>
  );
}

export default OrderEntry;
