import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { OptionType } from '../types';
import { useFetchOptionsQuery, updateOptionsCount } from '../optionsSlice';
import AlertBanner from '../../common/AlertBanner';
import { ItemPrices } from "../../../constants";
import { useAppDispatch } from "../../../app/hooks";

interface OptionsProps {
  optionType: OptionType;
}

function Options({ optionType }: OptionsProps): JSX.Element {
  const dispatch = useAppDispatch()
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLocaleLowerCase()
  const { data = [], error } = useFetchOptionsQuery(optionType);

  if (error) return <AlertBanner />;

  return (
    <>
      <h2>{title}</h2>
      <p>{ItemPrices[optionType]} each</p>
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
