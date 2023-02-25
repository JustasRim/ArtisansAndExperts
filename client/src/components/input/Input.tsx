import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './input.module.scss';

type Props<T extends FieldValues> = {
  id: Path<T>;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  register?: UseFormRegister<T>;
  className?: string;
};

const Input = <T extends FieldValues>({ id, type, className, placeholder, register, onChange }: Props<T>) => {
  if (register) {
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { valueAsNumber: type === 'number' })}
        className={`${className ?? ''} ${styles.input}`}
      />
    );
  }
  if (!onChange) {
    throw 'Must have setState property';
  }

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      className={`${className ?? ''} ${styles.input}`}
    />
  );
};

export default Input;
