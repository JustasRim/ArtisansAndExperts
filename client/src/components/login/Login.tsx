import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import Button from '../button/Button';
import Card from '../card/Card';
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

  const onSubmit = (data: LoginInput) => {
    alert(JSON.stringify(data));
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
          <div className={styles.login__controls}>
            <Button type="submit">Prisijungti</Button>
            <Link to={'/sign-up'}>Aš neturiu paskyros!</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
