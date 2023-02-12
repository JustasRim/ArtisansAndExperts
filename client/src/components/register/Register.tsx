import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { useAxios } from '../../hooks/useAxios';
import Button from '../button/Button';
import Card from '../card/Card';
import Input from '../input/Input';
import styles from './register.module.scss';

const registerInput = z
  .object({
    email: z.string().email('Reikalingas el. paštas'),
    name: z.string().min(2, 'Mažiausiai 2 simboliai'),
    lastName: z.string().min(2, 'Mažiausiai 2 simboliai'),
    password: z.string().min(6, 'Mažiausiai 6 simboliai'),
    confirmPassword: z.string().min(6, 'Mažiausiai 6 simboliai'),
    expert: z.boolean(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Slaptažodžiai nesutampa',
        path: ['confirmPassword'],
        fatal: true,
      });
    }
  });

type RegisterInput = z.infer<typeof registerInput>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerInput) });

  const { setUser } = useContext(AuthContext);
  const { ax } = useAxios();

  const onSubmit = async (data: RegisterInput) => {
    const response = await ax.post('/auth/sign-up', data);
    if (response.status !== 200) {
      return;
    }

    const { data: responseData } = response;
    setUser({
      name: responseData.name,
      lastName: responseData.lastName,
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    });
  };

  return (
    <div className={styles.register}>
      <Card className={styles.register__card}>
        <h1>Registracija</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.register__label} htmlFor="email">
            El. paštas:
          </label>
          <Input className={styles.register__input} register={register} id="email" type="email" />
          {errors.email?.message && <p className="error">{errors.email?.message}</p>}

          <label className={styles.register__label} htmlFor="name">
            Vardas:
          </label>
          <Input className={styles.register__input} register={register} id="name" type="text" />
          {errors.name?.message && <p className="error">{errors.name?.message}</p>}

          <label className={styles.register__label} htmlFor="lastName">
            Pavardė:
          </label>
          <Input className={styles.register__input} register={register} id="lastName" type="text" />
          {errors.lastName?.message && <p className="error">{errors.lastName?.message}</p>}

          <label className={styles.register__label} htmlFor="password">
            Slaptažodis:
          </label>
          <Input className={styles.register__input} register={register} id="password" type="password" />
          {errors.password?.message && <p className="error">{errors.password?.message}</p>}

          <label className={styles.register__label} htmlFor="password">
            Pakartokite slaptažodį:
          </label>
          <Input className={styles.register__input} register={register} id="confirmPassword" type="password" />
          {errors.confirmPassword?.message && <p className="error">{errors.confirmPassword?.message}</p>}

          <div className={`${styles.register__input} ${styles['register__input--inline']}`}>
            <label className={styles.register__label} htmlFor="password">
              Esu meistras (nesiregistruoju kaip klientas)?
            </label>
            <Input className={styles.register__checkbox} register={register} id="expert" type="checkbox" />
          </div>
          {errors.expert?.message && <p className="error">{errors.expert?.message}</p>}
          <div className={styles.register__controls}>
            <Button type="submit">Registruotis</Button>
            <Link to={'/login'}>Aš jau turiu paskyrą!</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
