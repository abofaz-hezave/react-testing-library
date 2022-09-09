import { useState } from 'react';

function SummaryForm() {
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  return { isTermsChecked, setIsTermsChecked };
}

export default SummaryForm;
