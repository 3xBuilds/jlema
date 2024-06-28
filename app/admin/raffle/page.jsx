"use client"
import React, { useState } from 'react'

const RaffleAdmin = () => {

  const [selected, setSelected] = useState(0);

  return (
    <div className='grid grid-cols-12'>
        <div className=' col-span-2 border-r-[1px] border-jel-gray-3 h-screen flex flex-col gap-2 items-center justify-start pt-20 p-4'>
            <div onClick={()=>{setSelected(0)}} className={`w-full h-12 flex items-center justify-start px-5 font-medium rounded-lg ${ selected==0 ? "bg-jel-gray-1 text-black" : "text-jel-gray-4"} cursor-pointer`}>Overview</div>
            <div onClick={()=>{setSelected(1)}} className={`w-full h-12 flex items-center justify-start px-5 font-medium rounded-lg ${ selected==1 ? "bg-jel-gray-1 text-black" : "text-jel-gray-4"} cursor-pointer`}>Add new raffle</div>
        </div>
        {selected==0 ? <div className=' col-span-10  p-10 pt-20 w-full'>
            <div className='grid grid-cols-3 gap-5 w-full'>
                <div className=' border-[1px] border-jel-gray-3 rounded-lg w-full h-24 p-5 px-10 flex flex-col items-start justify-center'>
                    <h3 className='text-sm text-jel-gray-4'>Total Raffles</h3>
                    <h3 className='text-2xl font-semibold'>50</h3>
                </div>
                <div className=' border-[1px] border-jel-gray-3 rounded-lg w-full h-24 p-5 px-10 flex flex-col items-start justify-center'>
                    <h3 className='text-sm text-jel-gray-4'>Total Active Raffles</h3>
                    <h3 className='text-2xl font-semibold'>150</h3>
                </div>
                <div className=' border-[1px] border-jel-gray-3 rounded-lg w-full h-24 p-5 px-10 flex flex-col items-start justify-center'>
                    <h3 className='text-sm text-jel-gray-4'>Total Ended Raffles</h3>
                    <h3 className='text-2xl font-semibold'>100</h3>
                </div>
            </div>
            <div className='p-10 text-center'>
                Grid lies here
            </div>
        </div>:
        <div className=' col-span-10  p-10 pt-20 w-full'>
            <h1 className='font-bold text-black text-3xl'>New Raffle</h1>
            <div className='grid grid-cols-7 gap-5 mt-10 w-[70%]'>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>NFT contract address</h2>
                    <input type='text' placeholder='Contract Address' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Token ID</h2>
                    <input type='text' placeholder='Token ID' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className='w-full h-full flex items-end'>
                    <button className=' w-full py-3 font-medium rounded-lg bg-jel-gray-1 hover:bg-jel-gray-2'>Check</button>
                </div>

                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Ticket Price</h2>
                    <input type='text' placeholder='Ticket Price' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Token</h2>
                    <select className='w-full h-12 font-medium outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'>
                        <option value='ETH'>CLEAN</option>
                        <option value='BNB'>MATIC</option>
                    </select> 
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Amount of tickets</h2>
                    <input type='text' placeholder='Amount of tickets' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Tickets per wallet</h2>
                    <input type='text' placeholder='Tickets per wallet' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-6'>
                    <h2 className='mb-2 text-sm '>Opensea URL</h2>
                    <input type='text' placeholder='Opensea URL' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-6'>
                    <h2 className='mb-2 text-sm '>Raffle Image</h2>
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-40 h-40 border-2 border-jel-gray-3 border-dashed rounded-lg cursor-pointer hover:bg-jel-gray-1">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 text-jel-gray-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" />
                        </label>
                </div>
                <div></div>
                <button className=' col-span-2 w-32 py-3 font-medium text-white rounded-xl bg-black text-nowrap'>Create raffle</button>


            </div>
        </div>
        }
    </div>
  )
}

export default RaffleAdmin