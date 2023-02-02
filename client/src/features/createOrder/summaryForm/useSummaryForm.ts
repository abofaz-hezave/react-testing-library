import { useState } from 'react';
import { useAppDispatch } from "../../../app/hooks";
import { updateOrderPhase } from "../optionsSlice";

function SummaryForm() {
  const dispatch = useAppDispatch()
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const onSubmitSummary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(updateOrderPhase("completed"))
  }
  return { isTermsChecked, setIsTermsChecked, onSubmitSummary };
}

export default SummaryForm;
