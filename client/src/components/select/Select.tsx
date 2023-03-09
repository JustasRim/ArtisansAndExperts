import { SelectOption } from '../../utils/Interfaces';
import styles from './select.module.scss';

type Props = {
  options: SelectOption[];
};

export function Select({ options }: Props) {
  return (
    <select className={styles.select}>
      {options.map((q) => {
        return <option key={q.value}>{q.label}</option>;
      })}
    </select>
  );
}
