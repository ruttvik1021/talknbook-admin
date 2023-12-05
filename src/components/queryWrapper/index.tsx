"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const QueryWrapper: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryWrapper;
