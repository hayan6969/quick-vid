import type { Metadata } from "next";
import {Inter} from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Quick Vid",
  description: "Quick Video meetings on the go",
  icons:{
    icon:'/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      layout:{
        logoImageUrl:'/icons/logo.svg',
        socialButtonsVariant:'iconButton',
      }, 
      variables:{
        colorText:'#fff',
        colorPrimary:'#0e78f9',
        colorBackground:'#1c1f2e',
        colorInputBackground:'#252a41',
        colorInputText:'#fff',
        
      }
    }}
    >
    <html lang="en">
      <body
        className={`${inter.className} bg-dark-2`}
      >
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
