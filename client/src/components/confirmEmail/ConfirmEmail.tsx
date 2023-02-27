import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAxios } from '../../hooks/useAxios';

export function ConfirmEmail() {
  const [searchParam] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { ax } = useAxios();

  const to = searchParam.get('to');
  const token = searchParam.get('token');

  useEffect(() => {
    const res = ax.post(`auth/confirm-email?email=${to}&token=${token}`);

    res.then((q) => {
      setShowSuccess(q.status === 200);
    });
  }, [to, token]);

  if (!to || !token) {
    return <div>Nuorodos klaida</div>;
  }

  if (showSuccess) {
    return <h1>Ačiū, kad prisijungėte prie mūsų.</h1>;
  }

  return <></>;
}
