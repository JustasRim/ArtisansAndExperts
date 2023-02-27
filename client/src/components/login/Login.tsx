import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { AuthContext } from '../../context/AuthContext';
import { useAxios } from '../../hooks/useAxios';
import Button from '../button/Button';
import { Card } from '../card/Card';
import Input from '../input/Input';
import styles from './login.module.scss';

const login = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginInput = z.infer<typeof login>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(login) });

  const { setUser } = useContext(AuthContext);
  const { ax } = useAxios();

  const onSubmit = async (data: LoginInput) => {
    const response = await ax.post('/auth/login', data);
    if (response.status !== 200) {
      return;
    }

    const { data: responseData } = response;
    setUser({
      name: responseData.name,
      lastName: responseData.lastName,
      role: responseData.role,
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    });

    window.location.href = '/';
  };

  return (
    <div className={styles.login}>
      <Card className={styles.login__card}>
        <h1>Prisijungimas</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.login__label} htmlFor="email">
            El. paštas:
          </label>
          <Input className={styles.login__input} register={register} id="email" type="email" />
          {errors.email?.message && <p className="error">{errors.email?.message}</p>}
          <label className={styles.login__label} htmlFor="password">
            Slaptažodis:
          </label>
          <Input className={styles.login__input} register={register} id="password" type="password" />
          {errors.password?.message && <p className="error">{errors.password?.message}</p>}
          <Link className={styles.login__link} to={'/password-reset-request'} tabIndex={0}>
            Neprisimenu slaptažodžio
          </Link>
          <Button className={styles.login__submit} type="submit">
            Prisijungti
          </Button>
          <Link className={styles.login__link} to={'/sign-up'} tabIndex={0}>
            Aš neturiu paskyros!
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default Login;
