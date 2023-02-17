import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './input.module.scss';

type Props<T extends FieldValues> = {
  id: Path<T>;
  type: string;
  register: UseFormRegister<T>;
  className?: string;
};

const Input = <T extends FieldValues>({ id, type, className, register }: Props<T>) => {
  return (
    <input
      id={id}
      type={type}
      {...register(id, { valueAsNumber: type === 'number' })}
      className={`${className ?? ''} ${styles.input}`}
    />
  );
};

export default Input;
