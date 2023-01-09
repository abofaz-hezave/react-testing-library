import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import { OptionType } from '../types';
import { useFetchOptionsQuery } from '../optionsSlice';

interface OptionsProps {
  optionType: OptionType;
}

function Options({ optionType }: OptionsProps): JSX.Element {
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ScoopOption;
  const { data = [] } = useFetchOptionsQuery(optionType);

  return (
    <Row>
      {data.map((item) => (
        <ItemComponent key={item.name} {...item} />
      ))}
    </Row>
  );
}

export default Options;
