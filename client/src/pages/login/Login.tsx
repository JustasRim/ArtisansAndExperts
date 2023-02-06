import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Input from '../../components/input/Input';
import styles from './login.module.scss';

const login = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginInput = z.infer<typeof login>;

const Login = () => {
  const { register, handleSubmit } = useForm<LoginInput>({ resolver: zodResolver(login) });

  const onSubmit = (data: LoginInput) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className={styles.login}>
      <Card>
        <h1>Prisijungti</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.card__label} htmlFor="email">
            El. paštas:
          </label>
          <Input className={styles.card__input} register={register} required id="email" type="email" />
          <label className={styles.card__label} htmlFor="password">
            Slaptažodis:
          </label>
          <Input className={styles.card__input} register={register} id="password" type="password" />
          <Button type="submit">Prisijungti</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
