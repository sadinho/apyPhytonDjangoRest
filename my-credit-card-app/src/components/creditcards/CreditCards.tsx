import React, { useState } from 'react';
import Modal from 'react-modal';
import { useQuery } from 'react-query';
import api from '@/api';
import { TableComponent } from '@/components/Table';
import { Spinner, CardBody, Card, CardText, CardTitle } from 'reactstrap';
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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.5s ease-in-out',
  },
};

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

const CreditCards: React.FC = () => {
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCard, setNewCard] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState([]);


  const cleanData = () => {
    setEditCard(null);
    setEditedHolder('');
    setEditedNumber('');
    setEditedExpDate('');
    setEditedBrand('');
    setEditedCvv('');
    setSelectedCardId(null);
  }

  const handleEditClick = (id: number) => {
    const cardToEdit = creditCards && creditCards.find((card) => card.id === id);
    if (cardToEdit) {
      setEditCard(id);
      setSelectedCardId(id);
      setNewCard(false);
      setEditedHolder(cardToEdit.holder);
      setEditedNumber(cardToEdit.number);
      setEditedExpDate(cardToEdit.exp_date);
      setEditedBrand(cardToEdit.brand);
      setEditedCvv(cardToEdit.cvv);
      setIsEditModalOpen(true);
    }
  };


  const handleSaveClick = async () => {
    try {
      if (newCard) {

        await api.post('/creditcards/', {
          holder: editedHolder,
          number: editedNumber,
          exp_date: editedExpDate,
          brand: editedBrand,
          cvv: editedCvv,
        });

      } else {

        await api.put(`/creditcards/${selectedCardId}/`, {
          holder: editedHolder,
          number: editedNumber,
          exp_date: editedExpDate,
          brand: editedBrand,
          cvv: editedCvv,
        });

      }

      await refetch();
      setIsEditModalOpen(false);
      setSelectedCardId(null);
      cleanData()
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        const errorMessages: any = Object.keys(errorData).map((key) => ({
          field: key,
          message: errorData[key][0], // Pegar a primeira mensagem de erro para cada campo
        }));

        setErrorMessages(errorMessages);
      } else {
        console.error('Erro ao salvar as alterações:', error);
      }
    }
  };


  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedCardId(null);
    setNewCard(false);
    cleanData()
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCardId(id);
    setIsDeleteModalOpen(true);
  };

  const handleAddNewClick = () => {
    setNewCard(true);
    setIsEditModalOpen(true);
  };


  const handleConfirmDelete = async () => {
    try {
      if (selectedCardId !== null) {
        await api.delete(`/creditcards/${selectedCardId}/`);
        await refetch();
      }

      setIsDeleteModalOpen(false);
    } catch (error: any) {
      alert(`Erro ao excluir o cartão de crédito::, ${error}`)
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
      <S.CustomAddButton onClick={() => handleAddNewClick()}>Adicionar Novo Cartão</S.CustomAddButton>
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

                          <S.CustomEditButton onClick={() => handleEditClick(card.id)}>
                            <MdModeEdit />
                          </S.CustomEditButton>

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
            style={customStyles}
          >
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir este cartão de crédito?</p>
            <S.CustomDeleteButton onClick={handleConfirmDelete}>Confirmar</S.CustomDeleteButton>
            <S.CustomAddButton onClick={handleCancelDelete}>Cancelar</S.CustomAddButton>
          </Modal>

          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={handleCancelEdit}
            contentLabel="Editar Cartão de Crédito"
            style={customStyles}
          >

            <h2>{newCard ? 'Adicionar novo cartão' : 'Editar Cartão'}</h2>
            {errorMessages.length > 0 && (
              <div style={{color: 'red'}}>
                <h3>Atenção:</h3>
                <ul>
                  {errorMessages.map((error: any, index) => (
                    <li key={index}>
                      <strong>{error?.field}:</strong> {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <S.CustomInputContainer>
              <S.CustomLabel>Titular:</S.CustomLabel>
              <S.CustomInput
                type="text"
                value={editedHolder}
                onChange={(e) => setEditedHolder(e.target.value)}
              />
            </S.CustomInputContainer>
            <S.CustomInputContainer>
              <S.CustomLabel>Nº Cartão:</S.CustomLabel>
              <S.CustomInput
                type="text"
                value={editedNumber}
                onChange={(e) => setEditedNumber(e.target.value)}
              />
            </S.CustomInputContainer>
            <S.CustomInputContainer>
              <S.CustomLabel>Vencimento:</S.CustomLabel>
              <S.CustomInput
                type="text"
                value={editedExpDate}
                onChange={(e) => setEditedExpDate(e.target.value)}
              />
            </S.CustomInputContainer>
            <S.CustomInputContainer>
              <S.CustomLabel>CVV:</S.CustomLabel>
              <S.CustomInput
                type="text"
                value={editedCvv}
                onChange={(e) => setEditedCvv(e.target.value)}
              />
            </S.CustomInputContainer>
            <S.CustomEditButton onClick={handleSaveClick}>Salvar</S.CustomEditButton>
            <S.CustomDeleteButton onClick={handleCancelEdit}>Cancelar</S.CustomDeleteButton>
          </Modal>
        </>
      ) : (
        <S.CustonCard>Carregando...<Spinner color='success' /></S.CustonCard>
      )}

    </div>
  );
};

export default CreditCards;
