import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import AlertBanner from "../common/AlertBanner";
import { useSubmitOrderMutation, resetOrder } from "./optionsSlice";
import { useAppDispatch } from "../../app/hooks";

function OrderConfirmation(): JSX.Element {
  const dispatch = useAppDispatch()
  const [submitOrder, result] = useSubmitOrderMutation()

  useEffect(() => {
    submitOrder()
  }, []);

  if (result.isLoading) return <div>Loading</div>

  return (
    <div style={{ textAlign: "center" }}>
      {result.isError ? (<AlertBanner />)
        : <>
          <h1>Thank You!</h1>
          <p>Your order number is {result.data?.orderNumber}</p>
          <p >
            as per our terms and conditions, nothing will happen now
          </p>
        </>}
      <Button onClick={() => dispatch(resetOrder())}>Create new order</Button>
    </div>
  );




}

export default OrderConfirmation