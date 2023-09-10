import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import CreditCards from "@/components/creditcards/CreditCards";

const queryClient = new QueryClient();

const CreditCardsPage = () => {


  return (
    <QueryClientProvider client={queryClient}>
      <CreditCards />
    </QueryClientProvider>
  );
};

export default CreditCardsPage;