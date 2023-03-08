import { MultiSelect } from 'react-multi-select-component';

import styles from './multiselect.module.scss';

type Props = {
  className?: string;
  onChange?: any;
  options: Option[];
  value: Option[];
};

type Option = {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
};

export function MultiSelectWrapper({ className, onChange, options, value }: Props) {
  return (
    <MultiSelect
      className={className ? `${className} ${styles.multiselect}` : `${styles.multiselect}`}
      overrideStrings={{
        selectAll: 'Pasirinkti viską',
        search: 'Ieškoti',
        selectSomeItems: 'Pasirinkti',
        allItemsAreSelected: 'Viskas pasirinkta',
        selectAllFiltered: 'Pasirinkti visus (išfiltruotus)',
      }}
      options={options}
      value={value}
      onChange={onChange}
      labelledBy="Pasirinkti"
    />
  );
}
