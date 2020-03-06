from __future__ import unicode_literals, print_function

import plac
import random
from pathlib import Path
import spacy
from spacy.util import minibatch, compounding


# new entity label
LABEL1 = "RCB"
LABEL2 = "EWASTE"
LABEL3 = "LIGHT"

# training data
# Note: If you're using an existing model, make sure to mix in examples of
# other entity types that spaCy correctly recognized before. Otherwise, your
# model might learn the new type, but "forget" what it previously knew.
# https://explosion.ai/blog/pseudo-rehearsal-catastrophic-forgetting
TRAIN_DATA = [
    (
        "Glasses",
        {"entities": [(0, 5, LABEL1)]},
    ),
    (   "Where can I throw my glasses", 
        {"entities": [(21,26, LABEL1)]}),
    (
        "Where can I throw my glass bottles",
        {"entities": [(21, 26, LABEL1)]},
    ),
    (   "I need to dump these glass bottles", 
        {"entities": [(21, 26, LABEL1)]}),
    (
        "Where is the nearest place to throw glass?",
        {"entities": [(36, 41, LABEL1)]},
    ),
    ("glasses should be trashed", {"entities": [(0, 5, LABEL1)]}),
    (
        "phones should be thrown in as eWaste",
        {"entities": [(0, 6, LABEL2)]},
    ),
    ("Do they bite?", {"entities": []}),
    (
        "phones should be recycled",
        {"entities": [(0, 6, LABEL2)]},
    ),
    ("phones ruin your feelings", {"entities": [(0, 6, LABEL2)]}),
    (
        "they pretend to care about your feelings, those phones",
        {"entities": [(48, 54, LABEL2)]},
    ),
    ("phones?", {"entities": [(0, 6, LABEL2)]}),
    (
        "phone",
        {"entities": [(0, 5, LABEL2)]},
    ),
    (
        "throw my phone away",
        {"entities": [(9, 14, LABEL2)]},
    ),
    (
        "throw my telephone away",
        {"entities": [(13, 18, LABEL2)]},
    ),
    (
        "throw my mobile phone away",
        {"entities": [(16, 21, LABEL2)]},
    ),
    (
        "where do i recycle my mobile phone",
        {"entities": [(29, 34, LABEL2)]},
    ),
    (
        "light bulbs",
        {"entities": [(0, 5, LABEL3)]},
    ),
    (
        "lighting",
        {"entities": [(0, 5, LABEL3)]},
    ),
    (
        "lightslight",
        {"entities": [(0, 5, LABEL3)]},
    ),
    (
        "throw my light away",
        {"entities": [(9, 14, LABEL3)]},
    ),
    (
        "recycle my lights",
        {"entities": [(11, 16, LABEL3)]},
    ),
    (
        "dump my light bulbs",
        {"entities": [(8, 13, LABEL3)]},
    ),

]


@plac.annotations(
    model=("Model name. Defaults to blank 'en' model.", "option", "m", str),
    new_model_name=("New model name for model meta.", "option", "nm", str),
    output_dir=("Optional output directory", "option", "o", Path),
    n_iter=("Number of training iterations", "option", "n", int),
)
def main(model=None, new_model_name="entity", output_dir="entityModel", n_iter=30):
    """Set up the pipeline and entity recognizer, and train the new entity."""
    random.seed(0)
    if model is not None:
        nlp = spacy.load(model)  # load existing spaCy model
        print("Loaded model '%s'" % model)
    else:
        nlp = spacy.blank("en")  # create blank Language class
        print("Created blank 'en' model")
    # Add entity recognizer to model if it's not in the pipeline
    # nlp.create_pipe works for built-ins that are registered with spaCy
    if "ner" not in nlp.pipe_names:
        ner = nlp.create_pipe("ner")
        nlp.add_pipe(ner)
    # otherwise, get it, so we can add labels to it
    else:
        ner = nlp.get_pipe("ner")

    ner.add_label(LABEL1)  # add new entity label to entity recognizer
    # Adding extraneous labels shouldn't mess anything up
    ner.add_label(LABEL2)
    ner.add_label(LABEL3)
    if model is None:
        optimizer = nlp.begin_training()
    else:
        optimizer = nlp.resume_training()
    move_names = list(ner.move_names)
    # get names of other pipes to disable them during training
    pipe_exceptions = ["ner", "trf_wordpiecer", "trf_tok2vec"]
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe not in pipe_exceptions]
    with nlp.disable_pipes(*other_pipes):  # only train NER
        sizes = compounding(1.0, 4.0, 1.001)
        # batch up the examples using spaCy's minibatch
        for itn in range(n_iter):
            random.shuffle(TRAIN_DATA)
            batches = minibatch(TRAIN_DATA, size=sizes)
            losses = {}
            for batch in batches:
                texts, annotations = zip(*batch)
                nlp.update(texts, annotations, sgd=optimizer, drop=0.35, losses=losses)
            print("Losses", losses)

    # test the trained model
    test_text = "Should I dump my lights?"
    doc = nlp(test_text)
    print("Entities in '%s'" % test_text)
    for ent in doc.ents:
        print(ent.label_, ent.text)

    # save model to output directory
    if output_dir is not None:
        output_dir = Path(output_dir)
        if not output_dir.exists():
            output_dir.mkdir()
        nlp.meta["name"] = new_model_name  # rename model
        nlp.to_disk(output_dir)
        print("Saved model to", output_dir)

        # test the saved model
        print("Loading from", output_dir)
        nlp2 = spacy.load(output_dir)
        # Check the classes have loaded back consistently
        assert nlp2.get_pipe("ner").move_names == move_names
        doc2 = nlp2(test_text)
        for ent in doc2.ents:
            print(ent.label_, ent.text)


if __name__ == "__main__":
    plac.call(main)