'use client';

//Context
import { GlobalContextProvider } from '../context/MainContext';
import Rainbow from './rainbow/rainbowKit';

const Providers = ({ children }) => {

  return (
    <Rainbow>
      <GlobalContextProvider>
          {children}
      </GlobalContextProvider>
    </Rainbow>
  )
}

export default Providers