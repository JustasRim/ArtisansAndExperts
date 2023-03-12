import { ReactNode } from 'react';

import styles from './table.module.scss';

type Props = {
  header: ReactNode[];
  rows?: Row[];
};

type Row = {
  id: string;
  row: ReactNode[];
};

export function Table({ header, rows }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {header.map((q: ReactNode, index) => (
            <td key={index}>{q}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((q: Row) => (
          <tr key={q.id} tabIndex={0}>
            {q.row.map((rowItem: ReactNode, rowItemIndex) => (
              <td key={rowItemIndex}>{rowItem}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
