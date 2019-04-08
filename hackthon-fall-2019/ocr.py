import os
import io
from google.cloud import vision
from google.cloud.vision import types
from PIL import Image
import re
import itertools
import json
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from keras.layers import Dense, Embedding, LSTM, SpatialDropout1D
from keras.models import Sequential
from sklearn.feature_extraction.text import CountVectorizer
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split
from keras.utils.np_utils import to_categorical
from keras.callbacks import EarlyStopping
from keras.models import load_model

class ocr_detection:

    def detect_text(self, path):
        """Detects text in the file."""
        from google.cloud import vision
        client = vision.ImageAnnotatorClient()

        with io.open(path, 'rb') as image_file:
            content = image_file.read()

        image = vision.types.Image(content=content)

        response = client.text_detection(image=image)
        texts = response.text_annotations
        print('Texts:')

        text_location_pair = {}
        numbers = []
        i = 0
        for text in texts:
            # if i != 0:
            print('\n"{}"'.format(text.description))
            y_total = 0
            y_total_average = 0
            for vertex in text.bounding_poly.vertices:

                y_total = y_total + vertex.y
                y_total_average = y_total/4

            text_location_pair[str('{}'.format(text.description))] = y_total_average

            description = '\n"{}"'.format(text.description)
            if re.findall("\d+\.\d+", description) and len(re.findall("\d+\.\d+", description)) == 1:
                numbers.append(re.findall("\d+\.\d+", description)[0])

                print('\n"{}"'.format(text.description))
                # vertices = (['({},{})'.format(vertex.x, vertex.y)
                #              for vertex in text.bounding_poly.vertices])

                # print('bounds: {}'.format(','.join(vertices)))

        print(text_location_pair)
        print(type(numbers))
        print(numbers)

        numbers = list(map(float, numbers))
        rand_1 = 0
        result1 = []
        for j in range(0, len(numbers)):
            result = [seq for i in range(len(numbers), 0, -1) for seq in itertools.combinations(numbers, i) if
                      sum(seq) == numbers[j]]
            length = 0
            for item in range(0, len(result)):
                max_value = len(result[item])
                if (max_value > length):
                    length = max_value
                    index = item

            result1.append(result[index])

        leng1 = 0
        for a in range(0, len(result1)):
            max_value1 = len(result1[a])
            if (max_value1 > leng1):
                leng1 = max_value1
                index1 = a

        print("*********")
        print(len(result1[index1]))
        final_result = list(result1[index1])
        print(final_result)
        print("KJDKJAKS")

        for names in text_location_pair.keys():
            for found in final_result:
                if re.findall("\d+\.\d+", names) == found:
                    print(re.findall("\d+\.\d+", names))

        print(text_location_pair['Weight'])

        model = load_model('receipt-classification.h5')

        n_most_common_words = 8000
        max_len = 130
        tokenizer = Tokenizer(num_words=n_most_common_words, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~', lower=True)

        txt = ["crafts"]
        tokenizer.fit_on_texts(txt)
        seq = tokenizer.texts_to_sequences(txt)
        padded = pad_sequences(seq, maxlen=max_len)
        pred = model.predict(padded)
        labels = ['Hobbies', 'Games', 'Arts & Crafts', 'Die-Cast & Toy Vehicles']
        print(pred, labels[np.argmax(pred)])






credential_path = "hackathon-7651d890861c.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
obj = ocr_detection()
# ocr_detection.detect_text('/static/local-filename.jpg')
