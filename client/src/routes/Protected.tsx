import { ReactNode, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { Role } from '../utils/Enums';

type Props = {
  children: ReactNode;
  roles: Role[];
};

export function Protected({ children, roles }: Props) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const isAuth = roles.some((q) => q === user.role);
    setAuthorized(isAuth);
    if (!isAuth) {
      window.location.href = '/login';
    }
  }, [user]);

  return authorized ? <>{children}</> : <></>;
}
