'use client';
import React, { ReactNode } from 'react'
import { GlobalContextProvider } from '@/context/MainContext';

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {

  return (
    <GlobalContextProvider>
        {children}
    </GlobalContextProvider>
  )
}

export default Providers