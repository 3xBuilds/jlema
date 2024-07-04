"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import cross from '@/assets/icons/cross.svg'
import imgIcon from '@/assets/icons/image.svg'
import { useGlobalContext } from '@/context/MainContext'
import { useAccount } from 'wagmi'
import NFTFetcher from '../fetcher/nftFetcher'
import { contractAdds } from '@/utils/contractAdds'
import jlemaFetcher from '@/utils/abis/jlemaFetcher'
import { ethers } from 'ethers'
import axios from 'axios'
import nftData from "@/utils/mapNfts.json"
import { toast } from 'react-toastify'

const extractUsername = (input) => {
  if (!input) return '';
  // Remove URL prefix if present
  const urlRegex = /https?:\/\/(www\.)?(x\.com|twitter\.com)\//i;
  if (urlRegex.test(input)) {
    input = input.replace(urlRegex, '');
  }
  // Remove '@' prefix if present
  if (input.startsWith('@')) {
    input = input.substring(1);
  }
  return input;
};

const SettingsModal = () => {

  const [settingType, setSettingType] = useState(0);
  const {setOpenSettings, user, setUser, balances, selected} = useGlobalContext();
  const {address} = useAccount();

  const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedHighlight, setSelectedHighlight] = useState([]);

  const [showNftSelectModal, setShowNftSelectModal] = useState(false);
  const [showHighlighSelectModal, setShowHighlighSelectModal] = useState(false);
  const [username, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [error, setError] = useState("");

  const [highlights, setHighlights] = useState([0,0,0]);
  const [highNumber, setHighNumber] = useState();

  const getUser = async () => {
    try{
      const res = await axios.get(`/api/user/${address}`);
      console.log("user", res.data);
      if(res.data.user==null){
        setOpenSettings(true);
      }
      setUser(res.data.user);
    }
    catch(err){
      console.log("Error", err);
    }
  }

  useEffect(()=>{
    if(address && (user==null)){
      setSettingType(0);
      setOpenSettings(true);
    }
    if(address && (user!=null)){
      setUsername(user.username);
      setTwitter(user.twitter);
      setSelectedImage(user.dp);
      setHighlights(user.highlights);
      setSettingType(0);
    }
  }, [address, user])

  const updateHighlights = async (highlights) => {
    try{
      const res = await axios.patch(`/api/user/${user?.username}/highlight`, {
        highlights: highlights
      });
      console.log("highlights updated successfully", res.data);
      toast.success("Highlights updated successfully");
      setOpenSettings(false);
      getUser();
    }
    catch(err){
      console.log("Error updating highlights", err);
    }
  }

  const createUser = async () => {
    try{
      const res = await axios.post("/api/user/create", {
        wallet: address,
        username: username,
        twitter: extractUsername(twitter),
        dp: selectedImage
      });
      console.log("user created successfully", res.data);
      setOpenSettings(false);
      getUser();
    }
    catch(err){
      console.log("Error creating user", err);
    }
  }

  const updateUserDetails = async () => {
    try{
      const res = await axios.patch(`/api/user/${user?.username}`, {
        username: username,
        twitter: extractUsername(twitter),
        dp: selectedImage
      });
      console.log("user updated successfully", res.data);
      setOpenSettings(false);
      getUser();
    }
    catch(err){
      console.log("Error updating user", err);
    }
  }

  useEffect(()=>{
    console.log("highlights::::", highlights);
  }, [highlights, user])

  useEffect(()=>{
      setError("");
  },[username, twitter, selectedImage])

  if(balances[0] <= 0) return (
    <>
      <div className='w-screen h-screen top-0 left-0 fixed z-40 flex flex-col'>
        <div onClick={()=>{setOpenSettings(false)}} className='fixed w-screen h-screen bg-black/50'></div>
        <div className='fixed w-[30%] bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='w-full flex flex-row items-center justify-center p-6 border-b-[1px] border-jel-gray-3'>
            <h2 className='text-black font-bold text-xl text-center'>You dont have any NFTs</h2>
          </div>
            <div className='p-6 flex items-center justify-center'>
                <a href="https://app.komet.me/nfts/Jlema/415"><button className='bg-black text-white font-semibold rounded-xl cursor-pointer py-3 px-12'>Buy NFTs</button></a>
            </div>
        </div>
      </div>
    </>
  )

  else
  return (
    <>
    {showNftSelectModal && <SelectNFT setSelectedImage={setSelectedImage} setShowNftSelectModal={setShowNftSelectModal}/>}
    {showHighlighSelectModal && <SelectHighLight highlights={highlights} setHighlights={setHighlights} highNumber={highNumber} setShowHighlighSelectModal={setShowHighlighSelectModal}/>}
        <div className='w-screen h-screen top-0 left-0 fixed z-40 flex flex-col'>
            <div onClick={()=>{setOpenSettings(false)}} className='fixed w-screen h-screen bg-black/50'></div>
            <div className='fixed sm:w-[50%] w-[95%] h-[98%] bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='w-full flex flex-row items-center justify-between p-6 border-b-[1px] border-jel-gray-3'>
                  <h2 className='text-black font-bold text-xl'>Settings</h2>
                  <Image onClick={()=>{(address && user?.username) ? setOpenSettings(false) : setError("Set Profile Details First")}} src={cross}/>
                </div>
                <div className='p-6'>
                  <div className=" h-12 hidden rounded-xl sm:flex flex-row gap-2 p-1">
                    <button onClick={()=>{setSettingType(0)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==0 ? " bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">Profile</h3>
                    </button>
                    <button onClick={()=>{setSettingType(1)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==1 ? "bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">NFT Highlights</h3>
                    </button>
                    <button onClick={()=>{setSettingType(2)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==2 ? "bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">Badge Highlights</h3>
                    </button>
                  </div>

                <div className="p-4 w-full sm:hidden overflow-hidden noscr">
                  <div className=" h-12 rounded-xl w-[430px] flex flex-row gap-2 p-1">
                    <button onClick={()=>{setSettingType(0)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==0 ? " bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">Profile</h3>
                    </button>
                    <button onClick={()=>{setSettingType(1)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==1 ? "bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">NFT Highlights</h3>
                    </button>
                    <button onClick={()=>{setSettingType(2)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${settingType ==2 ? "bg-jel-gray-1 font-semibold text-black" : " font-medium text-jel-gray-4" }`}>
                      <h3 className="">Badge Highlights</h3>
                    </button>
                  </div>
                </div>

                  {settingType == 0 && 
                  <div className='pt-6'>
                    <h3 className='text-base font-normal'>Profile Picture</h3>
                    <div onClick={()=>{setShowNftSelectModal(true)}} className='mt-2 group cursor-pointer overflow-hidden border-jel-gray-3 border-[1px] border-dashed w-48 h-48 rounded-xl flex items-center justify-center '>
                      {selectedImage ?
                        <div className='overflow-hidden p-2 relative'>
                          <Image src={selectedImage} width={500} height={500} className=' rounded-lg overflow-hidden object-cover w-full h-full group-hover:scale-105 duration-300'/>
                        </div> : <Image src={imgIcon} className='group-hover:scale-125 duration-300'/>}
                    </div>

                    <h3 className='text-base font-normal mt-4'>Name</h3>
                    <input value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border-jel-gray-3 px-4 outline-black border-[1px] rounded-xl w-full h-12 mt-2 flex items-center justify-center '/>
                    
                    <h3 className='text-base font-normal mt-4'>Twitter/X</h3>
                    <input value={twitter} onChange={(e)=>{setTwitter(e.target.value)}} className='border-jel-gray-3 px-4 outline-black border-[1px] rounded-xl w-full h-12 mt-2 flex items-center justify-center '/>
                        
                    <h3 className='text-sm font-normal mt-4 text-red-500'>{error}</h3>
                  </div>
                  }

                  {settingType == 1 && highlights &&
                    <div className='pt-6 flex flex-col w-full gap-2'>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>{highlights[0]==0 ? "Highlight 1" : `Jlema #${highlights[0]}`}</h3>
                        <button onClick={()=>{setShowHighlighSelectModal(true);setHighNumber(0);}} className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>{highlights[1]==0 ? "Highlight 2" : `Jlema #${highlights[1]}`}</h3>
                        <button onClick={()=>{setShowHighlighSelectModal(true);setHighNumber(1);}} className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>{highlights[2]==0 ? "Highlight 3" : `Jlema #${highlights[2]}`}</h3>
                        <button onClick={()=>{setShowHighlighSelectModal(true);setHighNumber(2);}} className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      
                    </div>
                  }

                  {settingType == 2 && 
                    <div className='pt-6 flex flex-col w-full gap-2'>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 1</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 2</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 3</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-base font-normal'>Highlight 4</h3>
                        <button className='bg-jel-gray-1 font-semibold hover:bg-jel-gray-2 text-black rounded-xl cursor-pointer py-3 px-6'>Select</button>
                      </div>
                    </div>
                  }

                  <div className='pt-4 flex flex-row gap-4'>
                    <button onClick={()=>{
                      settingType==0 ? (user? updateUserDetails() : createUser()) : settingType==1? updateHighlights(highlights) : null;
                    }} className='bg-black text-white font-semibold rounded-xl cursor-pointer py-3 px-6'>Save</button>
                    <button onClick={()=>{
                      (address && user?.username) ? setOpenSettings(false) : setError("Set Profile Details First");
                    }} className='bg-jel-gray-1 hover:bg-jel-gray-2 font-semibold text-black rounded-xl cursor-pointer py-3 px-6'>Cancel</button>
                  </div>
                </div> 
            </div>           
        </div>
    </>
  )
}

const SelectNFT = ({setSelectedImage, setShowNftSelectModal}) => {

    const [displayNFT, setDisplayNFT] = useState([]);
    const {address} = useAccount();

    async function checkPointsFromContract(tokenId){
      return await nftData[tokenId];
  }

    async function dataProvider(tokenId){
      try{
          var img = "https://metadata.jlema.xyz/api/jlema/image/" + tokenId;
          const data = await checkPointsFromContract(tokenId);
          setDisplayNFT(oldArray => [...oldArray, {img, tokenId, data}]);
      }
      catch(err){
          console.log(err);
          dataProvider(uri, tokenId);
          if(gatewayNum < 3){
              gatewayNum++;
          }
          else{
              gatewayNum = 0;
          }
      }
  }

    async function jlemaFetcherSetup(){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      try {
        const contract = new ethers.Contract(contractAdds.JlemaFetcher, jlemaFetcher, signer);
        return contract;
      }
      catch(err){
          console.log(err);
      }
  }

  async function fetchJlema(multiplier){
      try{
          const contract = await jlemaFetcherSetup();
          const res = await contract.tokenOfOwnerJlema(multiplier, address);
          res.map((item)=>{
              if(item != 0){
                  console.log(Number(item));
                  dataProvider(Number(item));
              }
          })
      }
      catch(err){

      }
  }

    useEffect(()=>{
      setDisplayNFT([]);
      fetchJlema(0);
      fetchJlema(1);
      fetchJlema(2);
      fetchJlema(3);
      fetchJlema(4);
    }, [])

    return(
      <>
        <div className='w-screen h-screen top-0 left-0 fixed z-50 flex flex-col'>
            <div onClick={()=>{setShowNftSelectModal(false)}} className='fixed w-screen h-screen bg-black/70'></div>
            <div className='fixed w-[70%] bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'>
                <div className='w-full flex flex-row items-center justify-between p-6 border-b-[1px] border-jel-gray-3'>
                  <h2 className='text-black font-bold text-xl'>Select NFT</h2>
                  <Image onClick={()=>{setShowNftSelectModal(false)}} src={cross}/>
                </div>
                <div className=" p-4 grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 items-start justify-between gap-4">
                {displayNFT.map((nft, index) => (
                      <div onClick={()=>{setSelectedImage(nft.img); setShowNftSelectModal(false)}} key={index} className="rounded-xl hover:shadow-jel-nft duration-200 cursor-pointer border-[1px] border-jel-gray-3 overflow-hidden flex flex-col">
                        <div className="h-40 w-full">
                          <Image alt="" width={1920} height={1080} src={nft.img} className="object-cover w-full h-full"/>
                        </div>
                    </div>
                  ))}
            </div>
            </div>           
        </div>
    </>
    )
}

const SelectHighLight = ({highlights, setHighlights, highNumber, setShowHighlighSelectModal}) => {

  const [displayNFT, setDisplayNFT] = useState([]);
  const {address} = useAccount();

  async function dataProvider(tokenId){
    try{
        var img = "https://metadata.jlema.xyz/api/jlema/image/" + tokenId;
        console.log(img, tokenId)
        setDisplayNFT(oldArray => [...oldArray, {img, tokenId}]);
    }
    catch(err){
        console.log(err);
        dataProvider(uri, tokenId);
        if(gatewayNum < 3){
            gatewayNum++;
        }
        else{
            gatewayNum = 0;
        }
    }
}

  async function jlemaFetcherSetup(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const contract = new ethers.Contract(contractAdds.JlemaFetcher, jlemaFetcher, signer);
      return contract;
    }
    catch(err){
        console.log(err);
    }
}

async function fetchJlema(multiplier){
    try{
        const contract = await jlemaFetcherSetup();
        const res = await contract.tokenOfOwnerJlema(multiplier, address);
        res.map((item)=>{
            if(item != 0){
                console.log(Number(item));
                dataProvider(Number(item));
            }
        })
    }
    catch(err){

    }
}

  useEffect(()=>{
    setDisplayNFT([]);
    fetchJlema(0);
    fetchJlema(1);
    fetchJlema(2);
    fetchJlema(3);
    fetchJlema(4);
  }, [])

  return(
    <>
      <div className='w-screen h-screen top-0 left-0 fixed z-50 flex flex-col'>
          <div onClick={()=>{setShowHighlighSelectModal(false)}} className='fixed w-screen h-screen bg-black/70'></div>
          <div className='fixed w-[70%] bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'>
              <div className='w-full flex flex-row items-center justify-between p-6 border-b-[1px] border-jel-gray-3'>
                <h2 className='text-black font-bold text-xl'>Select NFT</h2>
                <Image onClick={()=>{setShowHighlighSelectModal(false)}} src={cross}/>
              </div>
              <div className=" p-4 grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 items-start justify-between gap-4">
              {displayNFT.map((nft, index) => (
                    <div onClick={()=>{
                      setHighlights((prev)=>{
                      let newHighlights = [...prev];
                      newHighlights[highNumber] = nft.tokenId;
                      return newHighlights
                    }); setShowHighlighSelectModal(false)}} key={index} className="rounded-xl hover:shadow-jel-nft duration-200 cursor-pointer border-[1px] border-jel-gray-3 overflow-hidden flex flex-col">
                      <div className="h-40 w-full">
                        <Image alt="" width={1920} height={1080} src={nft.img} className="object-cover w-full h-full"/>
                      </div>
                  </div>
                ))}
          </div>
          </div>           
      </div>
  </>
  )
}
export default SettingsModal