"use client"
import heroImage from '../assets/home.png'
import Image from 'next/image'
import { WalletConnectButton } from './buttons/walletConnectButton'

const Hero = () => {

  return (
    <div className='grid grid-cols-2 w-full h-screen '>
        <div className='flex items-center justify-start h-full'>
            <Image src={heroImage} className=' w-[80%] my-auto'/>
        </div>
        <div className='flex items-center justify-center'>
            <div className=' mr-20'>
                <h1 className='font-bold text-5xl mb-3'>Join the collectors</h1>
                <h2 className='font-normal text-jel-gray-4 text-base mb-5 w-[450px]'>Collect badges, customize your profile and earn points. Connect your wallet and begin the Jlema collector profile experience now.</h2>
                {/* <button className='bg-black text-white rounded-xl cursor-pointer py-3 px-6'>Connect wallet</button> */}
                <WalletConnectButton/>
            </div>
        </div>
    </div>
  )
}

export default Hero