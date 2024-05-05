"use client"
import Image from 'next/image'
import logo from '../assets/mainLogo.png'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {

  const path = usePathname();
  const router = useRouter();

  return (
    <div className={`w-full px-8 py-3 flex justify-between fixed bg-white z-40 top-0 left-0 ${(path=="/" | path=="/leaderboard") ? "" : " border-b-[1px] border-jel-gray-3"} `}>
        <div>
          <Image src={logo} className='w-32'/>
        </div>
        <ul className='flex flex-row gap-2 font-semibold items-center'>
            <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Home</li>
            <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Ecosystem</li>
            <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Community</li>
            <li className='px-6 py-2 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Info</li>
            <a href="https://app.komet.me/nfts/Jlema/415" target='_blank'><li className='px-6 py-2 bg-black text-white cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-xl'>Buy</li></a>
            {/* <li onClick={()=>{
              router.push('/profile');
            }} className='px-3 py-3 cursor-pointer hover:bg-jel-gray-2 duration-200 rounded-lg bg-secondary'>
                <svg width="16" height="18" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </li> */}
        </ul>
    </div>
  )
}

export default Navbar