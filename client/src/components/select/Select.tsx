import { useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { SelectOption } from '../../utils/Interfaces';
import styles from './select.module.scss';

type Props<T extends FieldValues> = {
  id: Path<T>;
  options: SelectOption[];
  register: UseFormRegister<T>;
};

export function Select<T extends FieldValues>({ id, options, register }: Props<T>) {
  const [state, setState] = useState<number>();

  return (
    <select
      id={id}
      className={styles.select}
      {...register(id)}
      value={state}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
        setState(+event.target.value);
      }}
    >
      {options.map((q) => {
        return (
          <option key={q.value} value={q.value}>
            {q.label}
          </option>
        );
      })}
    </select>
  );
}
