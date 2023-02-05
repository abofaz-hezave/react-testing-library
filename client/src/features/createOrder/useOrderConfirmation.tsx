import { useEffect } from "react";
import { useSubmitOrderMutation, resetOrder } from "./optionsSlice";
import { useAppDispatch } from "../../app/hooks";

function useOrderConfirmation() {
  const dispatch = useAppDispatch()
  const [submitOrder, result] = useSubmitOrderMutation()

  useEffect(() => {
    submitOrder()
  }, [submitOrder]);

  const onResetOrder = () => dispatch(resetOrder())

  return { result, onResetOrder };
}

export default useOrderConfirmation;
