from flask import Flask, request, jsonify
from sklearn.externals import joblib
import traceback
import spacy
from spacy.util import minibatch, compounding
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

# Input: {"input": "Hello world"}
# Output: {
#           "entity" : "EntityType",
            # "desc" : "Entity desc"
#          }
@app.route("/getEntity", methods=['POST'])
def getEntity():

    if nlp:
        try:
            content = request.json
            inputSentence = content['input']
            print (inputSentence)
            doc = nlp(inputSentence)
            print("Entities in '%s'" % inputSentence)
            for ent in doc.ents:
                print(ent.label_, ent.text)
                return  jsonify({"entity":ent.label_ , "desc": ent.text})
            
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

    nlp = spacy.load("entityModel")
    print('Entity model loaded')

    app.run(port=port, debug=True)



