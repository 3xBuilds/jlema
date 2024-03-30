"use client"
import Example from '@/components/Example';
import { initializeAnalytics, GaPageview } from '@/utils/Analytics';
import { useEffect } from 'react';
import ReactGA from "react-ga4";
import { Toaster } from 'react-hot-toast'

export default function Home() {

  useEffect(()=>{
    initializeAnalytics();
    GaPageview("/", "home_page_visit")
  }, [])

  return (
    <>
      <Toaster/>
      <main className="flex min-h-screen flex-col items-center p-24">
        {/* Import your components here */}
        <Example/>
      </main>
    </>
  )
}
