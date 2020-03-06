def findWord(arr):
    for sentence in arr:
        sentence = sentence.lower()
        start_index = sentence.find(label)
        end_index = 5

        print(sentence)
        print("Start position: ", start_index)
        print("End position: ", start_index + end_index)
        print ("\n")

arr = ["Glasses", "Where can I throw my glasses", "Where can I throw my glass bottles", "I need to dump these glass bottles", "Where is the nearest place to throw glass?", "glasses should be trashed"]

eWaste = [
            "phone",
            "throw my phone away",
            "throw my telephone away",
            "throw my mobile phone away",
            "where do I recycle my mobile phone",


        ]
label = "light"

light = [
            "light bulbs",
            "lighting",
            "lights"
            "light",
            "Throw my light away",
            "recycle my lights",
            "dump my light bulbs",
        ]


findWord(light)
