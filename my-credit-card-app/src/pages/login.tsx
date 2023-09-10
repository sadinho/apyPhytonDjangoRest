import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from '@/components/login/Login';

const queryClient = new QueryClient();

const LoginAppPage = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <Login />
        </QueryClientProvider>
    );
};

export default LoginAppPage;


