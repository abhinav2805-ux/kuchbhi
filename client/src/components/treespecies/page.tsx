/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { Button } from '../ui/button';
const TreeSpecies: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string>('');
    const [responseData, setResponseData] = useState<any>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/submit', {
                method: 'POST',
                body: formData,
            });
            
            
            if (response.ok) {
                const result = await response.json();
                setResponseData(result);
                setUploadMessage('File uploaded successfully!');
                console.log(result);
            } else {
                const error = await response.json();
                setUploadMessage(error.error || 'File upload failed!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadMessage('An error occurred while uploading the file.');
        }
    };

    return (    
        <div className="flex flex-col items-center p-10 bg-gray-100 w-full min-h-screen rounded-xl">
            <h1 className="text-center font-semibold text-3xl mb-8">Tree Disease Analyser</h1>
            <p className='font-semibold text-black'>Please upload the image of suffering plant&apos;s leaf for diseases detection.</p>
            <div className="mt-5 p-5 bg-white border-2 border-gray-300 rounded-md shadow-md w-full max-w-[800px]">
                <div className="mt-5 text-center flex flex-col justify-center items-center">
                    <input placeholder=''
                    type="file"
                    accept="image/*"
                    className="mb-4 border-2 px-2 py-1 rounded-xl" onChange={handleFileChange}/>
                    <Button variant={'outline'} onClick={handleUpload} className="py-2 px-6 rounded-lg w-fit text-xl text-black">Upload Image</Button>
                </div>
                {uploadMessage && <p className="mt-3 text-center font-semibold">{uploadMessage}</p>}
                {responseData &&  (
                    <div className="mt-5 flex-col justify-center">
                        <div className='flex items-center justify-around border-2 border-spacing-2 py-4 rounded-2xl'>
                            <img src={responseData.image_url} alt="Disease Image" className="w-[40%] max-w-full h-auto mt-2 rounded-lg" />
                            <h2 className="text-xl font-bold text-center ">{responseData.title}</h2>
                        </div>
                        <div className='px-4 my-8'>
                        <h3 className='font-bold text-2xl  text-center'>Description</h3>
                        <p className="mt-4 text-md">{responseData.desc}</p>
                        <h3 className=' mt-4 font-bold text-2xl text-center'>Prevention Steps</h3>
                        <p className=" mt-4 text-md">{responseData.prevent}</p>  
                        <h3 className="text-xl text-center font-semibold mt-4">Recommended Supplement : {responseData.sname}</h3>
                        <div className='items-center flex justify-center'>
                            <a href={responseData.buy_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-center text-xl  underline mt-2 inline-block">Buy Here</a>
                        </div>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default TreeSpecies;
