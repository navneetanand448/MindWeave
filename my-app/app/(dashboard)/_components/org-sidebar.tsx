"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Star } from 'lucide-react'
import {  useSearchParams } from 'next/navigation'
const font=Poppins({
  subsets:["latin"],
  weight:["600"],
})
function OrgSidebar() {
  const searchParams=useSearchParams();
  const favourites=searchParams.get("favourites")
  return (
    <div>
   <Link href="/">
   <div>
    <Image
    src="../../../public/logo.svg"
    alt="Logo"
    height={40}
  width={40}
    />
    <span>
      Board
    </span>
   </div>
   </Link>
    <OrganizationSwitcher
    hidePersonal
    appearance={{
      elements:{
        rootBox:{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          width:"100%"
        },
        OrganizationSwitcherTrigger:{
          padding:"6px",
          width:"100%",
          borderRadius:"8px",
          border:" ",
          justiftContent:"",
          backgroundColor:"white"
        }
      }
    }}
    />
    <div>
      <Button
       variant='secondary'
      >
        <Link href="/">
        <LayoutDashboard/>
        Team Boards
        </Link>
      </Button>
       <Button asChild
       variant='ghost'
      >
        <Link href={{
          pathname:"/",
          query:{favourites:true}
        }}>
        <Star/>
        Favourite Boarsd
        </Link>
      </Button>
    </div>
    </div>
  )
}

export default OrgSidebar