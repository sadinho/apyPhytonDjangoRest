import { useQuery } from 'react-query';
import api from '@/api';

interface CreditCard {
  id: number;
  holder: string;
  // Adicione outras propriedades do cartão de crédito aqui
}

const CreditCards = () => {
  const { data: creditCards, error } = useQuery<CreditCard[]>(
    'creditcards',
    async () => {
      const response = await api.get('/creditcards/');
      return response.data;
    }
  );

  if (error) {
    return <div>Erro ao buscar cartões de crédito</div>;
  }

  return (
    <div>
      <h1>Cartões de Crédito</h1>
      {creditCards ? (
        <ul>
          {creditCards.map((card) => (
            <li key={card.id}>{card.holder}</li>
          ))}
        </ul>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
};

export default CreditCards;