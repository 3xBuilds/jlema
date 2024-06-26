"use client"
import Image from 'next/image'
import cross from '../../assets/icons/cross.svg'
import download from '../../assets/icons/downloadcircle.svg'
import magiceden from '../../assets/icons/magiceden.png'
import opensea from '../../assets/icons/opensea.png'
import { useEffect } from 'react'


const NftInfoModal = ({showNftInfo, setShowNftInfo}) => {

  const downloadImage = async () => {
    if (!showNftInfo?.img) return;
    
    try {
      const response = await fetch(showNftInfo.img);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'nft-image.png'; // You can set a default filename here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  }
  
  return (
    <div className='w-screen h-screen top-0 left-0 fixed z-40'>
      {console.log(showNftInfo)}
        <div className='fixed w-screen h-screen bg-black/50'></div>
        <div className='fixed sm:w-[80%] w-[95%]  h-[98%] sm:h-[70%] bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='w-full h-full relative overflow-scroll noscr grid sm:grid-cols-2 over'>
                <Image onClick={()=>{setShowNftInfo(null)}} src={cross} className='opacity-60 absolute top-5 right-5 cursor-pointer'/>
                <div className='w-full h-full sm:overflow-hidden flex items-center justify-center'>
                    {showNftInfo && <Image width={1080} height={1080} src={showNftInfo.img} className='w-full h-full rounded-xl object-cover'/>}
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
                    {showNftInfo?.data?.attributes[2] && <div className='border-[1px] border-jel-gray-3 rounded-lg p-4'>
                      <p className='font-normal text-sm text-jel-gray-4'>{showNftInfo?.data?.attributes[2]?.trait_type}</p>
                      <p className='font-semibold text-base text-black'>{showNftInfo?.data?.attributes[2]?.value}</p>
                    </div>}
                    {showNftInfo?.data?.attributes[3] && <div className='border-[1px] border-jel-gray-3 rounded-lg p-4'>
                      <p className='font-normal text-sm text-jel-gray-4'>{showNftInfo?.data?.attributes[3]?.trait_type}</p>
                      <p className='font-semibold text-base text-black'>{showNftInfo?.data?.attributes[3]?.value}</p>
                    </div>}
                    {showNftInfo?.data?.attributes[4] && <div className='border-[1px] border-jel-gray-3 rounded-lg p-4 col-span-2'>
                      <p className='font-normal text-sm text-jel-gray-4'>{showNftInfo?.data?.attributes[4]?.trait_type}</p>
                      <p className='font-semibold text-base text-black'>{showNftInfo?.data?.attributes[4]?.value}</p>
                    </div>}
                  </div>

                  <div className=' w-full mt-2'>
                  <button onClick={downloadImage} className=' col-span-2 flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-3 px-6 items-center justify-center rounded-lg text-black'>
                      <Image src={download} className='w-5'/>
                      <h3 className=' text-base font-semibold text-black'>Download Image</h3>
                  </button>

                  <div className="w-full grid grid-cols-2 mt-2 gap-2 max-lg:grid-cols-1">
                    <a href={`${showNftInfo?.melink}`} target='_blank'>
                      <button className='flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-3 px-6 items-center justify-center rounded-lg text-black'>
                        <Image src={magiceden} className='w-5'/>
                        <h3 className=' text-base font-semibold text-black'>View on Magic Eden</h3>
                      </button>
                    </a>
                    <a href={`${showNftInfo?.openlink}`} target='_blank'>
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

    </div>
  )
}

export default NftInfoModal