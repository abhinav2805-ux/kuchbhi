import { Github } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
      <footer className='flex flex-col px-10 py-6 justify-center  bg-gray-200'>
            <div className='flex flex-row justify-between'>
            <p className="text-gray-600">&copy; 2024 Van-Seva</p>
            <p className="text-gray-600">Made with &#9829; by <a href="/" className="text-blue-500 " title="Meet Our Team">Our Team</a>.</p>
            <div className="space-x-6 flex">
            <a href="mailto:anshjain9159@gmail.com" className="text-blue-500">Contact</a>
            <a href="/" className="text-blue-500">Terms</a>
            <a href=""><Github/></a>
            </div>
            </div>
            
      </footer>
  )
}

export default Footer