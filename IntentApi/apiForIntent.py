from flask import Flask, request, jsonify
from sklearn.externals import joblib
import traceback
app = Flask(__name__)


@app.route("/")
def hello():
    return "Welcome to machine learning model APIs!"


# Input: {"input": "Hello world"}
# Output: {"intent" : "intentClass"}
@app.route("/predict", methods=['POST'])
def predict():
    if lr and count_vect:
        try:
            content = request.json
            inputQns = content['input']
            print (inputQns)
            intent = lr.predict(count_vect.transform([inputQns]))
            intent = str(intent).strip("['']")
            return jsonify({"intent":intent})
        except:

            return jsonify({'trace': traceback.format_exc()})



if __name__ == '__main__':
    try:
        port = int(sys.argv[1]) # This is for a command-line input
    except:
        port = 12345 # If you don't provide any port the port will be set to 12345

    lr = joblib.load("intentModel.pkl") 
    # Load "model.pkl"
    print ('Model loaded')

    count_vect = joblib.load("vectModel.pkl")
    print('Count Vect loaded')

    app.run(port=port, debug=True)



