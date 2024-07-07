"use client"
import { useRef, useState } from 'react'
import Image from 'next/image'
import logo from '../assets/mainLogo.png'
import { usePathname, useRouter } from 'next/navigation'
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { WalletConnectButtonRaffle } from './buttons/walletConnectButtonRaffle'
import gallery from '../assets/icons/gallery.svg'
import stickergen from '../assets/icons/stickergen.svg'
import leaderboard from '../assets/icons/leaderboard.svg'
import member from '../assets/icons/member.svg'
import discord from '../assets/icons/discord.svg'
import twitter from '../assets/icons/twitter.svg'
import insta from '../assets/icons/insta.svg'
import tiktok from '../assets/icons/tiktok.svg'
import zealy from '../assets/icons/zealy.svg'
import arts from '../assets/icons/arts.svg'
import merch from '../assets/icons/merch.svg'
import atlas from '../assets/icons/atlas.svg'
import subber from '../assets/icons/subber.svg'
import about from '../assets/icons/about.svg'
import clean from '../assets/icons/clean.svg'
import faq from '../assets/icons/faq.svg'
import privacy from '../assets/icons/privacy.svg'
import terms from '../assets/icons/terms.svg'


import useOnClickOutside from '@/hooks/useOnClickOutside'


const Navbar = () => {

  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [openEco, setOpenEco] = useState(false);
  const [openCom, setOpenCom] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const ecoDrop = useRef(null);
  const ecoButton = useRef(null);

  const comDrop = useRef(null);
  const comButton = useRef(null);

  
  const infoButton = useRef(null);
  const infoDrop = useRef(null);

  useOnClickOutside(ecoDrop, ecoButton,()=>{setOpenEco(prev=>!prev)});
  useOnClickOutside(comDrop, comButton, ()=>{setOpenCom(prev=>!prev)});
  useOnClickOutside(infoDrop, infoButton, ()=>{setOpenInfo(prev=>!prev)});

  const ecoOptions = [
    {
      label: "Gallery",
      icon: gallery,
      link: "https://jlema.xyz/gallery/"
    },
    {
      label: "Sticker Generator",
      icon: stickergen,
      link: "https://jlema.xyz/generator/"
    },
    {
      label: "Leaderboard",
      icon: leaderboard,
      link: "https://dapp.jlema.xyz/leaderboard"
    },
    {
      label: "Member Portal",
      icon: member,
      link: "https://dapps.jlema.xyz/"
    },
  ]
  const comOptions = [
    {
      label: "Discord",
      icon: discord,
      link: "https://discord.com/invite/mSGVQBcPpA"
    },
    {
      label: "Twitter",
      icon: twitter,
      link: "https://x.com/JlemaNFT"
    },
    {
      label: "Instagram",
      icon: insta,
      link: "https://www.instagram.com/jlemanft"
    },
    {
      label: "Tiktok",
      icon: tiktok,
      link: "https://www.tiktok.com/@jlemanft"
    },
    {
      label: "Zealy",
      icon: zealy,
      link: "https://zealy.io/cw/jlema/questboard"
    },
    {
      label: "Collaborative Arts",
      icon: arts,
      link: "https://jlema.xyz/collaborativeart"
    },
    {
      label: "Merch",
      icon: merch,
      link: "",
      disabled: true
    },
    {
      label: "Atlas",
      icon: atlas,
      link: "https://www.atlas3.io/project/jlema"
    },
    {
      label: "Subber",
      icon: subber,
      link: "https://www.subber.xyz/jlema"
    },
  ]
  const infoOptions = [
    {
      label: "About",
      icon: about,
      link: "https://jlema.xyz/about/"
    },
    {
      label: "CLEAN Token (soon)",
      icon: clean,
      link: "",
      disabled: true
    },
    {
      label: "FAQs (soon)",
      icon: faq,
      link: "",
      disabled: true
    },
    {
      label: "Privacy Policy (soon)",
      icon: privacy,
      link: "",
      disabled: true
    },
    {
      label: "Terms & Conditions (soon)",
      icon: terms,
      link: "",
      disabled: true
    },
  ]

  return (
    <>
      <div className={`w-full px-8 max-md:px-4 py-3 flex justify-between fixed bg-white z-40 top-0 left-0 ${(path=="/" | path=="/leaderboard" | path=="/raffle") ? "" : " border-b-[1px] border-jel-gray-3"} `}>
          {!path.includes("admin") && <div className="flex flex-row items-center justify-center gap-2 z-50">
            <div className="lg:hidden" 
            onClick={()=>setIsOpen(prev=>!prev)}
            >
              { isOpen ? <IoClose className="text-3xl"/> : <IoMenuOutline className="text-3xl"/>}
            </div>
            <Image src={logo} className='w-32 max-lg:w-28'/>
            
          </div>}

          {path.includes("admin") && <div className='grid grid-flow-col grid-cols-2 w-full'>
            <div className='flex gap-4 items-center justify-start'>
              <Image src={logo} className='w-32 max-lg:w-28'/>
              {path.includes("admin") && <h3 className='text-xl ml-2'>Raffle Dashboard</h3> }
            </div>
            <div className='flex justify-end items-center'>
              <WalletConnectButtonRaffle/>
            </div>
          </div>}

          {!path.includes("admin") && <>
            <ul className='flex flex-row gap-2 font-semibold items-center max-md:hidden'>
                <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'><a href='https://jlema.xyz' target='_blank' >Home</a></li>
                <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'><button onClick={()=>{router.push("/leaderboard")}}>Leaderboard</button></li>
                <li ref={ecoButton} onClick={()=>{ setOpenEco(prev=>!prev)}} className='px-6 py-2 relative cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>
                  Ecosystem
                  {openEco && <div ref={ecoDrop} className="bg-white rounded-xl shadow-jel-dropdown p-2 w-64 flex flex-col absolute top-12 right-0">
                  {ecoOptions.map((option)=>(
                    <button className="w-full flex flex-col gap-2 justify-between items-center ">
                    <a href={option?.link} target='_blank' className={`text-black flex flex-row gap-2 items-center justify-start font-medium w-full text-left text-base rounded-lg hover:bg-jel-gray-1 text-nowrap py-3 px-4`}>
                      <Image src={option.icon} className='w-5'/>
                      <h3 >{option?.label}</h3>
                    </a>
                  </button>))}
                </div>}
                </li>
                <li ref={comButton} onClick={()=>{setOpenCom(prev=>!prev)}} className='px-6 py-2 relative cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>
                  Community
                  {openCom && <div ref={comDrop} className="bg-white rounded-xl shadow-jel-dropdown p-2 w-64 flex flex-col absolute top-12 right-0">
                  {comOptions.map((option)=>(
                    <button className="w-full flex flex-col gap-2 justify-between items-center">
                    <a href={option?.link} target='_blank' className={`text-black flex flex-row gap-2 items-center ${option?.disabled && "opacity-50"} justify-start font-medium w-full text-left text-base rounded-lg hover:bg-jel-gray-1 text-nowrap py-3 px-4`}>
                      <Image src={option.icon} className='w-5'/>
                      <h3 >{option?.label}</h3>
                    </a>
                  </button>))}
                </div>}
                
                </li>
                <li ref={infoButton} onClick={()=>{setOpenInfo(prev=>!prev)}} className='px-6 py-2 relative cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>
                  Info
                  {openInfo && <div ref={infoDrop} className="bg-white rounded-xl shadow-jel-dropdown p-2 w-72 flex flex-col absolute top-12 right-0">
                  {infoOptions.map((option)=>(
                    <button className="w-full flex flex-col gap-2 justify-between items-center">
                    <a href={option?.link} target='_blank' className={`text-black flex flex-row gap-2 items-center ${option?.disabled && "opacity-50"} justify-start font-medium w-full text-left text-base rounded-lg hover:bg-jel-gray-1 text-nowrap py-3 px-4`}>
                      <Image src={option.icon} className='w-5'/>
                      <h3 >{option?.label}</h3>
                    </a>
                  </button>))}
                </div>}
                </li>
                <a href="https://app.komet.me/nfts/Jlema/415" target='_blank'><li className='px-6 py-2 bg-black text-white cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Buy</li></a>
            </ul>
            <h3 className=' py-2 text-sm font-semibold md:hidden relative z-50'>Buy now</h3>
            {/* Opens on clicking hamburger and shows only for phones */}
            <div className={`w-screen z-40 shadow-lg shadow-black/50 -translate-y-96 rounded-xl bg-white pt-20 pb-5 fixed top-0 left-0 flex flex-col items-start px-5 justify-center gap-4 duration-300 transition-all ${isOpen ? "translate-y-1" : ""}`}>
              <div className="flex flex-col items-start w-full gap-4">
                <div className='flex flex-col w-full gap-4'>
                  <h3 onClick={()=>{setIsOpen(prev=>!prev)}} className=' px-2 py-2 text-base font-medium cursor-pointer'><a href='https://jlema.xyz' target='_blank' >Home</a></h3>
                <h3 className=' px-2 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 w-full'><button onClick={()=>{router.push("/leaderboard")}} className='w-full text-start'>Leaderboard</button></h3>
                  <h3 onClick={()=>{setIsOpen(prev=>!prev)}} className=' px-2 py-2 text-base font-medium cursor-pointer'>Ecosystem</h3>
                  <h3 onClick={()=>{setIsOpen(prev=>!prev)}} className=' px-2 py-2 text-base font-medium cursor-pointer'>Community</h3>
                  <h3 onClick={()=>{setIsOpen(prev=>!prev)}} className=' px-2 py-2 text-base font-medium cursor-pointer'>Info</h3>
                </div>
              </div>
            </div>
          </>}
      </div>
      
    </>

  )
}

export default Navbar