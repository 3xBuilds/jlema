import React from 'react'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
        <div className="flex flex-row max-md:flex-col max-md:items-start max-md:justify-start max-md:px-0 items-center justify-between px-10 border-t-[1px] border-jel-gray-3 py-5 mt-10">
        <h3 className="text-sm text-black">©2024 Jlema. All Rights Reserved.</h3>
        <div className="flex flex-row items-center gap-8 max-md:mt-2">
          <a href="https://x.com/JlemaNFT" target='_blank'><FaSquareXTwitter className=" text-xl"/></a>
          <a href="https://discord.gg/Kp9WdpUh3a" target='_blank'><FaDiscord className=" text-xl"/></a>
        </div>
      </div> 
    </div>
  )
}

export default Footer