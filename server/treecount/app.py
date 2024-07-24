from flask import Flask, request, jsonify
import torch
from PIL import ImageDraw, Image
import io
import os

def draw_bounding_boxes(img, predictions):
  draw = ImageDraw.Draw(img)
  for box in predictions:
    x_min, y_min, x_max, y_max, confidence, class_id = box.values()
    draw.rectangle([(x_min, y_min), (x_max, y_max)], outline=(255, 0, 0), width=2)
  return img


app = Flask(__name__)
# CORS(app)
try:
    # Load the YOLO model
    model = torch.hub.load('server/yolov5', 'custom', path='server/yolov5/runs/train/exp/weights/best.pt', source='local')
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)
@app.route('/',methods=['POST','GET'])
def index():
    return "hello kaise ho"

@app.route('/upload', methods=['POST'])
def upload():
    
    # if 'file' not in request.files:
    #     return jsonify({'error': 'No file part in the request'}), 405

    # file=request.files['file']
    # print(file.name)
    file=request.json.get('path')
    

    # return jsonify({
    #     'prediction': file
    # })

    # if file.filename == '':
    #     return jsonify({'error': 'No file selected'}), 400

    # if file.mimetype not in ['image/jpeg', 'image/png']:
    #     return jsonify({'error': 'Invalid file type'}), 400

    try:
        img = Image.open(file)
    except Exception as e:
        return jsonify({'error': 'Error loading image'}), 400

    try:
        results = model(img)
    except Exception as e:
        return jsonify({'error': 'Error making prediction'}), 500

    # Process results
    predictions = results.pandas().xyxy[0].to_dict(orient="records")
    # img=draw_bounding_boxes(img,predictions)

    # Draw bounding boxes on the image
    return jsonify({
        'work':predictions
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
