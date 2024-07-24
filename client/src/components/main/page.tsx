import React from 'react'
import bg from '/public/img/background.jpg'
import { Button } from '../ui/button'
import panaromic from '/public/img/panaromic.png'
import Image from 'next/image'
function Home() {
  return (
    <div className=''>
    <div className='mx-auto  flex flex-col justify-center w-full px-10 py-20 bg-cover ' style={ {backgroundImage : `url(${bg.src})`}}>
        <div className='flex flex-col space-y-8 justify-center items-center'>
            <h1 className='text-4xl font-semibold  text-center text-slate-100'>Your solution for accurate tree enumeration</h1>
            <p className='text-xl text-center text-slate-100 font-semibold'>Jan-Seva is an open service for Tree Enumeration to provide access to visualizations or interactive interfaces that allow users to explore and interpret the results easily.</p>
            <a href="/predict"><Button variant={'outline'} className='justify-center shadow-lg items-center text-lg font-semibold'>Get Started</Button></a>
        </div>
    </div>
    <div className='flex flex-col px-10 py-8 justify-center items-center'>
        <div className='flex flex-col justify-center items-center space-y-6'>
        <h2 className='text-3xl font-bold '>Areas Of Specialization</h2>
        <div className='flex flex-row justify-evenly gap-4'>
            <div className='border-2 px-4 py-4  rounded-lg text-xl font-semibold shadow-md'>Efficient Image Processing</div>
            <div className='border-2 px-4 py-4  rounded-lg text-xl font-semibold shadow-md'>Value insights for Decision Making</div>
            <div className='border-2 px-4 py-4  rounded-lg text-xl font-semibold shadow-md'> Tree Species Categorization</div>
        </div>
        </div>

        <div className='flex flex-col mt-10 justify-center items-center'>
            <h2 className='text-2xl font-bold '>Proof Of Concept Of Image Processing</h2>
            <Image
              src={panaromic}
              className='rounded-sm'
              alt="panaromic image"
            />
        </div>
    </div>
    </div>
  )
}

export default Home