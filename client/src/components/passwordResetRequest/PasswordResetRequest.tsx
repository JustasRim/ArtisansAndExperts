import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { useAxios } from '../../hooks/useAxios';
import Button from '../button/Button';
import { Card } from '../card/Card';
import Input from '../input/Input';
import styles from './passwordResetRequest.module.scss';

const passwordReset = z.object({
  email: z.string().email('Netinkamas paštas'),
});

type PasswordResetInput = z.infer<typeof passwordReset>;

export function PasswordResetRequest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetInput>({ resolver: zodResolver(passwordReset) });

  const { ax } = useAxios();

  const onSubmit = async (data: PasswordResetInput) => {
    const response = await ax.post('/auth/password-reset-request', data);
    if (response.status !== 200) {
      return;
    }
  };

  return (
    <div className={styles.reset}>
      <Card className={styles.reset__card}>
        <h1>Atkurti slaptažodį</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.reset__label} htmlFor="email">
            El. paštas:
          </label>
          <Input className={styles.reset__input} register={register} id="email" type="email" />
          {errors.email?.message && <p className="error">{errors.email?.message}</p>}
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
