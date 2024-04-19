import Hero from "@/components/Hero";
import ProfileInfo from "@/components/profile/ProfileInfo";
import arrowLeft from "@/assets/icons/arrowl.svg";
import arrowRight from "@/assets/icons/arrowr.svg";
import nft1 from '../assets/nft1.png'
import nft2 from '../assets/nft2.png'
import nft3 from '../assets/nft3.png'
import nft4 from '../assets/nft4.png'
import nft5 from '../assets/nft5.png'
import nft6 from '../assets/nft6.png'
import Image from "next/image";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col noscr">
      {/* <Hero/>*/} 
      <DefaultScreen/>
    </main>
  );
}

const DefaultScreen = () => {

  const nfts = [
    nft1,
    nft2,
    nft3,
    nft4,
    nft5,
    nft6,
    nft1,
    nft2,
    nft3,
    nft4,
    nft5,
    nft6,
    nft1,
    nft6,
    nft2,
    nft3,
    nft1,
    nft5,
    nft4,
    nft1,
    nft2,
    nft6,
    nft3,
    nft4,
    nft5,
    nft1,
  ]

  return(
    <>
    <div className="w-full h-[1px] bg-jel-gray-3 mt-14 relative z-50"></div>
      <div className="flex flex-row">
        <ProfileInfo/>
        <div className="pl-[328px] w-screen">
          <div className="px-5 py-4 flex flex-col gap-4 overflow-scroll w-full noscr">

            <div className="border-[1px] overflow-hidden border-jel-gray-3 rounded-xl w-full h-80 relative flex items-center justify-center">
              <button className="absolute top-1/2 -translate-y-1/2 left-5">
                <Image src={arrowLeft} className=""/>
              </button>
              <button className="absolute top-1/2 -translate-y-1/2 right-5">
                <Image src={arrowRight} className=""/>
              </button>

              <div className=" grid grid-cols-2 w-[60%]">
                <div className="h-80">
                  <Image src={nft1} className='w-full h-full object-cover'/>
                </div>
                <div className="h-full flex flex-col items-start justify-center">
                  <h3 className="font-medium text-jel-gray-4 text-lg">Jelma</h3>
                  <h3 className="font-semibold text-black text-5xl">#2</h3>
                  <div className="mt-4 flex flex-row gap-2 flex-wrap">
                    <h3 className="text-xs font-normal text-jel-gray-4">Skin <span className="font-medium text-black">Old School Tattoos</span></h3>
                    <h3 className="text-xs font-normal text-jel-gray-4">Cloth <span className="font-medium text-black">Topless</span></h3>
                    <h3 className="text-xs font-normal text-jel-gray-4">Mouth <span className="font-medium text-black">Short Light Stubble Beard</span></h3>
                    <h3 className="text-xs font-normal text-jel-gray-4">Head <span className="font-medium text-black">Pepe Bucket Hat</span></h3>
                    <h3 className="text-xs font-normal text-jel-gray-4">Eyes <span className="font-medium text-black">Rectangular Sunglasses</span></h3>
                  </div>
                </div>
              </div>

            </div>

            <div className="w-full flex flex-row justify-between items-center">
              <div className=" bg-jel-gray-1 h-12 rounded-xl flex flex-row gap-2 p-1">
                <div className="bg-white text-base rounded-lg font-semibold text-black px-4 py-2 shadow-jel-card">
                  <h3 className="">Jelma</h3>
                </div>
                <div className=" rounded-lg text-base text-jel-gray-4 font-medium px-4 py-2">
                  <h3 className="">Jelma Legendary</h3>
                </div>
                <div className=" rounded-lg text-base text-jel-gray-4 font-medium px-4 py-2">
                  <h3 className="">Special Editions</h3>
                </div>
              </div>
              <div className="bg-white border-[1px] group group-focus:border-black h-12 border-jel-gray-3 rounded-xl flex flex-row gap-2 px-5 justify-between items-center">
                <select className=" outline-none focus:outline-none">
                  <option value="id_acc" >ID: Ascending</option>
                  <option value="id_dec" >ID: Descending</option>
                  <option value="skin_acc" >Skin: Ascending</option>
                  <option value="skin_dec" >Skin: Descending</option>
                </select>
              </div>
            </div>

            <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 items-start justify-between gap-4">
                {nfts.map((nft, index) => (
                  <div key={index} className="rounded-xl border-[1px] border-jel-gray-3 overflow-hidden flex flex-col">
                    <div className="h-40 w-full">
                      <Image src={nft} className="object-cover w-full h-full"/>
                    </div>
                    <div className="bg-white text-center py-2">
                      <h3 className="text-sm font-normal text-black">{"Jelema #"}{index}</h3>
                    </div>
                </div>
              ))}
            </div>
          </div>
      </div>
      </div>
    </>
  )
}
