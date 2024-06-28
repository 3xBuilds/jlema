"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import power from '../../assets/icons/power.svg'
import Image from 'next/image';
import { IoWalletOutline } from "react-icons/io5";
import polygon from "@/assets/icons/polygon.svg"
import clean from "@/assets/icons/cleanlogo.svg"
import TokenFetcher from '../fetcher/tokenFetcher';

export const WalletConnectButtonRaffle = () => {
  return (
    <div className='block'>
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className='bg-black text-white rounded-xl cursor-pointer py-3 px-6'>
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='bg-red-500 font-semibold hover:bg-red-400 duration-150 w-full py-2 px-4 items-center justify-center rounded-lg text-white'>
                    Wrong network
                  </button>
                );
              }
              return (
                <div className='bg-jel-gray-1 rounded-xl flex gap-1 w-[48rem] text-sm font-bold py-3'>
                    <button className='flex items-center border-r-2 border-jel-gray-3 gap-5 w-64 px-4 justify-center rounded-l-xl'>
                        <Image src={clean} />
                        <div className='flex items-center gap-[0.4rem]'>
                            <TokenFetcher/> 
                            <h3>CLEAN</h3>
                        </div>
                    </button>
                  <button
                    onClick={openChainModal}
                    
                    type="button"
                    className='flex items-center border-r-2 border-jel-gray-3 gap-5 w-64 px-4 justify-center rounded-l-xl'
                  >
                    <Image src={polygon} />
                    <h3 className=''>
                        {account.displayBalance
                        ? ` ${account.displayBalance}`
                        : ''}
                    </h3>
                  </button>
                  <button title='Click to view address' onClick={openAccountModal} type="button" className='text-center flex gap-1 font-semibold w-64 px-4 items-center rounded-r-xl justify-center text-black'>
                    {/* {account.displayName} */}
                    <span className='flex gap-2 w-[50%] items-center justify-center'>
                      <IoWalletOutline className='text-md'/>
                      <h3 className='  text-base font-semibold text-black'>{account.displayName}</h3>
                    </span>
                    
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
    </div>
  );
};