import Options from './options';

function CreateOrder() {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}

export default CreateOrder;
