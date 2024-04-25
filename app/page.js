"use client"

import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  
  const {isConnected} = useAccount();
  const router = useRouter();

  useEffect(()=>{
    if(isConnected){
      router.push("/profile/user");
    }
  }, [isConnected])

  return (
    <main className="flex min-h-screen flex-col noscr">
      <Hero/>
    </main>
  );
}


