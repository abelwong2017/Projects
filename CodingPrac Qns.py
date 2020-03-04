#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'strangeSort' function below.
#
# The function is expected to return a STRING_ARRAY.
# The function accepts following parameters:
#  1. INTEGER_ARRAY mapping
#  2. STRING_ARRAY nums
#

def strangeSort(mapping, nums):
    # Write your code here
    dictt = {};
    outputList = []

    
    for x in nums:
        outputString = ""
        for char in x:

            if char in dictt:
                outputString += dictt[char]
                continue;
            try:
                intNum = int(char)
                position = mapping.index(intNum)
                outputString += str(position)
                dictt[char] = str(position)
            except ValueError:
                print("error")
                print(char)
        
        print("this is output")
        print (outputString)
        outputString = int(outputString)
        outputList.append(str(outputString))

    print(outputList)
    return outputList


strangeSort([3,4,5,6,2], ["234", "345"])