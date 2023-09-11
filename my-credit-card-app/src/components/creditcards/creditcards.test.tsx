import React from 'react';
import { render, screen } from '@testing-library/react';
import CreditCards from './CreditCards';

// Mock das dependências
jest.mock('react-query', () => ({
  useQuery: () => ({
    data: [
      {
        id: 1,
        holder: 'John Doe',
        number: '1234 5678 9012 3456',
        exp_date: '2023-12-31',
        brand: 'Visa',
        cvv: '123',
      },
    ],
    error: null,
    refetch: jest.fn(),
  }),
}));

// Mock da função useRouter do Next.js
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CreditCards Component', () => {
  it('renders without crashing', () => {
    render(<CreditCards />);
  });

  it('displays the header', () => {
    render(<CreditCards />);
    expect(screen.getByText('Cartões de Crédito')).toBeInTheDocument();
  });

  it('displays a list of credit cards', async () => {
    render(<CreditCards />);
    const cardHolder = await screen.findByText('Titular: John Doe');
    const cardNumber = await screen.findByText('Nº Cartão: 1234 5678 9012 3456');
    const cardExpDate = await screen.findByText('Vencimento: 2023-12-31');
    const cardBrand = await screen.findByText('Bandeira: Visa');
    const cardCvv = await screen.findByText('CVV: 123');

    expect(cardHolder).toBeInTheDocument();
    expect(cardNumber).toBeInTheDocument();
    expect(cardExpDate).toBeInTheDocument();
    expect(cardBrand).toBeInTheDocument();
    expect(cardCvv).toBeInTheDocument();
  });

  // Adicione mais testes aqui conforme necessário
});
