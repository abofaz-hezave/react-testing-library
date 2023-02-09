import { useState } from 'react';
import { ItemComponentProps } from '../types';

function useScoopOption({ name, updateOptionsCount }: Omit<ItemComponentProps, 'imagePath'>) {
  const [isValid, setIsValid] = useState(true)

  const onChangeScoop = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = +event.target.value

    if (newValue < 0) return setIsValid(false)
    if (Math.floor(newValue) !== newValue) return setIsValid(false)

    updateOptionsCount(name, newValue)
    setIsValid(true)
  }

  return {
    isValid,
    onChangeScoop
  };
}

export default useScoopOption;
