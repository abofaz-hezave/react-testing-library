import { useState } from 'react';
import { OrderPhases } from "./types";


function useCreateOrder() {
  const [orderPhase, setOrderPhase] = useState<OrderPhases>("inProgress");


  return {
    orderPhase,
    setOrderPhase
  };
}

export default useCreateOrder;
