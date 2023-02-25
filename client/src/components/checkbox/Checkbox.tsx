import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import Input from '../input/Input';
import styles from './checkbox.module.scss';

type Props<T extends FieldValues> = {
  id: Path<T>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<T>;
  className?: string;
};

export function Checkbox<T extends FieldValues>({ id, className, register, onChange }: Props<T>) {
  return (
    <div className={className}>
      <Input className={styles.checkbox} register={register} onChange={onChange} id={id} type="checkbox" />
    </div>
  );
}
