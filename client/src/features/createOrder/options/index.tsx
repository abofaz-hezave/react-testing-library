import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { OptionsProps } from '../types';
import { useFetchOptionsQuery, updateOptionsCount } from '../optionsSlice';
import AlertBanner from '../../common/AlertBanner';
import { ItemPrices } from "../../../constants";
import { useAppDispatch } from "../../../app/hooks";
import { formatCurrency } from "../../../utils/commonUtils";
import useOptions from "./useOptions";

function Options({ optionType }: OptionsProps): JSX.Element {
  const { title, calculation } = useOptions({ optionType })
  const dispatch = useAppDispatch()
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const { data = [], error } = useFetchOptionsQuery(optionType);

  if (error) return <AlertBanner />;

  return (
    <>
      <h2>{title}</h2>
      <p>{ItemPrices[optionType]} each</p>
      <p>{title} total: {formatCurrency(calculation)}</p>
      <Row>
        {data.map((item) => (
          <ItemComponent
            {...item}
            key={item.name}
            updateOptionsCount={(itemName, newItemCount) => dispatch(updateOptionsCount({ itemName, newItemCount, optionType }))}
          />
        ))}
      </Row>
    </>
  );
}

export default Options;
