import { useSearchParams } from 'react-router-dom';

import { Profile } from '../../profile/Profile';

export function Preview() {
  const [searchParam] = useSearchParams();

  const mail = searchParam.get('email');
  if (!mail) {
    return <div>Neteisingas paštas.</div>;
  }

  return <Profile email={mail} />;
}
