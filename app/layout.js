import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/Providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";
import Watermark from "@/components/watermark";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JLEMA",
  description: "Collect badges, customize your profile and earn points. Connect your wallet and begin the Jlema collector profile experience now.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className + ""}>
        <Providers>
          <ToastContainer />
          <Navbar/>
          {children}
        </Providers>
        <Watermark/>
      </body>
    </html>
  );
}
