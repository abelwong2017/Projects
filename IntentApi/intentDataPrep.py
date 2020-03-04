import json
import csv

questions = []
information = []

questions.append("I want to dispose my tupperware")
questions.append("Where is the nearest recycle bin?")
questions.append("How do I get to the nearest dustbin?")
questions.append("Point me to a place where I can throw my nonsense")


information.append("I want to find out more about reusing my containers")
information.append("Tell me more about 3Rs")
information.append("Search about containers")
information.append("What is a glass?")



file=open("intent_data.csv","w")
file.write('class,question\n')
for x in questions:
    file.write('disposalOrLocation, '+x+"\n")	 

for y in information:
    file.write('information, '+y+"\n")

file.close()
