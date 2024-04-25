"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import power from '../../assets/icons/power.svg'
import Image from 'next/image';

export const WalletConnectButton = () => {
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
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className='border-2 border-black rounded-full'
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 38,
                          height: 38,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 0,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 38, height: 38 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}
                  <button title='Click to view address' onClick={openAccountModal} type="button" className='text-center flex gap-1 bg-jel-gray-1 hover:bg-jel-gray-2 font-semibold duration-150 w-full py-2 px-4 items-center justify-center rounded-lg text-black'>
                    {/* {account.displayName} */}
                    <span className='flex gap-2 w-[50%] items-center justify-center'>
                      <Image src={power} className='w-4'/>
                      <h3 className=' text-sm font-semibold text-black'>Disconnect</h3>
                    </span>
                    {/* {account.displayBalance
                      ? ` ${account.displayBalance}`
                      : ''} */}
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