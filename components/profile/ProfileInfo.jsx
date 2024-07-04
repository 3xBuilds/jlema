"use client"
import nft1 from '../../assets/nft1.png'
import image from '../../assets/icons/imagebadge.png'
import tweet from '../../assets/icons/tweet.png'
import share from '../../assets/icons/share2.svg'
import settings from '../../assets/icons/settings.svg'
import power from '../../assets/icons/power.svg'
import Image from 'next/image'
import { WalletConnectButton } from '../buttons/walletConnectButton'
import TokenFetcher from '../fetcher/tokenFetcher'
import { useAccount } from 'wagmi'
// import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/MainContext'
import { useParams } from 'next/navigation'
import {toast} from 'react-toastify'
import pointsFetcher from '@/hooks/pointsFetcher'
import { FaCross } from 'react-icons/fa'
import BadgesModal from './BadgesModal'
import cross from '@/assets/icons/cross.svg'
import { usePathname, useRouter } from 'next/navigation'
import defImg from "@/assets/defImg.png"


const ProfileInfo = () => {

    const path = usePathname();


    const {openSettings, setOpenSettings, balances, user} = useGlobalContext();
    const {address} = useAccount();
    const [isClient, setIsClient] = useState(false)
    const [displayArr, setDisplayArr] = useState([])
    const [expandBadges, setExpandBadges] = useState(false)

    async function copyToClip() {
        await navigator.clipboard.writeText(location.href + "/" + user?.username);
        toast.success("Copied to clipboard");
    }
 
    useEffect(() => {
        setIsClient(true);
    }, [])

    const params = useParams();

    async function points(){
        
            const response = await pointsFetcher(user);
            console.log(response);

            
                    setDisplayArr(response) ;  
                
            }
    

    useEffect(()=>{
        if(user != null){
            setDisplayArr([])

            if(user?.wallet == address && path.substring(1, path.length) == "profile"){
                points();
            }
            else{
    
                setDisplayArr(user?.badges)
            }
        }
    },[user])

    function bringModal(){
        document.getElementById("badges").classList.remove("-translate-y-[30rem]");
        document.getElementById("badges").classList.add("translate-y-0");
    }

    function removeModal(){
        document.getElementById("badges").classList.remove("translate-y-0");
        document.getElementById("badges").classList.add("-translate-y-[30rem]");

    }
    

  return (
    < >
        <div id="badges" className="flex items-start justify-start fixed -translate-y-[30rem] duration-500 top-[40px] z-50 sm:left-1 max-sm:left-0">
            <div className="rounded-xl p-6 bg-white shadow-xl sm:w-[20rem] w-[90%] max-sm:mx-auto shadow-black/20">
                <div className="flex flex-row border-b-[1px] pb-2 border-black  items-center justify-center gap-10">
                    <h3 className="text-[1.5rem] font-bold">Badges</h3>
                    <div className="w-full">
                        <button onClick={()=>{removeModal()}} className="float-right">
                            <Image className="float-right" src={cross}/>
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap mt-4 items-center justify-center">
                    {displayArr?.map((item)=>(
                        <div className="flex flex-col justify-center items-center">
                            <div className=' group'>
                                <div className='absolute opacity-0 duration-300 w-20 group-hover:opacity-100 z-50 left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center justify-center'>
                                    <h3 className='text-sm font-medium text-black bg-white px-2 py-1 rounded shadow-black/10 shadow-lg'>{item}</h3>
                                    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 5L0 0L10 0L5 5Z" fill="white"/>
                                    </svg>
                                </div>
                                <div className='w-16 h-16  cursor-pointer bg-white text-jel-gray-4 rounded-full shadow-jel-badge flex items-center justify-center'>
                                    <Image src={require(`../../assets/badges/${item}.png`)} className='w-9'/>
                                </div>
                            </div>
                            <div>
                                <h3>{item}</h3>
                                </div>
                            
                            </div>
                    ))}
                </div>
            </div>
        </div>


        <div className='w-[120px] h-[120px] mx-auto border-[1px] border-jel-gray-3 rounded-full overflow-hidden'>
            {user && <Image width={1000} height={1000} src={user?.dp == null ? defImg : user.dp} className='w-full h-full object-cover'/>}
        </div>
        <div>
            <h2 className=' font-medium text-2xl text-center mt-5'>{user?.username || "---"}</h2>
            {isClient && <h3 className=' font-normal text-sm text-jel-gray-4 text-center mt-2'>{user?.wallet?.substring(0,5)}...{user?.wallet?.substring(user?.wallet?.length-4, user?.wallet?.length)}</h3>}
        </div>
        <div className='mt-5 border-[1px] border-jel-gray-3 rounded-lg w-full grid grid-cols-3 divide-x-[1px] divide-jel-gray-3'>
            <div className='flex flex-col items-center justify-center gap-1 py-4'>
                <h2 className=' font-normal text-xs text-jel-gray-4 text-center'>Rank</h2>
                <h3 className=' font-medium text-sm text-black text-center'>#{user?.rank}</h3>
            </div>
            <div className='flex flex-col items-center justify-center gap-1 py-4'>
                <h2 className=' font-normal text-xs text-jel-gray-4 text-center'>Points</h2>
                <h3 className=' font-medium text-sm text-black text-center'>{user?.points}</h3>
            </div>
            <div className='flex flex-col items-center justify-center gap-1 py-4'>
                <h2 className=' font-normal text-xs text-jel-gray-4 text-center'>Badges</h2>
                <h3 className=' font-medium text-sm text-black text-center'>{user?.badges.length}</h3>
            </div>
        </div>

        <div className='mt-6 flex flex-row w-full justify-center'>

        {displayArr?.map((item, i)=>(
            <div>
            {item != "" && i<4 && <div className='relative group'>
                    <div className='absolute opacity-0 duration-300 w-20 group-hover:opacity-100 z-50 left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center justify-center'>
                        <h3 className='text-sm font-medium text-black bg-white px-2 py-1 rounded shadow-black/10 shadow-lg'>{item}</h3>
                        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5L0 0L10 0L5 5Z" fill="white"/>
                        </svg>
                    </div>
                    <div className='w-16 h-16 -ml-2 cursor-pointer bg-white text-jel-gray-4 rounded-full shadow-jel-badge flex items-center justify-center'>
                        <Image src={require(`../../assets/badges/${item}.png`)} className='w-7'/>
                    </div>
                </div>}
                {i == 4 && <button onClick={()=>{bringModal()}} className='relative group'>
                <div className='absolute opacity-0 duration-300 w-24 group-hover:opacity-100 z-50 left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center justify-center'>
                    <h3 className='text-sm font-medium text-black bg-white px-2 py-1 rounded shadow-black/10 shadow-lg'>View More</h3>
                    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L0 0L10 0L5 5Z" fill="white"/>
                    </svg>
                </div>
                <div className='w-16 h-16 -ml-2 cursor-pointer bg-white text-jel-gray-4 rounded-full shadow-jel-badge flex items-center justify-center'>
                    <h3 className='font-medium text-base'>+{displayArr.length - 4}</h3>
                </div>
            </button> }
            </div>
))}

        </div>


        <div className='w-full my-8 flex flex-col gap-3'>
            <h3 className='text-sm font-medium text-black'>Collected</h3>
            <div className='flex flex-row justify-between relative'>
                <p className='text-sm font-normal text-jel-gray-4'>{"Jlema"}</p>
                <p className='text-sm font-normal text-black'>{balances[0] || "0"}</p>
            </div>
            <div className='flex flex-row justify-between relative'>
                <p className='text-sm font-normal text-jel-gray-4'>{"Jlema Legendary"}</p>
                <p className='text-sm font-normal text-black'>{balances[1] || "0"}</p>
            </div>
            <div className='flex flex-row justify-between relative'>
                <p className='text-sm font-normal text-jel-gray-4'>{"Special Editions"}</p>
                <p className='text-sm font-normal text-black'>{balances[2] || "0"}</p>
            </div>
            <div className='flex flex-row justify-between relative'>
                <p className='text-sm font-normal text-jel-gray-4'>{"CLEAN Token"}</p>
                {user && <TokenFetcher wallet={user?.wallet}/>}
            </div>
        </div>
        
        <div className='grid grid-cols-2 w-full gap-4'>
            <a href={"https://x.com/"+user?.twitter} target="_blank"><button className='flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-2 px-4 items-center justify-center rounded-lg text-black'>
                <Image src={tweet} className='w-5'/>
                <h3 className=' text-base font-semibold text-black'>Visit</h3>
            </button></a>
            <button onClick={copyToClip} className='flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-2 px-4 items-center justify-center rounded-lg text-black'>
                <Image src={share} className='w-5'/>
                <h3 className=' text-base font-semibold text-black'>Share</h3>
            </button>
        </div>

        <div className='grid grid-cols-1 w-full gap-4 mt-5'>
            {!params.username && <button onClick={()=>{setOpenSettings(true)}} className='flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-2 px-4 items-center justify-center rounded-lg text-black'>
                <Image src={settings} className='w-5'/>
                <h3 className=' text-base font-semibold text-black'>Settings</h3>
            </button>}
            {!params.username &&<WalletConnectButton/>}
            {/* <button className='flex flex-row gap-2 bg-jel-gray-1 hover:bg-jel-gray-2 duration-150 w-full py-2 px-4 items-center justify-center rounded-lg text-black'>
                <Image src={power} className='w-5'/>
                <h3 className=' text-base font-semibold text-black'>Disconnect</h3>
            </button> */}
        </div>


    </>
  )
}


export default ProfileInfo