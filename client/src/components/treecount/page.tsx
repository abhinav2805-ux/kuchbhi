import { useState, useEffect } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [treeCount, setTreeCount] = useState<number>(0);

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
      setPredictions(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const distance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
    );
  };

  const clusterPredictions = (predictions) => {
    const points = predictions.map((pred) => [
      (pred.xmin + pred.xmax) / 2,
      (pred.ymin + pred.ymax) / 2,
    ]);

    const clusters = [];
    const threshold = 50; // Adjust this threshold as needed

    points.forEach((point, index) => {
      let addedToCluster = false;
      for (let cluster of clusters) {
        for (let clusterPoint of cluster) {
          if (distance(point, clusterPoint) < threshold) {
            cluster.push(point);
            addedToCluster = true;
            break;
          }
        }
        if (addedToCluster) break;
      }
      if (!addedToCluster) {
        clusters.push([point]);
      }
    });

    return clusters.length;
  };

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

            const uniqueTreeCount = clusterPredictions(predictions);
            setTreeCount(uniqueTreeCount);
          }
        }
      };
    }
  }, [imageUrl, predictions]);

  return (
    <div>
      <h1>Tree Detection</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={!file} className='bg-black text-white p-2 rounded-lg m-3'>Process Image</button>
      <div className='flex justify-around'>
        {imageUrl && (
          <div>
            <h2>Selected Image:</h2>
            <img src={imageUrl} alt="Selected" className='h-[400px] w-[400px]' />
          </div>
        )}
        {predictions && predictions.length > 0 && (
          <div>
            <h2>Processed Image:</h2>
            <canvas id="canvas" className='h-[400px] w-[400px]' />
          </div>
        )}
      </div>
      {treeCount > 0 && (
        <div>
          <h2>Number of Unique Trees: {treeCount}</h2>
        </div>
      )}
    </div>
  );
}
