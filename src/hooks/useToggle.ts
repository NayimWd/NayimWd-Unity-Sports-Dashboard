import { useState } from "react";

type UseToggleProps = {
  defaultValue: boolean;
};

type UseToggleReturn = [boolean, (valueParams?: boolean) => void];

const useToggle = ({ defaultValue }: UseToggleProps): UseToggleReturn => {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(valueParams?: boolean) {
    setValue((currentValue) =>
      typeof valueParams === "boolean" ? valueParams : !currentValue
    );
  }

  return [value, toggleValue];
};

export default useToggle;
