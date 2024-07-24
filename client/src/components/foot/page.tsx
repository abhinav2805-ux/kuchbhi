import { Github } from 'lucide-react'
import React from 'react'
import { Mail } from 'lucide-react'

import {} from '@mui/material/utils'
function Footer() {
  return (
      <footer className='flex flex-col px-10 py-6 justify-center  bg-gray-200'>
            <div className='flex flex-row justify-between'>
            <p className="text-gray-600 font-semibold">&copy; 2024 Van-Seva</p>
            <p className="text-gray-600 font-semibold">Made with &#9829; by <a href="https://github.com/abhinav2805-ux/kuchbhi" className="text-blue-500 " title="Meet Our Team">Our Team</a>.</p>
            <div className="space-x-6 flex">
            <a href="mailto:anshjain9159@gmail.com" className=""><Mail/></a>
            <a href=""><Github/></a>
            <a href="/" className="font-semibold ">T/C</a>
            
            </div>
            </div>
            
      </footer>
  )
}

export default Footer