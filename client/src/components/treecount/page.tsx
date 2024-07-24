import { useState, useEffect } from 'react';

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
      <h1>Tree Detection</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={!file}>Process Image</button>
      <div>
        {imageUrl && (
          <div>
            <h2>Selected Image:</h2>
            <img src={imageUrl} alt="Selected" />
          </div>
        )}
        {predictions?predictions.length > 0 && (
          <div>
            <h2>Processed Image:</h2>
            <canvas id="canvas" />
          </div>
        ):(<></>)}
      </div>
    </div>
  );
}
