import styled from 'styled-components';


export const CustonCard = styled.div`
  border: 1px solid #e0e0e0; 
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10rem;
  margin-bottom: 16px;
  & h1 {
    margin-left: 10%;
  }
`;


export const CustomButton = styled.button`
  border: 1px solid #e0e0e0; 
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
  font-size: 1.2rem;
  background: green;
  color: white;
  font-weight: bold;
  margin-bottom: 16px;
`;



export const CustomLabel = styled.label`
  font-weight: bold; 
`;

export const CustomInput = styled.input`
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
  margin: 10px;
`;

export const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20%;
`;

