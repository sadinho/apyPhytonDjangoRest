import React, { useState } from 'react';
import Modal from 'react-modal';
import { useQuery } from 'react-query';
import api from '@/api';
import { TableComponent } from '@/components/Table';
import { Card, CardBody, CardTitle, CardText, Button, Input, FormGroup } from 'reactstrap';
import { useMediaQuery } from 'react-responsive';
import * as S from './styles';
import { useRouter } from 'next/router';
import { MdModeEdit, MdDelete } from 'react-icons/md';

interface CreditCard {
  id: number;
  holder: string;
  number: string;
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
    Header: 'CVV',
    accessor: 'cvv',
  },
  {
    Header: 'Ações',
    accessor: 'acoes',
  },
];

const CreditCards = () => {
  const router = useRouter();
  const { data: creditCards, error, refetch } = useQuery<CreditCard[]>(
    'creditcards',
    async () => {
      const response = await api.get('/creditcards/');
      return response.data.map((card: CreditCard) => ({
        ...card,
        acoes: (
          <>
            <S.CustomEditButton onClick={() => handleEditClick(card.id)}>
              <MdModeEdit />
            </S.CustomEditButton>
            <S.CustomDeleteButton onClick={() => handleDeleteClick(card.id)}>
              <MdDelete />
            </S.CustomDeleteButton>
          </>
        ),
      }));
    }
  );

  const isTabletOrLarger = useMediaQuery({ minWidth: 768 });

  const [editCard, setEditCard] = useState<number | null>(null);
  const [editedHolder, setEditedHolder] = useState<string>('');
  const [editedNumber, setEditedNumber] = useState<string>('');
  const [editedExpDate, setEditedExpDate] = useState<string>('');
  const [editedBrand, setEditedBrand] = useState<string>('');
  const [editedCvv, setEditedCvv] = useState<string>('');
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para controlar a abertura do modal de edição

  const handleEditClick = (id: number) => {
    const cardToEdit = creditCards && creditCards.find((card) => card.id === id);
    if (cardToEdit) {
      setEditCard(id);
      setEditedHolder(cardToEdit.holder);
      setEditedNumber(cardToEdit.number);
      setEditedExpDate(cardToEdit.exp_date);
      setEditedBrand(cardToEdit.brand);
      setEditedCvv(cardToEdit.cvv);
      setSelectedCardId(id);
      setIsEditModalOpen(true); // Abra o modal de edição ao clicar em Editar
    }
  };

  const handleSaveClick = async () => {
    try {
      if (selectedCardId !== null) {
        await api.put(`/creditcards/${selectedCardId}/`, {
          holder: editedHolder,
          number: editedNumber,
          exp_date: editedExpDate,
          brand: editedBrand,
          cvv: editedCvv,
        });

        await refetch();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedCardId(null);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCardId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedCardId !== null) {
        await api.delete(`/creditcards/${selectedCardId}/`);
        await refetch();
      }

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Erro ao excluir o cartão de crédito:', error);
    }
  };

  const handleCancelDelete = () => {
    setSelectedCardId(null);
    setIsDeleteModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (error) {
    return (
      <>
        <div>Erro ao buscar cartões de crédito. Efetue login novamente.</div>
        <button onClick={() => router.push('/')}>Ir para o login</button>
      </>
    );
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
                <S.CustonCard key={card.id}>
                  <Card>
                    <CardBody>

                      <>
                        <CardTitle>Titular: {card.holder}</CardTitle>
                        <CardText>Nº Cartão: {card.number}</CardText>
                        <CardText>Vencimento: {card.exp_date}</CardText>
                        <CardText>Bandeira: {card.brand}</CardText>
                        <CardText>CVV: {card.cvv}</CardText>
                      </>

                      <div>
                        <div>
                          {/* Renderiza o componente de botão de edição personalizado */}
                          <S.CustomEditButton onClick={() => handleEditClick(card.id)}>
                            <MdModeEdit />
                          </S.CustomEditButton>
                          {/* Renderiza o componente de botão de exclusão personalizado */}
                          <S.CustomDeleteButton onClick={() => handleDeleteClick(card.id)}>
                            <MdDelete />
                          </S.CustomDeleteButton>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </S.CustonCard>
              ))}
            </ul>
          )}

          <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={handleCancelDelete}
            contentLabel="Confirmar Exclusão"
          >
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir este cartão de crédito?</p>
            <button onClick={handleConfirmDelete}>Confirmar</button>
            <button onClick={handleCancelDelete}>Cancelar</button>
          </Modal>

          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={handleCancelEdit}
            contentLabel="Editar Cartão de Crédito"
          >
            <h2>Editar Cartão de Crédito</h2>
            <div>
              <label>Titular:</label>
              <input
                type="text"
                value={editedHolder}
                onChange={(e) => setEditedHolder(e.target.value)}
              />
            </div>
            <div>
              <label>Nº Cartão:</label>
              <input
                type="text"
                value={editedNumber}
                onChange={(e) => setEditedNumber(e.target.value)}
              />
            </div>
            <div>
              <label>Vencimento:</label>
              <input
                type="text"
                value={editedExpDate}
                onChange={(e) => setEditedExpDate(e.target.value)}
              />
            </div>
            <div>
              <label>CVV:</label>
              <input
                type="text"
                value={editedCvv}
                onChange={(e) => setEditedCvv(e.target.value)}
              />
            </div>
            <button onClick={handleSaveClick}>Salvar</button>
            <button onClick={handleCancelEdit}>Cancelar</button>
          </Modal>
        </>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
};

export default CreditCards;
