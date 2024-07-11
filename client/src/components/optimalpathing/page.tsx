/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const OptimalPathing: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [greenCoverPercentage, setGreenCoverPercentage] = useState<string | null>(null);
  const [idleLandPercentage, setIdleLandPercentage] = useState<string | null>(null);

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let blackPixelCount = 0;

        let totalGreen = 0;
        for (let i = 1; i < imageData.data.length; i += 4) {
          totalGreen += imageData.data[i];
        }
        const meanGreen = totalGreen / (imageData.data.length / 4);

        for (let i = 0; i < imageData.data.length; i += 4) {
          let gray = (imageData.data[i + 1]) * 0.587;

          if (gray < meanGreen / 1.5) {
            gray = 0;
            blackPixelCount++;
          } else {
            gray = 255;
          }

          imageData.data[i] = gray;
          imageData.data[i + 1] = gray;
          imageData.data[i + 2] = gray;
          imageData.data[i + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);

        setProcessedImage(canvas.toDataURL());
        const greenCover = ((blackPixelCount / (canvas.width * canvas.height)) * 100).toFixed(2) + '%';
        setGreenCoverPercentage(greenCover);
        const idleLand = (100 - (blackPixelCount / (canvas.width * canvas.height) * 100)).toFixed(2) + '%';
        setIdleLandPercentage(idleLand);
      };
      img.src = reader.result as string;
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setUploadedImage(null);
    setSelectedFile(null);
    setProcessedImage(null);
    setGreenCoverPercentage(null);
    setIdleLandPercentage(null);
    const fileInput = document.getElementById('image-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className=" w-full min-h-screen flex flex-col py-2">
      <h2 className="text-3xl font-semibold text-center mb-6">Optimal Pathing</h2>
      <div className='flex flex-col items-center'>
        <input
          placeholder=''
          type="file"
          accept="image/*"
          className="mb-4 border-2 px-2 py-1 rounded-xl"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
              setUploadedImage(URL.createObjectURL(e.target.files[0]));
              setProcessedImage(null); // Reset the processed image when a new file is selected
            }
          }}
        />
        <Button
          className="py-2 px-6 rounded-lg w-fit text-xl text-black"
          onClick={() => {
            if (selectedFile) {
              processImage(selectedFile);
            }
          }}
          variant={'outline'}
        >
          Process Image
        </Button>
      </div>
      <h3 className="text-2xl font-semibold mt-10 px-4">Processed Image:</h3>
      <div className="flex justify-around mt-6 w-full max-w-4xl px-4 space-x-16 ">
        {uploadedImage && <img src={uploadedImage} alt="Uploaded Image" className="max-w-2xl" />}
        {processedImage && <img src={processedImage} alt="Processed Image" className="max-w-2xl" />}
      </div>
      <Separator className='my-6'/>
      <div className='flex flex-col'>
      <h2 className='text-center font-semibold text-2xl'>Results</h2>
      <div className='flex flex-row justify-between items-center'>
      <div>
      <h4 className="text-xl font-semibold mt-2">Green Cover Percentage: <span>{greenCoverPercentage}</span></h4>
      <h4 className="text-xl font-semibold mt-2">Idle Land Percentage: <span>{idleLandPercentage}</span></h4>
      </div>
      <Button
        className="py-2 px-6 rounded-lg w-fit text-xl text-black"
        onClick={reset}
        variant={'outline'}
        >
      Reset
      </Button>
      </div>
      
      </div>
    </div>
  );
};

export default OptimalPathing;

