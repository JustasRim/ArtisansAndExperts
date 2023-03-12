import { useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { SelectOption } from '../../utils/Interfaces';
import styles from './select.module.scss';

type Props<T extends FieldValues> = {
  id: Path<T>;
  options?: SelectOption[];
  className?: string;
  register?: UseFormRegister<T>;
  onChange?: (value: string) => void;
};

export function Select<T extends FieldValues>({ id, options, register, onChange, className }: Props<T>) {
  const [state, setState] = useState<number>();

  if (!register && !onChange) {
    throw 'no register and onCange';
  }

  return (
    <div className={className}>
      {register ? (
        <select
          id={id}
          className={styles.select}
          {...register(id)}
          value={state}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setState(+event.target.value);
          }}
        >
          {options?.map((q) => {
            return (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            );
          })}
        </select>
      ) : (
        <select
          id={id}
          className={styles.select}
          value={state}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            if (!onChange) return;
            onChange(e.target.value);
          }}
        >
          {options?.map((q) => {
            return (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}
