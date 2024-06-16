"use client"
import heroImage from '../assets/home.png'
import Image from 'next/image'
import { WalletConnectButton } from './buttons/walletConnectButton'

const Hero = () => {

  return (
    <div className='grid grid-cols-2 w-full h-screen max-md:flex max-md:flex-col max-md:mt-32'>
        <div className='flex items-center justify-start h-full max-md:hidden'>
            <Image src={heroImage} className=' w-[80%] my-auto'/>
        </div>
        <div className='flex items-center justify-center max-md:justify-start max-md:px-6'>
            <div className=' mr-20 max-md:m-0'>
                <h1 className='font-bold text-5xl max-lg:text-3xl max-md:text-5xl mb-3 max-sm:text-4xl'>Join the <br className="md:hidden"/> collectors</h1>
                <h2 className='font-normal text-jel-gray-4 max-lg:text-sm max-lg:w-[350px] max-md:w-full max-md:px-0 text-base mb-5 w-[450px]'>Collect badges, customize your profile and earn points. Connect your wallet and begin the Jlema collector profile experience now.</h2>
                {/* <button className='bg-black text-white rounded-xl cursor-pointer py-3 px-6'>Connect wallet</button> */}
                <WalletConnectButton/>
            </div>
        </div>
        <div className='flex items-center justify-center w-screen md:hidden'>
            <Image src={heroImage} className='w-full my-auto object-top'/>
        </div>
    </div>
  )
}

export default Hero