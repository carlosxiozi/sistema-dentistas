'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import type * as React from 'react'
import { getQueryClient } from './query-client'

export const queryClient = getQueryClient();

export default function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}