"use client"
import { useState } from 'react'
import Image from 'next/image'
import logo from '../assets/mainLogo.png'
import { usePathname, useRouter } from 'next/navigation'
import { IoClose, IoMenuOutline } from "react-icons/io5";

const Navbar = () => {

  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`w-full px-8 max-md:px-4 py-3 flex justify-between fixed bg-white z-40 top-0 left-0 ${(path=="/" | path=="/leaderboard" | path=="/raffle") ? "" : " border-b-[1px] border-jel-gray-3"} `}>
          <div className="max-lg:flex flex-row items-center justify-center gap-2 z-50">
            <div className="lg:hidden" 
            onClick={()=>setIsOpen(prev=>!prev)}
            >
              { isOpen ? <IoClose className="text-3xl"/> : <IoMenuOutline className="text-3xl"/>}
            </div>
            <Image src={logo} className='w-32 max-lg:w-28'/>
          </div>
          <ul className='flex flex-row gap-2 font-semibold items-center max-md:hidden'>
              <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Home</li>
              <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'><button onClick={()=>{router.push("/leaderboard")}}>Leaderboard</button></li>
              <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Ecosystem</li>
              <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Community</li>
              <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Info</li>
              <a href="https://app.komet.me/nfts/Jlema/415" target='_blank'><li className='px-6 py-2 bg-black text-white cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Buy</li></a>
          </ul>
          <h3 className=' py-2 text-sm font-semibold md:hidden relative z-50'>Buy now</h3>
          {/* Opens on clicking hamburger and shows only for phones */}
          <div className={`w-screen z-40 shadow-lg shadow-black/50 -translate-y-96 rounded-xl bg-white pt-20 pb-5 fixed top-0 left-0 flex flex-col items-start px-5 justify-center gap-4 duration-300 transition-all ${isOpen ? "translate-y-1" : ""}`}>
            <div className="flex flex-col items-start w-full gap-4">
              <div className='flex flex-col w-full gap-4'>
                <h3 onClick={()=>{setIsOpen(prev=>!prev)}} className=' px-2 py-2 text-base font-medium cursor-pointer'>Home</h3>
              <h3 className=' px-2 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 w-full'><button onClick={()=>{router.push("/leaderboard")}} className='w-full text-start'>Leaderboard</button></h3>
                <h3 onClick={()=>{setIsOpen(prev=>!prev)}} className=' px-2 py-2 text-base font-medium cursor-pointer'>Ecosystem</h3>
                <h3 onClick={()=>{setIsOpen(prev=>!prev)}} className=' px-2 py-2 text-base font-medium cursor-pointer'>Community</h3>
                <h3 onClick={()=>{setIsOpen(prev=>!prev)}} className=' px-2 py-2 text-base font-medium cursor-pointer'>Info</h3>
              </div>
            </div>
          </div>
      </div>
      
    </>

  )
}

export default Navbar