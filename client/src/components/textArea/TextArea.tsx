import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './textArea.module.scss';

type Props<T extends FieldValues> = {
  id: Path<T>;
  register: UseFormRegister<T>;
  className?: string;
};

export function TextArea<T extends FieldValues>({ id, className, register }: Props<T>) {
  return <textarea id={id} {...register(id)} className={`${className ?? ''} ${styles.input}`} />;
}
