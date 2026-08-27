import { Geist, Geist_Mono } from "next/font/google";
import {Fraunces , Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const fraunces = Fraunces({
  subsets: ['latin'],
  weight:['600','700'],
  variable: '--font-fraunces'
});

const inter = Inter({
  subsets:['latin'],
  variable:'--font-inter'

});


export const metadata = {
  title: "Meridian Estates | Verified Properties in Islamabad & Rawalpindi",
  description: "Verified plots and homes across Islamabad & Rawalpindi for overseas and first-time buyers",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
