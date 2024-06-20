import { FaCross } from "react-icons/fa";
import Image from "next/image";
import cross from '@/assets/icons/cross.svg'


export default function BadgesModal(){
    
    return(
        <div className="bg-black/20 flex items-center justify-center fixed top-0 left-0 w-screen h-screen">
            <div className="rounded-xl p-6 bg-white shadow-xl w-[32rem] shadow-black/20">
                <div className="flex flex-row  items-center justify-center gap-10">
                    <h3 className="text-[1.5rem] font-bold">Badges</h3>
                    <button className="w-full">
                        <Image className="float-right" src={cross}/>
                    </button>
                </div>
            </div>
        </div>
    )
}