"use client"
import { Provider } from "react-redux";
import React from "react";
import {configuredStore} from "./store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()
type Props = {
  children: React.ReactNode;
};
const storeValue = configuredStore();

const RootRedux = ({children} : Props) => (
<QueryClientProvider client={queryClient}>
  <Provider store={storeValue}>
  <Toaster  position="top-right"
  reverseOrder={false} />
    {children}
  </Provider>
</QueryClientProvider>
);

export default RootRedux;