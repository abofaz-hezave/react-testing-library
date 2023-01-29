import Options from './options';
import useCreateOrder from "./useCreateOrder";

function CreateOrder() {
  const { grandTotalCalculation } = useCreateOrder()
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <h2>Grand total: {grandTotalCalculation}</h2>

      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}

export default CreateOrder;
