import Hero from "@/components/Hero";
import ProfileInfo from "@/components/profile/ProfileInfo";
import arrowLeft from "@/assets/icons/arrowl.svg";
import arrowRight from "@/assets/icons/arrowr.svg";
import nft1 from '../assets/nft1.png'
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col noscr">
      {/* <Hero/> */}
      <DefaultScreen/>
    </main>
  );
}

const DefaultScreen = () => {
  return(
    <>
    <div className="w-full h-[1px] bg-jel-gray-3 mt-14 relative z-50"></div>
      <div className="flex flex-row">
        <ProfileInfo/>
        <div className="pl-[328px] w-screen">
          <div className="px-5 py-4 flex flex-col gap-10 h-screen overflow-scroll w-full noscr">
            {/* hheh */}

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
          </div>
      </div>
      </div>
    </>
  )
}
