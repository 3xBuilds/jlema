"use client"
import Image from 'next/image'
import cross from '../../assets/icons/cross.svg'
import download from '../../assets/icons/downloadcircle.svg'
import magiceden from '../../assets/icons/magiceden.png'
import opensea from '../../assets/icons/opensea.png'
import { useEffect } from 'react'


const NftInfoModal = ({showNftInfo, setShowNftInfo}) => {
  
  return (
    <div className='w-screen h-screen top-0 left-0 fixed z-40'>
        <div className='fixed w-screen h-screen bg-black/50'></div>
        <div className='fixed w-[80%] h-[70%] bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='w-full h-full relative grid grid-cols-2'>
                <Image onClick={()=>{setShowNftInfo(null)}} src={cross} className='opacity-60 absolute top-5 right-5 cursor-pointer'/>
                <div className='w-full h-full overflow-hidden flex items-center justify-center'>
                    {showNftInfo && <Image width={1080} height={1080} src={showNftInfo?.data?.image} className='w-full h-full object-cover'/>}
                </div>
                <div className=' p-6 pt-16 flex flex-col justify-between'>
                  <h1 className='font-bold text-black text-[32px]'>{showNftInfo?.data?.name}</h1>

                  <div className='grid grid-cols-2 gap-5'>
                    <div className='border-[1px] border-jel-gray-3 rounded-lg p-4'>
                      <p className='font-normal text-sm text-jel-gray-4'>{showNftInfo?.data?.attributes[0]?.trait_type}</p>
                      <p className='font-semibold text-base text-black'>{showNftInfo?.data?.attributes[0]?.value}</p>
                    </div>
                    <div className='border-[1px] border-jel-gray-3 rounded-lg p-4'>
                      <p className='font-normal text-sm text-jel-gray-4'>{showNftInfo?.data?.attributes[1]?.trait_type}</p>
                      <p className='font-semibold text-base text-black'>{showNftInfo?.data?.attributes[1]?.value}</p>
                    </div>
                    <div className='border-[1px] border-jel-gray-3 rounded-lg p-4'>
                      <p className='font-normal text-sm text-jel-gray-4'>{showNftInfo?.data?.attributes[2]?.trait_type}</p>
                      <p className='font-semibold text-base text-black'>{showNftInfo?.data?.attributes[2]?.value}</p>
                    </div>
                    <div className='border-[1px] border-jel-gray-3 rounded-lg p-4'>
                      <p className='font-normal text-sm text-jel-gray-4'>{showNftInfo?.data?.attributes[3]?.trait_type}</p>
                      <p className='font-semibold text-base text-black'>{showNftInfo?.data?.attributes[3]?.value}</p>
                    </div>
                    <div className='border-[1px] border-jel-gray-3 rounded-lg p-4 col-span-2'>
                      <p className='font-normal text-sm text-jel-gray-4'>{showNftInfo?.data?.attributes[4]?.trait_type}</p>
                      <p className='font-semibold text-base text-black'>{showNftInfo?.data?.attributes[4]?.value}</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                  <button className=' col-span-2 flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-3 px-6 items-center justify-center rounded-lg text-black'>
                      <Image src={download} className='w-5'/>
                      <h3 className=' text-base font-semibold text-black'>Download Image</h3>
                  </button>
                  <a href={`https://magiceden.io/collections/polygon/0x71d9943cb18d9cb3605bc63dc6ce659eb7a78ced?evmItemDetailsModal=137%7E0x71d9943cb18d9cb3605bc63dc6ce659eb7a78ced%7E${showNftInfo?.tokenId}`} target='_blank'>
                    <button className='flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-3 px-6 items-center justify-center rounded-lg text-black'>
                      <Image src={magiceden} className='w-5'/>
                      <h3 className=' text-base font-semibold text-black'>View on Magic Eden</h3>
                    </button>
                  </a>
                  <a href={`https://opensea.io/assets/matic/0x71d9943cb18d9cb3605bc63dc6ce659eb7a78ced/${showNftInfo?.tokenId}`} target='_blank'>
                    <button className='flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-3 px-6 items-center justify-center rounded-lg text-black'>
                      <Image src={opensea} className='w-5'/>
                      <h3 className=' text-base font-semibold text-black'>View on Opensea</h3>
                    </button>
                  </a>
                </div>
                </div>

                
            </div>
        </div>

    </div>
  )
}

export default NftInfoModal