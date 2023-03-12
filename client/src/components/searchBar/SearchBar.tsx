import { Checkbox } from '../checkbox/Checkbox';
import Input from '../input/Input';
import styles from './searchBar.module.scss';

type Props = {
  setSearch: (value: string) => void;
  setActions?: { name: string; action: (value: boolean) => void }[];
};

export function SearchBar({ setSearch, setActions }: Props) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.search}>
      <Input
        className={styles.search__bar}
        placeholder="Paieška"
        onChange={handleSearchChange}
        id="search"
        type="text"
      />
      {setActions?.map((item, index) => (
        <span key={index}>
          <label htmlFor="approved">{item.name}</label>
          <Checkbox
            className={styles.search__check}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => item.action(e.target.checked)}
            id="approved"
          />
        </span>
      ))}
    </div>
  );
}
