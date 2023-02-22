import { useQuery } from 'react-query';

import { useAxios } from '../../hooks/useAxios';
import { Expert } from '../../utils/Interfaces';
import { ExpertCard } from '../expertCard/ExpertCard';
import styles from './experts.module.scss';

export function Experts() {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<Expert[], Error>('experts', async () => {
    const experts = await ax.get('expert');
    if (experts.request?.status === 204) {
      throw new Error('Nėra ekspertų');
    }

    return experts.data;
  });

  if (isLoading) {
    return <div>Kraunasi...</div>;
  }

  if (error) {
    return <div>Klaida...</div>;
  }

  return (
    <>
      <h1>Ekspertai</h1>
      <p>
        Šiame puslapyje galite rasti ekspertus ieškomoje srityje, kurie gali padėti jums su įvairiais uždaviniais ir
        iššūkiais. Mes esame specializuota platforma, kurioje ekspertai iš skirtingų sričių gali bendrauti su klientais,
        dalintis savo žiniomis ir patirtimi bei teikti naudingus patarimus.
      </p>
      <div className={styles.experts}>
        {data?.map((expert) => (
          <ExpertCard key={expert.id} {...expert} />
        ))}
      </div>
    </>
  );
}
