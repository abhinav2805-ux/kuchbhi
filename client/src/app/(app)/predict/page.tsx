"use client";
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
// Import the Loader component

// Import your components for each section
import TreeCount from '@/components/treecount/page';
import GreenCover from '@/components/greencover/page';
import TreeSpecies from '@/components/treespecies/page';
import OptimalPathing from '@/components/optimalpathing/page';
import HistoricalData from '@/components/historicaldata/page';
import { Separator } from '@/components/ui/separator';

function Predict() {
  //yeh uske lie hai ki konsa seciton render hoga
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  //yeh loader lagane ke lie
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButtonClick = (section: string) => {
    setIsLoading(true); //loader chalu karo
    setTimeout(() => {
      setSelectedSection(section);
      setIsLoading(false);
    }, 1000);  //ek second baad loader off or section update
  };

  const renderSection = () => {
    if (isLoading) { //loading horhi hai to loader chaljayega
      return <span className="loading loading-infinity loading-lg"></span>;
    }

    switch (selectedSection) {
      case 'Tree Count':
        return <TreeCount/>;
      case 'Green Cover':
        return <GreenCover/>;
      case 'Tree Species':
        return <TreeSpecies/>;
      case 'Optimal Pathing':
        return <OptimalPathing/>;
      case 'Historical Data':
        return <HistoricalData/>;
      default:
        return null;
    }
  };

  return (
    <div className=''>
      <div className='justify-center px-10 py-20 flex  items-center flex-col'>
        <h1 className='text-3xl font-semibold'>Image Analysis Of Forest / Tree</h1>
        <h3 className='font-semibold text-slate-500 mt-4'>Choose any one of following features mentioned below</h3>
        <div className='space-x-4 mt-6'>
          <Button variant={'outline'} onClick={() => handleButtonClick('Tree Count')}>Tree Count</Button>
          <Button variant={'outline'} onClick={() => handleButtonClick('Green Cover')}>Green Cover</Button>
          <Button variant={'outline'} onClick={() => handleButtonClick('Tree Species')}>Tree Species</Button>
          <Button variant={'outline'} onClick={() => handleButtonClick('Optimal Pathing')}>Optimal Pathing</Button>
          <Button variant={'outline'} onClick={() => handleButtonClick('Historical Data')}>Historical Data</Button>
        </div>
        <Separator className='mt-10'/>
        <div className='mt-10 w-full justify-center items-center flex mx-auto'>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

export default Predict;
