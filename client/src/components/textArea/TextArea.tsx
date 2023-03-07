import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './textArea.module.scss';

type Props<T extends FieldValues> = {
  id: Path<T>;
  register?: UseFormRegister<T>;
  className?: string;
  rows?: number;
};

export function TextArea<T extends FieldValues>({ id, className, register, rows }: Props<T>) {
  if (register) {
    return <textarea id={id} {...register(id)} className={`${className ?? ''} ${styles.input}`} rows={rows} />;
  }

  return <textarea id={id} className={`${className ?? ''} ${styles.input}`} rows={rows} />;
}
