import spacy
from spacy.util import minibatch, compounding

def applyModel():
    # Test training model
    print("Loading model")
    nlp = spacy.load("./")
    test_text = 'phone away'
    doc = nlp(test_text)
    print("Entities in '%s'" % test_text)
    for ent in doc.ents:
        print(ent.label_, ent.text)

applyModel()