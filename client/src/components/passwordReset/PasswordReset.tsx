import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { AuthContext } from '../../context/AuthContext';
import { useAxios } from '../../hooks/useAxios';
import Button from '../button/Button';
import { Card } from '../card/Card';
import Input from '../input/Input';
import styles from './passwordReset.module.scss';

const passwordReset = z
  .object({
    newPassword: z.string().min(6, 'Mažiausiai 6 simboliai'),
    confirmPassword: z.string().min(6, 'Mažiausiai 6 simboliai'),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Slaptažodžiai nesutampa',
        path: ['confirmPassword'],
        fatal: true,
      });
    }
  });

type PasswordResetInput = z.infer<typeof passwordReset>;

export function PasswordReset() {
  const [searchParam] = useSearchParams();
  const { ax } = useAxios();
  const { setUser } = useContext(AuthContext);

  const email = searchParam.get('email');
  const token = searchParam.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetInput>({ resolver: zodResolver(passwordReset) });

  const onSubmit = async (data: PasswordResetInput) => {
    const response = await ax.post('/auth/password-reset', { ...data, email: email, token: token });
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
    <div className={styles.reset}>
      <Card className={styles.reset__card}>
        <h1>Atkurti slaptažodį</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.reset__label} htmlFor="newPassword">
            Naujas slaptažodis:
          </label>
          <Input className={styles.reset__input} register={register} id="newPassword" type="password" />
          {errors.newPassword?.message && <p className="error">{errors.newPassword?.message}</p>}
          <label className={styles.reset__label} htmlFor="confirmPassword">
            Pakartokite slaptažodį:
          </label>
          <Input className={styles.reset__input} register={register} id="confirmPassword" type="password" />
          {errors.confirmPassword?.message && <p className="error">{errors.confirmPassword?.message}</p>}
          <Button className={styles.reset__submit} type="submit">
            Prisijungti
          </Button>
          <Link className={styles.reset__link} to={'/sign-up'} tabIndex={0}>
            Aš neturiu paskyros!
          </Link>
        </form>
      </Card>
    </div>
  );
}
