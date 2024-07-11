
import { useState } from 'react';

const OptimalPathing: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [greenCoverPercentage, setGreenCoverPercentage] = useState<string>('');
  const [idleLandPercentage, setIdleLandPercentage] = useState<string>('');

  const processImage = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let blackPixelCount = 0;

        // Calculate the mean green value
        let totalGreen = 0;
        for (let i = 1; i < imageData.data.length; i += 4) {
          totalGreen += imageData.data[i];
        }
        const meanGreen = totalGreen / (imageData.data.length / 4);

        for (let i = 0; i < imageData.data.length; i += 4) {
          let gray = imageData.data[i + 1] * 0.587; // Keep only green channel

          if (gray < meanGreen / 1.5) {
            gray = 0;
            blackPixelCount++;
          } else {
            gray = 255;
          }

          imageData.data[i] = gray;   // Red channel
          imageData.data[i + 1] = gray; // Green channel
          imageData.data[i + 2] = gray; // Blue channel
          imageData.data[i + 3] = 255;  // Alpha channel
        }

        ctx.putImageData(imageData, 0, 0);

        // Display the processed image and green cover percentage
        setProcessedImage(canvas.toDataURL());
        const greenCover = ((blackPixelCount / (canvas.width * canvas.height)) * 100).toFixed(2) + '%';
        const idleLand = (100 - ((blackPixelCount / (canvas.width * canvas.height)) * 100)).toFixed(2) + '%';
        setGreenCoverPercentage(greenCover);
        setIdleLandPercentage(idleLand);
      };
      img.src = reader.result as string;

      // Display the uploaded image
      setUploadedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  return (
    <div>
      <center>
        <h2>Optimal Pathing</h2>

        <input type="file" id="image-file" accept="image/*" onChange={handleFileChange} />
        <button onClick={() => handleFileChange}>Process Image</button>
      </center>

      <h3>Processed Image:</h3>
      <div className="image-container">
        {uploadedImage && <img id="uploaded-image" src={uploadedImage} alt="Uploaded Image" />}
        {processedImage && <img id="processed-image" src={processedImage} alt="Processed Image" />}
      </div>

      <h4>Green Cover Percentage: <span id="green-cover-percentage">{greenCoverPercentage}</span></h4>
      <h4>Idle Land Percentage: <span id="idle-land-percentage">{idleLandPercentage}</span></h4>

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }

        h2, h3 {
          color: #333;
          padding: 20px;
        }

        h3 {
          display: flex;
          align-items: center;
        }

        input[type="file"] {
          display: block;
          margin: 20px;
        }

        button {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
        }

        .image-container {
          display: flex;
          justify-content: space-around;
        }

        .image-container img {
          max-width: calc(50% - 40px);
        }

        #green-cover-percentage, #idle-land-percentage {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
};

export default OptimalPathing;
