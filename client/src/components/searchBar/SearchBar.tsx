import { Status } from '../../utils/Enums';
import { SelectOption } from '../../utils/Interfaces';
import { Checkbox } from '../checkbox/Checkbox';
import Input from '../input/Input';
import { Select } from '../select/Select';
import styles from './searchBar.module.scss';

type Props = {
  setSearch: (value: string) => void;
  setActions?: { name: string; action: (value: boolean) => void }[];
  setSelection?: { action: (value: string) => void }[];
  options?: SelectOption[];
};

export function SearchBar({ setSearch, setActions, setSelection, options }: Props) {
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
      {setSelection?.map((item, index) => (
        <span key={index}>
          <Select id="approved" className={styles.search__check} onChange={item.action} options={options} />
        </span>
      ))}
    </div>
  );
}
