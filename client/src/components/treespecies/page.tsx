/* eslint-disable @next/next/no-img-element */
// components/MapComponent.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
const MapComponent: React.FC = () => {
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
        <div className="flex flex-col items-center p-10 bg-gray-100 w-full min-h-screen">
            <h1 className="text-center font-semibold text-3xl mb-8">Upload an Image</h1>
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
                {responseData && (
                    <div className="mt-5">
                        <h2 className="text-xl font-bold">{responseData.title}</h2>
                        <p>{responseData.desc}</p>
                        <p><strong>Prevention Steps:</strong> {responseData.prevent}</p>
                        <img src={responseData.image_url} alt="Disease Image" className="max-w-full h-auto mt-2" />
                        <h3 className="text-lg font-semibold mt-4">Recommended Supplement</h3>
                        <p>{responseData.sname}</p>
                        <img src={responseData.simage} alt="Supplement Image" className="max-w-full h-auto mt-2" />
                        <a href={responseData.buy_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 inline-block">Buy Here</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapComponent;
