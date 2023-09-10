import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import api from '@/api';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation(
    async () => {
      const response = await api.post('/token/', {
        username,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        sessionStorage.setItem('authToken', data.access); 
        router.push('/creditcards');
      },
    }
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
