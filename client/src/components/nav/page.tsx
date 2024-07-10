import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import navicon from "/public/img/navicon.png"
function  Navbar() {
  return (
    <div className='w-full flex items-center flex-row h-auto px-10 py-2 bg-gray-100 justify-between'>
      <div>
        <a href="/">
        <Image src={navicon} 
        alt="logo"
        className="w-36 h-auto" 
        />
        </a>
      </div>
      <div className='space-x-6 text-xl font-semibold'>
        <a href="/"><Button variant={'outline'} className='shadow-md'>Home</Button></a>
        <a href="/aboutus"><Button className='shadow-md' variant={'outline'}>About Us</Button></a>
        <a href="/features"><Button className='shadow-md' variant={'outline'}>Features</Button></a>
      </div>
    </div>
  )
}

export default Navbar