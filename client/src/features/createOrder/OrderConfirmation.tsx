import Button from "react-bootstrap/Button";
import AlertBanner from "../common/AlertBanner";
import useOrderConfirmation from "./useOrderConfirmation";

function OrderConfirmation(): JSX.Element {
  const { result, onResetOrder } = useOrderConfirmation()

  if (result.isLoading) return <div>Loading</div>

  return (
    <div style={{ textAlign: "center" }}>
      {result.isError ? (<AlertBanner />)
        : <>
          <h1>Thank You!</h1>
          <p>Your order number is {result.data?.orderNumber}</p>
          <p>
            as per our terms and conditions, nothing will happen now
          </p>
        </>}
      <Button onClick={onResetOrder}>Create new order</Button>
    </div>
  );




}

export default OrderConfirmation