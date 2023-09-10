import React from 'react';
import { useQuery } from 'react-query';
import api from '@/api';
import { TableComponent } from '@/components/Table'
import { Col, Card, CardBody, CardTitle, CardText } from 'reactstrap'; // Importe os componentes do Reactstrap
import { useMediaQuery } from 'react-responsive';
import { CustonCard } from './styles'

interface CreditCard {
  id: number;
  holder: string;
  number: string; // Adicione outras propriedades do cartão de crédito aqui
  exp_date: string;
  brand: string;
  cvv: string;
}

const columns: any = [
  {
    Header: 'Código',
    accessor: 'id',
  },
  {
    Header: 'Titular',
    accessor: 'holder',
  },
  {
    Header: 'Nº Cartão',
    accessor: 'number',
  },
  {
    Header: 'Vencimento',
    accessor: 'exp_date',
  },
  {
    Header: 'Bandeira',
    accessor: 'brand',
  },
  {
    Header: 'Cvv',
    accessor: 'cvv',
  },
  {
    Header: '',
    accessor: 'acoes'
  },
];

const CreditCards = () => {
  const { data: creditCards, error } = useQuery<CreditCard[]>(
    'creditcards',
    async () => {
      const response = await api.get('/creditcards/');
      return response.data;
    }
  );

  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  if (error) {
    return <div>Erro ao buscar cartões de crédito</div>;
  }

  return (
    <div>
      <h1>Cartões de Crédito</h1>
      {creditCards ? (
        <>
          {isTabletOrLarger ? (
            <TableComponent columns={columns} data={creditCards || []} />
          ) : (
            <ul>
              {creditCards.map((card) => (
                <CustonCard key={card.id}>
                  <Card>
                    <CardBody>
                      <CardTitle>Titular: {card.holder}</CardTitle>
                      <CardText>Nº Cartão: {card.number}</CardText>
                      <CardText>Vencimento: {card.exp_date}</CardText>
                      <CardText>Bandeira: {card.brand}</CardText>
                      <CardText>CVV: {card.cvv}</CardText>
                    </CardBody>
                  </Card>
                </CustonCard>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
};

export default CreditCards;
