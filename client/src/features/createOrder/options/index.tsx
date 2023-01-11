import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { OptionType } from '../types';
import { useFetchOptionsQuery } from '../optionsSlice';
import AlertBanner from '../../common/AlertBanner';

interface OptionsProps {
  optionType: OptionType;
}

function Options({ optionType }: OptionsProps): JSX.Element {
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const { data = [], error } = useFetchOptionsQuery(optionType);

  if (error) return <AlertBanner />;

  return (
    <Row>
      {data.map((item) => (
        <ItemComponent key={item.name} {...item} />
      ))}
    </Row>
  );
}

export default Options;
