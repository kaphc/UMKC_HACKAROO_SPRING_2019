from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import os
import io
from google.cloud import vision
from google.cloud.vision import types
from PIL import Image
import urllib
import ocr
import download_image
from urllib.request import urlopen


app = Flask(__name__)
api = Api(app)

CORS(app)

@app.route("/")
def hello():
    return jsonify({'text':'Success!'})

class ParseReceipt(Resource):
    def get(self, receipt_name):
        download_obj = download_image.download_image()
        download_obj.download(receipt_name)
        ocr_obj = ocr.ocr_detection()
        ocr_obj.detect_text('static/local-filename.jpg')
        return {'receipt_name': receipt_name}

api.add_resource(ParseReceipt, '/receipts/<receipt_name>') # Route_1
# api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3


if __name__ == '__main__':
   app.run(port=5002)
   credential_path = "hackathon-7651d890861c.json"
   os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
