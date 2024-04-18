import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/Providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JLEMA",
  description: "Collect badges, customize your profile and earn points. Connect your wallet and begin the Jlema collector profile experience now.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " overflow-scroll noscr "}>
        <Providers>
          <ToastContainer />
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
