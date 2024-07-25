import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.set('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setPredictions(data.data); // corrected from data.prediction to data.predictions
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(predictions)

  useEffect(() => {
    if (imageUrl && predictions.length > 0) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            predictions.forEach((prediction) => {
              ctx.strokeStyle = 'red';
              ctx.lineWidth = 5;
              ctx.strokeRect(
                prediction.xmin,
                prediction.ymin,
                prediction.xmax - prediction.xmin,
                prediction.ymax - prediction.ymin
              );
            });
          }
        }
      };
    }
  }, [imageUrl, predictions]);

  return (
    <div>
      <div className='flex flex-col justify-center items-center space-y-4'>
          <h1 className='font-semibold text-center text-3xl '>Tree Detection</h1>
              <input 
                  placeholder=''
                  type="file"
                  accept="image/*"
                  className="mb-4 border-2 px-2 py-1 rounded-xl" onChange={handleImageChange} />
          <Button onClick={handleUpload} disabled={!file} className='py-2 px-6 rounded-lg w-fit text-xl text-black' variant={'outline'}>Process Image</Button>
      </div>
      
      <div className='flex gap-4  items-center'>
        {imageUrl && (
          <div className='w-[50%]'>
            <h2 className='font-semibold text-xl'>Selected Image:</h2>
            <img src={imageUrl} alt="Selected"  className='border-2 shadow-md border-spacing-2'/>
          </div>
        )}
        {predictions?predictions.length > 0 && (
          <div className='w-[50%]'>
            <h2 className='font-semibold text-xl'>Processed Image:</h2>
            <canvas id="canvas" />
          </div>
        ):(<></>)}
      </div>
    </div>
  );
}
