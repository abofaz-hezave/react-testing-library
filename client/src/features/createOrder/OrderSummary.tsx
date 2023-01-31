import { SetOrderPhase } from "./types";
import SummaryForm from './summaryForm';

function OrderSummary(props: { setOrderPhase: SetOrderPhase }): JSX.Element {
  return <SummaryForm />;
}

export default OrderSummary;
