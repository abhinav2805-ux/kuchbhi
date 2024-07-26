import os
from flask import Flask, redirect, render_template, request, jsonify
from PIL import Image
import torchvision.transforms.functional as TF
import CNN
import numpy as np
# print("----------")
# print(np.__version__)
import torch
import pandas as pd
from flask_cors import CORS


disease_info = pd.read_csv('server/plantdisease/disease_info.csv' , encoding='cp1252')
supplement_info = pd.read_csv('server/plantdisease/supplement_info.csv',encoding='cp1252')

model = CNN.CNN(39)    
model.load_state_dict(torch.load("server/plantdisease/plant_disease_model_1_latest.pt"))
model.eval()

def prediction(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index


app = Flask(__name__)
CORS(app)

# @app.route('/')
# def home_page():
#     return render_template('home.html')

# @app.route('/contact')
# def contact():
#     return render_template('contact-us.html')

# @app.route('/index')
# def ai_engine_page():
#     return render_template('index.html')

# @app.route('/mobile-device')
# def mobile_device_detected_page():
#     return render_template('mobile-device.html')
try:
    # Load the YOLO model
    model_1 = torch.hub.load('server/yolov5', 'custom', path='server/yolov5/runs/train/exp/weights/best.pt', source='local')
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)

@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        if 'image' not in request.files:
            return jsonify({'error': 'No image file in request'}), 400
        
        image = request.files['image']
        if image.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        filename = image.filename
        file_path = os.path.join('client/public/img', filename)
        image.save(file_path)
        print(file_path)

        pred = prediction(file_path)
        title = disease_info['disease_name'][pred]
        description = disease_info['description'][pred]
        prevent = disease_info['Possible Steps'][pred]
        image_url = disease_info['image_url'][pred]
        supplement_name = supplement_info['supplement name'][pred]
        supplement_image_url = supplement_info['supplement image'][pred]
        supplement_buy_link = supplement_info['buy link'][pred]

        response_data = {
            'title': title,
            'desc': description,
            'prevent': prevent,
            'image_url': image_url,
            'sname': supplement_name,
            'simage': supplement_image_url,
            'buy_link': supplement_buy_link
        }

        return jsonify(response_data), 200

# @app.route('/market', methods=['GET', 'POST'])
# def market():
#     return render_template('market.html', supplement_image = list(supplement_info['supplement image']),
#     
#                        supplement_name = list(supplement_info['supplement name']), disease = list(disease_info['disease_name']), buy = list(supplement_info['buy link']))
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
        results = model_1(img)
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
    app.run(debug=True)
