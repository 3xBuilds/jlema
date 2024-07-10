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
import defaultImage from "@/assets/defImg.png"


const ProfileInfo = () => {

    const path = usePathname();


    const {openSettings, setOpenSettings, balances, user} = useGlobalContext();
    const {address} = useAccount();
    const [isClient, setIsClient] = useState(false)
    const [displayArr, setDisplayArr] = useState([])

    const [lockedArr, setLockedArr] = useState([])
    const[showBadgeInfo, setShowBadgeInfo] = useState(null)

    const badges = [
        'Jlema',
        'Legendary',
        'Edition',
        'Homies',
        'Fren',
        'XGang',
        'MiniWhale',
        'Whale',
        'LegendShrimp',
        'LegendDolphin',
        'LegendWhale',
        'XEditions',
        'OneofOne',
        'Snake',
        'Hero',
        'Space',
        'Peace',
        'King',
        'Penguin',
        'Punker',
        'Romeo',
        'Yakkuza',
        'Special',
        'Collab',
        'Unique'
      ];

    async function copyToClip() {
        await navigator.clipboard.writeText(location.href + "/" + user?.username);
        toast.success("Copied to clipboard");
    }
 
    useEffect(() => {
        setIsClient(true);
    }, [])

    const params = useParams();

    async function points(){
      console.log("Fetching for ", user);
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
                points();
            }
        }
    },[user])

    function bringModal(){
        document.getElementById("badges").classList.remove("-translate-y-[120dvh]");
        document.getElementById("badges").classList.add("translate-y-5");
    }

    function removeModal(){
        document.getElementById("badges").classList.remove("translate-y-5");
        document.getElementById("badges").classList.add("-translate-y-[120dvh]");

    }

    function removeDuplicates(badges, displayArr) {
        setLockedArr(badges.filter(badge => !displayArr.includes(badge)));
      }

    function badgeInfoSetter(badge){
        switch (badge) {
            case 'Jlema':
              setShowBadgeInfo({
                name: 'Jlema',
                description: 'Own one Jlema NFT',
                points: 1000,
                image: badge
              });
              break;
            case 'Legendary':
              setShowBadgeInfo({
                name: 'Legendary',
                description: 'Own one Jlema Legendary NFT',
                points: 1000,
                image: badge
              });
              break;
            case 'Edition':
              setShowBadgeInfo({
                name: 'Edition',
                description: 'Own one Jlema Special Editions NFT',
                points: 100,
                image: badge
              });
              break;
            case 'Homies':
              setShowBadgeInfo({
                name: 'Homies',
                description: 'Own one Jlema, Jlema Legendary, and Jlema Special Editions NFT',
                points: 2000,
                image: badge
              });
              break;
            case 'Fren':
              setShowBadgeInfo({
                name: 'Fren',
                description: 'Own 5 Jlema NFT or more',
                points: 1000,
                image: badge
              });
              break;
            case 'XGang':
              setShowBadgeInfo({
                name: 'X Gang',
                description: 'Own 10 Jlema NFT or more',
                points: 2000,
                image: badge
              });
              break;
            case 'MiniWhale':
              setShowBadgeInfo({
                name: 'Mini Whale',
                description: 'Own 20 Jlema NFT or more',
                points: 4000,
                image: badge
              });
              break;
            case 'Whale':
              setShowBadgeInfo({
                name: 'Whale',
                description: 'Own 40 Jlema NFT or more',
                points: 8000,
                image: badge
              });
              break;
            case 'LegendShrimp':
              setShowBadgeInfo({
                name: 'Legend Shrimp',
                description: 'Own 10 Jlema Legendary NFT or more',
                points: 2000,
                image: badge
              });
              break;
            case 'LegendDolphin':
              setShowBadgeInfo({
                name: 'Legend Dolphin',
                description: 'Own 20 Jlema Legendary NFT or more',
                points: 4000,
                image: badge
              });
              break;
            case 'LegendWhale':
              setShowBadgeInfo({
                name: 'Legend Whale',
                description: 'Own 40 Jlema Legendary NFT or more',
                points: 8000,
                image: badge
              });
              break;
            case 'XEditions':
              setShowBadgeInfo({
                name: 'X Editions',
                description: 'Own 10 Jlema Special Editions NFT or more',
                points: 1000,
                image: badge
              });
              break;
            case 'OneofOne':
              setShowBadgeInfo({
                name: '1 of 1',
                description: 'Own a Jlema NFT with 1 of 1 trait',
                points: 5000,
                image: badge
              });
              break;
            case 'Snake':
              setShowBadgeInfo({
                name: 'Snake',
                description: 'Own a Jlema NFT with Snake trait',
                points: 200,
                image: badge
              });
              break;
            case 'Hero':
              setShowBadgeInfo({
                name: 'Hero',
                description: 'Own a Jlema NFT with Superhero trait',
                points: 200,
                image: badge
              });
              break;
            case 'Space':
              setShowBadgeInfo({
                name: 'Space',
                description: 'Own a Jlema NFT with Astronaut trait',
                points: 200,
                image: badge
              });
              break;
            case 'Peace':
              setShowBadgeInfo({
                name: 'Peace',
                description: 'Own a Jlema NFT with Graphic Tee Peace',
                points: 200,
                image: badge
              });
              break;
            case 'King':
              setShowBadgeInfo({
                name: 'King',
                description: 'Own a Jlema NFT with Crown trait',
                points: 200,
                image: badge
              });
              break;
            case 'Penguin':
              setShowBadgeInfo({
                name: 'Penguin',
                description: 'Own a Jlema NFT with Penguin Hat trait',
                points: 200,
                image: badge
              });
              break;
            case 'Punker':
              setShowBadgeInfo({
                name: 'Punker',
                description: 'Own a Jlema NFT with Punk hair trait',
                points: 200,
                image: badge
              });
              break;
            case 'Romeo':
              setShowBadgeInfo({
                name: 'Romeo',
                description: 'Own a Jlema NFT with Rose trait',
                points: 200,
                image: badge
              });
              break;
            case 'Yakkuza':
              setShowBadgeInfo({
                name: 'Yakkuza',
                description: 'Own 5 Old School Tattoos trait from Jlema NFT',
                points: 1000,
                image: badge
              });
              break;
            case 'Special':
              setShowBadgeInfo({
                name: 'Special',
                description: 'Own one Special trait from Jlema Legendary NFT',
                points: 5000,
                image: badge
              });
              break;
            case 'Collab':
              setShowBadgeInfo({
                name: 'Collab',
                description: 'Own one Collaboration trait from Jlema Legendary NFT',
                points: 1000,
                image: badge
              });
              break;
            case 'Unique':
              setShowBadgeInfo({
                name: 'Unique',
                description: 'Own one Uncommon trait from Jlema Legendary NFT',
                points: 800,
                image: badge
              });
              break;
            default:
              setShowBadgeInfo({
                name: '',
                description: 'Unknown badge',
                points: 0,
                image: badge
              });
              break;
          }
    }

    
    useEffect(()=>{
        removeDuplicates(badges, displayArr)
    },[displayArr])

  return (
    < >
        <div id="badges" className="flex sm:items-start sm:justify-start justify-center items-center fixed -translate-y-[120dvh] duration-500 top-[40px] z-50 sm:left-1 max-sm:left-0 max-sm:w-full">
            <div className="rounded-xl px-5 bg-white shadow-xl h-[92vh] sm:w-[20rem] mx-auto w-[100%] max-sm:mx-auto shadow-black/20">
                <div className="flex flex-row border-b-[1px] pb-2 border-black  items-center justify-center gap-5">
                    <h3 className="text-[1.5rem] font-bold">Badges</h3>
                    <div className="w-full">
                        <button onClick={()=>{removeModal()}} className="float-right">
                            <Image className="float-right" src={cross}/>
                        </button>
                    </div>
                </div>
                <div className='grid grid-flow-row grid-rows-11 h-full'>
                    <div className='row-span-6 border-b-2 border-black'>
                        <div className="flex flex-col gap-1 sm:items-start items-center justify-start  my-1">
                            <h2 className='font-semibold'>Collected</h2>
                            {displayArr.length == 0 ? "None" : <div>
                                <div className='flex gap-2 items-center justify-center'>
                                    {displayArr?.slice(0,5).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className=' cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                                    </div>

                                    <div className='flex gap-2 items-center justify-center'>
                                    {displayArr?.slice(5,10).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className=' cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                                    </div>

                                    <div className='flex gap-2 items-center justify-center'>
                                    {displayArr?.slice(10,15).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className=' cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                                    </div>

                                    <div className='flex gap-2 items-center justify-center'>
                                    {displayArr?.slice(15,20).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className=' cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                                    </div>

                                    <div className='flex gap-2 items-center justify-center'>
                                    {displayArr?.slice(20,26).map((item)=>(
                                    <button className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className=' cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                                    </div>

                                    <div className='flex gap-2 items-center justify-center'>
                                            {displayArr?.slice(20,25).map((item)=>(
                                            <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                                <div className=' group'>
                                                
                                                    <div className=' cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                        <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                                    </div>
                                                </div>
                                                {/* <div>
                                                    <h3>{item}</h3>
                                                    </div> */}
                                                
                                                </button>
                                        ))}
                                            </div>
                            </div>}
                        </div>

                        <div className="flex flex-col gap-1 sm:items-start items-center justify-start  my-1">
                            <h2 className='font-semibold'>Locked</h2>
                            <div className='flex gap-2 items-center justify-center'>
                                    {lockedArr?.slice(0,5).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className=' opacity-50 cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                            </div>

                            <div className='flex gap-2 items-center justify-center'>
                                    {lockedArr?.slice(5,10).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className='opacity-50 cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                            </div>

                            <div className='flex gap-2 items-center justify-center'>
                                    {lockedArr?.slice(10,15).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className='opacity-50 cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                            </div>

                            <div className='flex gap-2 items-center justify-center'>
                                    {lockedArr?.slice(15,20).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className='opacity-50 cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                            </div>

                            <div className='flex gap-2 items-center justify-center'>
                                    {lockedArr?.slice(20,26).map((item)=>(
                                    <button onClick={()=>{badgeInfoSetter(item)}} className="flex flex-col justify-center items-center">
                                        <div className=' group'>
                                        
                                            <div className='  opacity-50 cursor-pointer w-12 h-12 text-jel-gray-4 rounded-full shadow-black/10 shadow-xl group-hover:shadow-black/20 duration-200 flex items-center justify-center'>
                                                <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <h3>{item}</h3>
                                            </div> */}
                                        
                                        </button>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className='row-span-5'>
                            {showBadgeInfo &&
                            
                            <div className='flex flex-col items-center justify-center'>
                                <Image className='w-24 h-24 p-4 rounded-full shadow-xl my-3 mx-auto' src={require(`../../assets/badges/${showBadgeInfo.image}.png`)} />
                                <h3 className='font-semibold text-[1.5rem]'>{showBadgeInfo.name}</h3>
                                <h3 className='text-sm text-center h-[2rem] w-full'>{showBadgeInfo.description}</h3>
                                <h5 className='bg-jel-gray-4/30 px-5 py-2 rounded-xl font-bold my-5'>+{showBadgeInfo.points}</h5>

                                </div>}
                    </div>
                </div>
            </div>
        </div>


        <div className='w-[120px] h-[120px] mx-auto border-[1px] border-jel-gray-3 rounded-full overflow-hidden'>
            {user && <Image width={1000} height={1000} src={user?.dp == null ? defaultImage : user.dp} className='w-full h-full object-cover'/>}
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
            {item != "" && i<4 && <button onClick={()=>{bringModal()}} className='relative group'>
                    <div className='absolute opacity-0 duration-300 w-20 group-hover:opacity-100 z-10 left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center justify-center'>
                        <h3 className='text-sm font-medium text-black bg-white px-2 py-1 rounded shadow-black/10 shadow-lg'>{item}</h3>
                        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5L0 0L10 0L5 5Z" fill="white"/>
                        </svg>
                    </div>
                    <div className='w-16 h-16 -ml-2 cursor-pointer  bg-white text-jel-gray-4 rounded-full shadow-jel-badge flex items-center justify-center'>
                        <Image src={require(`../../assets/badges/${item}.png`)} className='w-8'/>
                    </div>
                </button>}
                {i == 4 && <button onClick={()=>{bringModal()}} className='relative group'>
                <div className='absolute opacity-0 duration-300 w-20 group-hover:opacity-100 z-10 left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center justify-center'>
                <h3 className='text-sm font-medium text-black bg-white px-2 py-1 rounded shadow-black/10 shadow-lg'>View More</h3>
                    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L0 0L10 0L5 5Z" fill="white"/>
                    </svg>
                </div>
                <div className='w-16 h-16 -ml-2 cursor-pointer  bg-white text-jel-gray-4 rounded-full shadow-jel-badge flex items-center justify-center'>
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