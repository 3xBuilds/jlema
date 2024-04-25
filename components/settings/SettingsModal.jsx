"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import cross from '@/assets/icons/cross.svg'
import imgIcon from '@/assets/icons/image.svg'
import { useGlobalContext } from '@/context/MainContext'

const SettingsModal = () => {

  const [settingType, setSettingType] = useState(0);
  const {setOpenSettings} = useGlobalContext();

  return (
    <>
        <div className='w-screen h-screen top-0 left-0 fixed z-40 flex flex-col'>
            <div onClick={()=>{setOpenSettings(false)}} className='fixed w-screen h-screen bg-black/50'></div>
            <div className='fixed w-[50%] bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='w-full flex flex-row items-center justify-between p-6 border-b-[1px] border-jel-gray-3'>
                  <h2 className='text-black font-bold text-xl'>Settings</h2>
                  <Image onClick={()=>{setOpenSettings(false)}} src={cross}/>
                </div>
                <div className='p-6'>
                  <div className=" h-12 rounded-xl flex flex-row gap-2 p-1">
                    <button onClick={()=>{setSettingType(0)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==0 ? " bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">Profile</h3>
                    </button>
                    <button onClick={()=>{setSettingType(1)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==1 ? "bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">NFT Highlights</h3>
                    </button>
                    <button onClick={()=>{setSettingType(2)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==2 ? "bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">Badge Highlights</h3>
                    </button>
                  </div>

                  {settingType == 0 && 
                  <div className='pt-6'>
                    <h3 className='text-base font-normal'>Profile Picture</h3>
                    <div onClick={()=>{}} className='mt-2 group cursor-pointer border-jel-gray-3 border-[1px] border-dashed w-48 h-48 rounded-xl flex items-center justify-center '>
                      <Image src={imgIcon} className='group-hover:scale-125 duration-300'/>
                    </div>

                    <h3 className='text-base font-normal mt-4'>Name</h3>
                    <input className='border-jel-gray-3 px-4 outline-black border-[1px] rounded-xl w-full h-12 mt-2 flex items-center justify-center '/>
                    
                    <h3 className='text-base font-normal mt-4'>Twitter/X Username</h3>
                    <input className='border-jel-gray-3 px-4 outline-black border-[1px] rounded-xl w-full h-12 mt-2 flex items-center justify-center '/>
                  </div>
                  }

                  {settingType == 1 && 
                    <div className='pt-6 flex flex-col w-full gap-2'>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 1</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 2</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 3</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      
                    </div>
                  }

                  {settingType == 2 && 
                    <div className='pt-6 flex flex-col w-full gap-2'>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 1</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 2</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 3</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 4</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      
                    </div>
                  }

                  <div className='pt-6 flex flex-row gap-4'>
                    <button className='bg-black text-white font-semibold rounded-xl cursor-pointer py-3 px-6'>Save</button>
                    <button className='bg-jel-gray-1 hover:bg-jel-gray-2 font-semibold text-black rounded-xl cursor-pointer py-3 px-6'>Cancel</button>
                  </div>
                </div> 
            </div>           
        </div>
    </>
  )
}

const SelectNFT = () => {

}

export default SettingsModal