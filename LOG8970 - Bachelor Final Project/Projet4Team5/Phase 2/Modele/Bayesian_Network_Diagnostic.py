#Function to generate all possibilities
def generateTableOfProbabilities(values, truthValue, probTruePositive, probTrueNegative):
        index = []
        maxIndex = []

        #Init maxIndex
        for indexOfValue, value in enumerate(values):
                maxIndex.append(len(value) - 1)

        #init index
        for i in range(0, len(values)):
                index.append(0)

        table = []
        positionInIndex = len(index) - 1
        isFinish = False
        while(not(isFinish)):
                line = []
                for i in range(0, len(index)):
                        line.append(values[i][index[i]])
                table.append(line)

                #Check if final state
                allIsFinal = True
                for i, index_i in enumerate(index):
                    if(index_i != maxIndex[i]):
                        allIsFinal = False
                if(allIsFinal == True):
                    isFinish = True
                
                else :
                    #increase index
                    if(index[positionInIndex] < maxIndex[positionInIndex]):
                            index[positionInIndex] += 1
                    elif(index[positionInIndex] == maxIndex[positionInIndex]):
                            indexToIncrease = len(index) - 1
                            isFound = False
                            while(indexToIncrease >= 0 and not isFound):
                                if index[indexToIncrease] < maxIndex[indexToIncrease]:
                                    isFound = True
                                else:
                                    indexToIncrease -= 1
                            if isFound :
                                index[indexToIncrease] += 1
                                for i in range(indexToIncrease + 1, len(index)):
                                    index[i] = 0
                            else :
                                  isFinish = True
        for line in table:
            #print(line[:-2])
            if (line[:-1] in truthValue):
                if(line[-1] == 'T'):
                    line.append(probTruePositive)
                elif(line[-1] == 'F'):
                    line.append(1 - probTruePositive)
            elif(line[len(line)-1] == 'F'):
                line.append(probTrueNegative)
            elif(line[len(line)-1] == 'T'):
                line.append(1- probTrueNegative)
        return table

values = [
          ['a', 'b', 'c'],
          ['F', 'T'],
          ['F', 'T']
]

truthValue = [
              #[QS3, QS4, E1A, E9_HABI, E10_HABI, E9_REF, E10_REF]
              ['b', 'T', 'T', 'T', 'T', 'F', 'F' ],
              ['c', 'T', 'T', 'T', 'T', 'F', 'F' ],
              ['b', 'T', 'T', 'T', 'F', 'F', 'F' ],
              ['b', 'T', 'T', 'F', 'T', 'F', 'F' ],
              ['c', 'T', 'T', 'T', 'F', 'F', 'F' ],
              ['c', 'T', 'T', 'F', 'T', 'F', 'F' ]
]

generateTableOfProbabilities()