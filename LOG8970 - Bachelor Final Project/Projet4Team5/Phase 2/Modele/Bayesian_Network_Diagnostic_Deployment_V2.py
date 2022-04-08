from pomegranate import *
import json
import os
import pandas as pd
import numpy as np
import math
from sklearn.metrics import accuracy_score
from sklearn.metrics import hamming_loss
from sklearn.metrics import jaccard_similarity_score
from sklearn.metrics import f1_score
import sys

def loadModel():
    model = BayesianNetwork("Diagnostic")

    QS4A = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS4B = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS4C = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS4D = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS4 = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 'T', 0.01],
            ['F', 'F', 'F', 'T', 'T', 0.90],
            ['F', 'F', 'T', 'F', 'T', 0.90],
            ['F', 'F', 'T', 'T', 'T', 0.92],
            ['F', 'T', 'F', 'F', 'T', 0.90],
            ['F', 'T', 'F', 'T', 'T', 0.92],
            ['F', 'T', 'T', 'F', 'T', 0.92],
            ['F', 'T', 'T', 'T', 'T', 0.95],
            ['T', 'F', 'F', 'F', 'T', 0.90],
            ['T', 'F', 'F', 'T', 'T', 0.92],
            ['T', 'F', 'T', 'F', 'T', 0.92],
            ['T', 'F', 'T', 'T', 'T', 0.95],
            ['T', 'T', 'F', 'F', 'T', 0.92],
            ['T', 'T', 'F', 'T', 'T', 0.95],
            ['T', 'T', 'T', 'F', 'T', 0.95],
            ['T', 'T', 'T', 'T', 'T', 0.99],
            
            ['F', 'F', 'F', 'F', 'F', 1],
            ['F', 'F', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'F', 'F', 0.01],
            ['F', 'F', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'F', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'T', 'T', 'F', 0.01],
            ['T', 'F', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'F', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'T', 'T', 'F', 0.01]], [QS4A, QS4B, QS4C, QS4D])

    S_QS4A = State(QS4A, name="QS4A")
    S_QS4B = State(QS4B, name="QS4B")
    S_QS4C = State(QS4C, name="QS4C")
    S_QS4D = State(QS4D, name="QS4D")
    S_QS4 = State(QS4, name="QS4")

    ######################################################################################################

    QS3 = DiscreteDistribution({'a': 1./3, 'b': 1./3, 'c': 1./3})

    S_QS3 = State(QS3, name="QS3")

    ######################################################################################################

    HistoriqueDouleur = ConditionalProbabilityTable(
            [
            ['a', 'F', 'F', 0.99],
            ['a', 'F', 'T', 0.01],
            ['a', 'T', 'F', 0.99],
            ['a', 'T', 'T', 0.01],
            ['b', 'F', 'F', 0.99],
            ['b', 'F', 'T', 0.01],
            ['b', 'T', 'F', 0.1],
            ['b', 'T', 'T', 0.8],
            ['c', 'F', 'F', 0.99],
            ['c', 'F', 'T', 0.01],
            ['c', 'T', 'F', 0.1],
            ['c', 'T', 'T', 0.9]
            ], [QS3, QS4])



    S_HistoriqueDouleur = State(HistoriqueDouleur, name="HistoriqueDouleur")


    ######################################################################################################

    E4B_HAB_R = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E4B_HAB_L = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E4C_HAB_R = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E4C_HAB_L = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_HAB_ZONE_SUB_REGION1 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_HAB_ZONE_SUB_REGION2 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_HAB_ZONE_SUB_REGION3 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E10_HAB_R = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E10_HAB_L = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E4B_HAB_R = State(E4B_HAB_R, name="E4B_HAB_R")
    S_E4B_HAB_L = State(E4B_HAB_L, name="E4B_HAB_L")
    S_E4C_HAB_R = State(E4C_HAB_R, name="E4C_HAB_R")
    S_E4C_HAB_L = State(E4C_HAB_L, name="E4C_HAB_L")
    S_E9_HAB_ZONE_SUB_REGION1 = State(E9_HAB_ZONE_SUB_REGION1, name="E9_HAB_ZONE_SUB_REGION1")
    S_E9_HAB_ZONE_SUB_REGION2 = State(E9_HAB_ZONE_SUB_REGION2, name="E9_HAB_ZONE_SUB_REGION2")
    S_E9_HAB_ZONE_SUB_REGION3 = State(E9_HAB_ZONE_SUB_REGION3, name="E9_HAB_ZONE_SUB_REGION3")
    S_E10_HAB_R = State(E10_HAB_R, name="E10_HAB_R")
    S_E10_HAB_L = State(E10_HAB_L, name="E10_HAB_L")



    E4B_HAB = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.99],
            ['T', 'F', 'F', 0.99],
            ['T', 'F', 'T', 0.99],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E4B_HAB_R, E4B_HAB_L])

    S_E4B_HAB = State(E4B_HAB, name="E4B_HAB")


    E4C_HAB = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.99],
            ['T', 'F', 'F', 0.99],
            ['T', 'F', 'T', 0.99],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E4C_HAB_R, E4C_HAB_L])

    S_E4C_HAB = State(E4C_HAB, name="E4C_HAB")


    E9_HAB = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 0.9],
            ['F', 'F', 'F', 'T', 0.1],
            ['F', 'F', 'T', 'F', 0.1],
            ['F', 'F', 'T', 'T', 0.9],
            ['F', 'T', 'F', 'F', 0.1],
            ['F', 'T', 'F', 'T', 0.9],
            ['F', 'T', 'T', 'F', 0.1],
            ['F', 'T', 'T', 'T', 0.9],
            ['T', 'F', 'F', 'F', 0.1],
            ['T', 'F', 'F', 'T', 0.9],
            ['T', 'F', 'T', 'F', 0.1],
            ['T', 'F', 'T', 'T', 0.9],
            ['T', 'T', 'F', 'F', 0.1],
            ['T', 'T', 'F', 'T', 0.9],
            ['T', 'T', 'T', 'F', 0.1],
            ['T', 'T', 'T', 'T', 0.9]
            ], [E9_HAB_ZONE_SUB_REGION1, E9_HAB_ZONE_SUB_REGION2, E9_HAB_ZONE_SUB_REGION3])

    S_E9_HAB = State(E9_HAB, name="E9_HAB")

    E10_HAB = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.99],
            ['T', 'F', 'F', 0.99],
            ['T', 'F', 'T', 0.99],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E10_HAB_R, E10_HAB_L])

    S_E10_HAB = State(E10_HAB, name="E10_HAB")

    DouleurHabituelle = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'F', 'T', 'T', 0.99],
            ['F', 'F', 'T', 'F', 'F', 0.01],
            ['F', 'F', 'T', 'F', 'T', 0.99],
            ['F', 'F', 'T', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'T', 'T', 0.99],
            ['F', 'T', 'F', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'F', 'T', 0.99],
            ['F', 'T', 'F', 'T', 'F', 0.01],
            ['F', 'T', 'F', 'T', 'T', 0.99],
            ['F', 'T', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'T', 'F', 'T', 0.99],
            ['F', 'T', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'T', 'T', 0.99],
            ['T', 'F', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'F', 'T', 0.99],
            ['T', 'F', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'F', 'T', 'T', 0.99],
            ['T', 'F', 'T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 'F', 'T', 0.99],
            ['T', 'F', 'T', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'T', 'T', 0.99],
            ['T', 'T', 'F', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'F', 'T', 0.99],
            ['T', 'T', 'F', 'T', 'F', 0.01],
            ['T', 'T', 'F', 'T', 'T', 0.99],
            ['T', 'T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'T', 'F', 'T', 0.99],
            ['T', 'T', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'T', 'T', 0.99]
            ], [E4B_HAB, E4C_HAB, E9_HAB, E10_HAB])

    S_DouleurHabituelle = State(DouleurHabituelle, name="DouleurHabituelle")

    E1A = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    ZONE = DiscreteDistribution({'MAST': 0.5, 'ATM': 0.5})

    S_E1A = State(E1A, name="E1A")
    S_ZONE = State(ZONE, name="ZONE")

    MYALGIE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'MAST', 'F', 'F', 0.99],
            ['F', 'F', 'MAST', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'T', 'F', 0.99],
            ['F', 'F', 'MAST', 'T', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'F', 'F', 0.99],
            ['F', 'F', 'ATM', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'T', 'F', 0.99],
            ['F', 'F', 'ATM', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'F', 'F', 0.99],
            ['F', 'T', 'MAST', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'T', 'F', 0.99],
            ['F', 'T', 'MAST', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'F', 'F', 0.99],
            ['F', 'T', 'ATM', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'T', 'F', 0.99],
            ['F', 'T', 'ATM', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'F', 'F', 0.99],
            ['T', 'F', 'MAST', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'T', 'F', 0.99],
            ['T', 'F', 'MAST', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'F', 'F', 0.99],
            ['T', 'F', 'ATM', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'T', 'F', 0.99],
            ['T', 'F', 'ATM', 'T', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'F', 'F', 0.99],
            ['T', 'T', 'MAST', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'T', 'F', 0.1],
            ['T', 'T', 'MAST', 'T', 'T', 0.90],
            ['T', 'T', 'ATM', 'F', 'F', 0.99],
            ['T', 'T', 'ATM', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'ATM', 'T', 'F', 0.99],
            ['T', 'T', 'ATM', 'T', 'T', 0.010000000000000009] 
            ], [HistoriqueDouleur, E1A, ZONE, DouleurHabituelle])

    S_MYALGIE = State(MYALGIE, name="MYALGIE")

    ######################################################################################################

    DOUL_HAB_PALP = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.90],
            ['T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 0.90],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E9_HAB, E10_HAB])

    S_DOUL_HAB_PALP = State(DOUL_HAB_PALP, name="DOUL_HAB_PALP")

    E9_REF_ZONE_SUB_REGION1 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_REF_ZONE_SUB_REGION2 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_REF_ZONE_SUB_REGION3 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E10_REF_R = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E10_REF_L = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E9_REF_ZONE_SUB_REGION1 = State(E9_REF_ZONE_SUB_REGION1, name="E9_REF_ZONE_SUB_REGION1")
    S_E9_REF_ZONE_SUB_REGION2 = State(E9_REF_ZONE_SUB_REGION2, name="E9_REF_ZONE_SUB_REGION2")
    S_E9_REF_ZONE_SUB_REGION3 = State(E9_REF_ZONE_SUB_REGION3, name="E9_REF_ZONE_SUB_REGION3")
    S_E10_REF_R = State(E10_REF_R, name="E10_REF_R")
    S_E10_REF_L = State(E10_REF_L, name="E10_REF_L")

    E9_REF = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 0.9],
            ['F', 'F', 'F', 'T', 0.1],
            ['F', 'F', 'T', 'F', 0.1],
            ['F', 'F', 'T', 'T', 0.9],
            ['F', 'T', 'F', 'F', 0.1],
            ['F', 'T', 'F', 'T', 0.9],
            ['F', 'T', 'T', 'F', 0.1],
            ['F', 'T', 'T', 'T', 0.9],
            ['T', 'F', 'F', 'F', 0.1],
            ['T', 'F', 'F', 'T', 0.9],
            ['T', 'F', 'T', 'F', 0.1],
            ['T', 'F', 'T', 'T', 0.9],
            ['T', 'T', 'F', 'F', 0.1],
            ['T', 'T', 'F', 'T', 0.9],
            ['T', 'T', 'T', 'F', 0.1],
            ['T', 'T', 'T', 'T', 0.9]
            ], [E9_REF_ZONE_SUB_REGION1, E9_REF_ZONE_SUB_REGION2, E9_REF_ZONE_SUB_REGION3])

    S_E9_REF = State(E9_REF, name="E9_REF")

    E10_REF = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.90],
            ['T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 0.90],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E10_REF_R, E10_REF_L])

    S_E10_REF = State(E10_REF, name="E10_REF")

    DOUL_REF = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.90],
            ['T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 0.90],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E9_REF, E10_REF])

    S_DOUL_REF = State(DOUL_REF, name="DOUL_REF")


    MYALGIE_LOCALE = ConditionalProbabilityTable(
            [
            ['MAST','F', 'F', 'F', 'F', 'F', 0.99],
            ['MAST','F', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST','F', 'F', 'F', 'T', 'F', 0.99],
            ['MAST','F', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST','F', 'F', 'T', 'F', 'F', 0.99],
            ['MAST','F', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST','F', 'F', 'T', 'T', 'F', 0.99],
            ['MAST','F', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST','F', 'T', 'F', 'F', 'F', 0.99],
            ['MAST','F', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST','F', 'T', 'F', 'T', 'F', 0.99],
            ['MAST','F', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST','F', 'T', 'T', 'F', 'F', 0.99],
            ['MAST','F', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST','F', 'T', 'T', 'T', 'F', 0.99],
            ['MAST','F', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST','T', 'F', 'F', 'F', 'F', 0.99],
            ['MAST','T', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST','T', 'F', 'F', 'T', 'F', 0.99],
            ['MAST','T', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST','T', 'F', 'T', 'F', 'F', 0.99],
            ['MAST','T', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST','T', 'F', 'T', 'T', 'F', 0.99],
            ['MAST','T', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST','T', 'T', 'F', 'F', 'F', 0.99],
            ['MAST','T', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST','T', 'T', 'F', 'T', 'F', 0.99],
            ['MAST','T', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST','T', 'T', 'T', 'F', 'F', 0.09999999999999998],
            ['MAST','T', 'T', 'T', 'F', 'T', 0.9],
            ['MAST','T', 'T', 'T', 'T', 'F', 0.99],
            ['MAST','T', 'T', 'T', 'T', 'T', 0.010000000000000009],

            ['ATM','F', 'F', 'F', 'F', 'F', 0.99],
            ['ATM','F', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM','F', 'F', 'F', 'T', 'F', 0.99],
            ['ATM','F', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM','F', 'F', 'T', 'F', 'F', 0.99],
            ['ATM','F', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM','F', 'F', 'T', 'T', 'F', 0.99],
            ['ATM','F', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM','F', 'T', 'F', 'F', 'F', 0.99],
            ['ATM','F', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM','F', 'T', 'F', 'T', 'F', 0.99],
            ['ATM','F', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM','F', 'T', 'T', 'F', 'F', 0.99],
            ['ATM','F', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM','F', 'T', 'T', 'T', 'F', 0.99],
            ['ATM','F', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM','T', 'F', 'F', 'F', 'F', 0.99],
            ['ATM','T', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM','T', 'F', 'F', 'T', 'F', 0.99],
            ['ATM','T', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM','T', 'F', 'T', 'F', 'F', 0.99],
            ['ATM','T', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM','T', 'F', 'T', 'T', 'F', 0.99],
            ['ATM','T', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM','T', 'T', 'F', 'F', 'F', 0.99],
            ['ATM','T', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM','T', 'T', 'F', 'T', 'F', 0.99],
            ['ATM','T', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM','T', 'T', 'T', 'F', 'F', 0.09999999999999998],
            ['ATM','T', 'T', 'T', 'F', 'T', 0.01],
            ['ATM','T', 'T', 'T', 'T', 'F', 0.99],
            ['ATM','T', 'T', 'T', 'T', 'T', 0.010000000000000009]
            ], [ZONE, HistoriqueDouleur, E1A, DOUL_HAB_PALP, DOUL_REF]) 


    S_MYALGIE_LOCALE = State(MYALGIE_LOCALE, name="MYALGIE_LOCALE")

    ######################################################################################################

    DOULEUR_MYOFASCIALE_AVEC_REF = ConditionalProbabilityTable(
            [
            ['MAST','F', 'F', 'F', 'F', 'F', 0.98],
            ['MAST','F', 'F', 'F', 'F', 'T', 0.020000000000000018],
            ['MAST','F', 'F', 'F', 'T', 'F', 0.98],
            ['MAST','F', 'F', 'F', 'T', 'T', 0.020000000000000018],
            ['MAST','F', 'F', 'T', 'F', 'F', 0.98],
            ['MAST','F', 'F', 'T', 'F', 'T', 0.020000000000000018],
            ['MAST','F', 'F', 'T', 'T', 'F', 0.98],
            ['MAST','F', 'F', 'T', 'T', 'T', 0.020000000000000018],
            ['MAST','F', 'T', 'F', 'F', 'F', 0.98],
            ['MAST','F', 'T', 'F', 'F', 'T', 0.020000000000000018],
            ['MAST','F', 'T', 'F', 'T', 'F', 0.98],
            ['MAST','F', 'T', 'F', 'T', 'T', 0.020000000000000018],
            ['MAST','F', 'T', 'T', 'F', 'F', 0.98],
            ['MAST','F', 'T', 'T', 'F', 'T', 0.020000000000000018],
            ['MAST','F', 'T', 'T', 'T', 'F', 0.98],
            ['MAST','F', 'T', 'T', 'T', 'T', 0.020000000000000018],
            ['MAST','T', 'F', 'F', 'F', 'F', 0.98],
            ['MAST','T', 'F', 'F', 'F', 'T', 0.020000000000000018],
            ['MAST','T', 'F', 'F', 'T', 'F', 0.98],
            ['MAST','T', 'F', 'F', 'T', 'T', 0.020000000000000018],
            ['MAST','T', 'F', 'T', 'F', 'F', 0.98],
            ['MAST','T', 'F', 'T', 'F', 'T', 0.020000000000000018],
            ['MAST','T', 'F', 'T', 'T', 'F', 0.98],
            ['MAST','T', 'F', 'T', 'T', 'T', 0.020000000000000018],
            ['MAST','T', 'T', 'F', 'F', 'F', 0.98],
            ['MAST','T', 'T', 'F', 'F', 'T', 0.020000000000000018],
            ['MAST','T', 'T', 'F', 'T', 'F', 0.98],
            ['MAST','T', 'T', 'F', 'T', 'T', 0.020000000000000018],
            ['MAST','T', 'T', 'T', 'F', 'F', 0.98],
            ['MAST','T', 'T', 'T', 'F', 'T', 0.020000000000000018],
            ['MAST','T', 'T', 'T', 'T', 'F', 0.14],
            ['MAST','T', 'T', 'T', 'T', 'T', 0.86],


            ['ATM','F', 'F', 'F', 'F', 'F', 0.98],
            ['ATM','F', 'F', 'F', 'F', 'T', 0.020000000000000018],
            ['ATM','F', 'F', 'F', 'T', 'F', 0.98],
            ['ATM','F', 'F', 'F', 'T', 'T', 0.020000000000000018],
            ['ATM','F', 'F', 'T', 'F', 'F', 0.98],
            ['ATM','F', 'F', 'T', 'F', 'T', 0.020000000000000018],
            ['ATM','F', 'F', 'T', 'T', 'F', 0.98],
            ['ATM','F', 'F', 'T', 'T', 'T', 0.020000000000000018],
            ['ATM','F', 'T', 'F', 'F', 'F', 0.98],
            ['ATM','F', 'T', 'F', 'F', 'T', 0.020000000000000018],
            ['ATM','F', 'T', 'F', 'T', 'F', 0.98],
            ['ATM','F', 'T', 'F', 'T', 'T', 0.020000000000000018],
            ['ATM','F', 'T', 'T', 'F', 'F', 0.98],
            ['ATM','F', 'T', 'T', 'F', 'T', 0.020000000000000018],
            ['ATM','F', 'T', 'T', 'T', 'F', 0.98],
            ['ATM','F', 'T', 'T', 'T', 'T', 0.020000000000000018],
            ['ATM','T', 'F', 'F', 'F', 'F', 0.98],
            ['ATM','T', 'F', 'F', 'F', 'T', 0.020000000000000018],
            ['ATM','T', 'F', 'F', 'T', 'F', 0.98],
            ['ATM','T', 'F', 'F', 'T', 'T', 0.020000000000000018],
            ['ATM','T', 'F', 'T', 'F', 'F', 0.98],
            ['ATM','T', 'F', 'T', 'F', 'T', 0.020000000000000018],
            ['ATM','T', 'F', 'T', 'T', 'F', 0.98],
            ['ATM','T', 'F', 'T', 'T', 'T', 0.020000000000000018],
            ['ATM','T', 'T', 'F', 'F', 'F', 0.98],
            ['ATM','T', 'T', 'F', 'F', 'T', 0.020000000000000018],
            ['ATM','T', 'T', 'F', 'T', 'F', 0.98],
            ['ATM','T', 'T', 'F', 'T', 'T', 0.020000000000000018],
            ['ATM','T', 'T', 'T', 'F', 'F', 0.98],
            ['ATM','T', 'T', 'T', 'F', 'T', 0.020000000000000018],
            ['ATM','T', 'T', 'T', 'T', 'F', 0.98],
            ['ATM','T', 'T', 'T', 'T', 'T', 0.02]
            ], [ZONE, HistoriqueDouleur, E1A, DOUL_HAB_PALP, DOUL_REF]) 


    S_DOULEUR_MYOFASCIALE_AVEC_REF = State(DOULEUR_MYOFASCIALE_AVEC_REF, name="DOULEUR_MYOFASCIALE_AVEC_REF")


    ######################################################################################################




    E9_PROPA_ZONE_SUB_REGION1 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_PROPA_ZONE_SUB_REGION2 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_PROPA_ZONE_SUB_REGION3 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E10_PROPA_ZONE_SUB_REGION1 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E10_PROPA_ZONE_SUB_REGION2 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E10_PROPA_ZONE_SUB_REGION3 = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E9_PROPA_ZONE_SUB_REGION1 = State(E9_PROPA_ZONE_SUB_REGION1, name="E9_PROPA_ZONE_SUB_REGION1")
    S_E9_PROPA_ZONE_SUB_REGION2 = State(E9_PROPA_ZONE_SUB_REGION2, name="E9_PROPA_ZONE_SUB_REGION2")
    S_E9_PROPA_ZONE_SUB_REGION3 = State(E9_PROPA_ZONE_SUB_REGION3, name="E9_PROPA_ZONE_SUB_REGION3")
    S_E10_PROPA_ZONE_SUB_REGION1 = State(E10_PROPA_ZONE_SUB_REGION1, name="E10_PROPA_ZONE_SUB_REGION1")
    S_E10_PROPA_ZONE_SUB_REGION2 = State(E10_PROPA_ZONE_SUB_REGION2, name="E10_PROPA_ZONE_SUB_REGION2")
    S_E10_PROPA_ZONE_SUB_REGION3 = State(E10_PROPA_ZONE_SUB_REGION3, name="E10_PROPA_ZONE_SUB_REGION3")


    E9_PROPA = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'T', 'F', 0.99],
            ['F', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 'F', 0.99],
            ['F', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'T', 0.90],
            ['T', 'F', 'F', 'F', 0.7],
            ['T', 'F', 'F', 'T', 0.3],
            ['T', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'T', 0.90],
            ['T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'T', 0.90],
            ['T', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'T', 0.99]
            ], [E9_PROPA_ZONE_SUB_REGION1, E9_PROPA_ZONE_SUB_REGION2, E9_PROPA_ZONE_SUB_REGION3])

    S_E9_PROPA = State(E9_PROPA, name="E9_PROPA")

    E10_PROPA = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'T', 'F', 0.99],
            ['F', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 'F', 0.99],
            ['F', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'T', 0.90],
            ['T', 'F', 'F', 'F', 0.7],
            ['T', 'F', 'F', 'T', 0.3],
            ['T', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'T', 0.90],
            ['T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'T', 0.90],
            ['T', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'T', 0.99]
            ], [E10_PROPA_ZONE_SUB_REGION1, E10_PROPA_ZONE_SUB_REGION2, E10_PROPA_ZONE_SUB_REGION3])

    S_E10_PROPA = State(E10_PROPA, name="E10_PROPA")

    DOUL_PROPAGATION = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.90],
            ['T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 0.90],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E9_PROPA, E10_PROPA])

    S_DOUL_PROPAGATION = State(DOUL_PROPAGATION, name="DOUL_PROPAGATION")

    DOULEUR_MYOFASCIALE = ConditionalProbabilityTable(
            [
            ['MAST', 'F', 'F', 'F', 'F', 'F', 'F', 0.99],
            ['MAST', 'F', 'F', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST', 'F', 'F', 'F', 'F', 'T', 'F', 0.99],
            ['MAST', 'F', 'F', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST', 'F', 'F', 'F', 'T', 'F', 'F', 0.99],
            ['MAST', 'F', 'F', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST', 'F', 'F', 'F', 'T', 'T', 'F', 0.99],
            ['MAST', 'F', 'F', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST', 'F', 'F', 'T', 'F', 'F', 'F', 0.99],
            ['MAST', 'F', 'F', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST', 'F', 'F', 'T', 'F', 'T', 'F', 0.99],
            ['MAST', 'F', 'F', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST', 'F', 'F', 'T', 'T', 'F', 'F', 0.99],
            ['MAST', 'F', 'F', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST', 'F', 'F', 'T', 'T', 'T', 'F', 0.99],
            ['MAST', 'F', 'F', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST', 'F', 'T', 'F', 'F', 'F', 'F', 0.99],
            ['MAST', 'F', 'T', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST', 'F', 'T', 'F', 'F', 'T', 'F', 0.99],
            ['MAST', 'F', 'T', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST', 'F', 'T', 'F', 'T', 'F', 'F', 0.99],
            ['MAST', 'F', 'T', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST', 'F', 'T', 'F', 'T', 'T', 'F', 0.99],
            ['MAST', 'F', 'T', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST', 'F', 'T', 'T', 'F', 'F', 'F', 0.99],
            ['MAST', 'F', 'T', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST', 'F', 'T', 'T', 'F', 'T', 'F', 0.99],
            ['MAST', 'F', 'T', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST', 'F', 'T', 'T', 'T', 'F', 'F', 0.99],
            ['MAST', 'F', 'T', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST', 'F', 'T', 'T', 'T', 'T', 'F', 0.99],
            ['MAST', 'F', 'T', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST', 'T', 'F', 'F', 'F', 'F', 'F', 0.99],
            ['MAST', 'T', 'F', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST', 'T', 'F', 'F', 'F', 'T', 'F', 0.99],
            ['MAST', 'T', 'F', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST', 'T', 'F', 'F', 'T', 'F', 'F', 0.99],
            ['MAST', 'T', 'F', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST', 'T', 'F', 'F', 'T', 'T', 'F', 0.99],
            ['MAST', 'T', 'F', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST', 'T', 'F', 'T', 'F', 'F', 'F', 0.99],
            ['MAST', 'T', 'F', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST', 'T', 'F', 'T', 'F', 'T', 'F', 0.99],
            ['MAST', 'T', 'F', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST', 'T', 'F', 'T', 'T', 'F', 'F', 0.99],
            ['MAST', 'T', 'F', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST', 'T', 'F', 'T', 'T', 'T', 'F', 0.99],
            ['MAST', 'T', 'F', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST', 'T', 'T', 'F', 'F', 'F', 'F', 0.99],
            ['MAST', 'T', 'T', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST', 'T', 'T', 'F', 'F', 'T', 'F', 0.99],
            ['MAST', 'T', 'T', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST', 'T', 'T', 'F', 'T', 'F', 'F', 0.99],
            ['MAST', 'T', 'T', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['MAST', 'T', 'T', 'F', 'T', 'T', 'F', 0.99],
            ['MAST', 'T', 'T', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['MAST', 'T', 'T', 'T', 'F', 'F', 'F', 0.99],
            ['MAST', 'T', 'T', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['MAST', 'T', 'T', 'T', 'F', 'T', 'F', 0.99],
            ['MAST', 'T', 'T', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['MAST', 'T', 'T', 'T', 'T', 'F', 'F', 0.09999999999999998],
            ['MAST', 'T', 'T', 'T', 'T', 'F', 'T', 0.9],
            ['MAST', 'T', 'T', 'T', 'T', 'T', 'F', 0.99],
            ['MAST', 'T', 'T', 'T', 'T', 'T', 'T', 0.010000000000000009],




            ['ATM', 'F', 'F', 'F', 'F', 'F', 'F', 0.99],
            ['ATM', 'F', 'F', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM', 'F', 'F', 'F', 'F', 'T', 'F', 0.99],
            ['ATM', 'F', 'F', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM', 'F', 'F', 'F', 'T', 'F', 'F', 0.99],
            ['ATM', 'F', 'F', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM', 'F', 'F', 'F', 'T', 'T', 'F', 0.99],
            ['ATM', 'F', 'F', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM', 'F', 'F', 'T', 'F', 'F', 'F', 0.99],
            ['ATM', 'F', 'F', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM', 'F', 'F', 'T', 'F', 'T', 'F', 0.99],
            ['ATM', 'F', 'F', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM', 'F', 'F', 'T', 'T', 'F', 'F', 0.99],
            ['ATM', 'F', 'F', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM', 'F', 'F', 'T', 'T', 'T', 'F', 0.99],
            ['ATM', 'F', 'F', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM', 'F', 'T', 'F', 'F', 'F', 'F', 0.99],
            ['ATM', 'F', 'T', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM', 'F', 'T', 'F', 'F', 'T', 'F', 0.99],
            ['ATM', 'F', 'T', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM', 'F', 'T', 'F', 'T', 'F', 'F', 0.99],
            ['ATM', 'F', 'T', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM', 'F', 'T', 'F', 'T', 'T', 'F', 0.99],
            ['ATM', 'F', 'T', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM', 'F', 'T', 'T', 'F', 'F', 'F', 0.99],
            ['ATM', 'F', 'T', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM', 'F', 'T', 'T', 'F', 'T', 'F', 0.99],
            ['ATM', 'F', 'T', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM', 'F', 'T', 'T', 'T', 'F', 'F', 0.99],
            ['ATM', 'F', 'T', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM', 'F', 'T', 'T', 'T', 'T', 'F', 0.99],
            ['ATM', 'F', 'T', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM', 'T', 'F', 'F', 'F', 'F', 'F', 0.99],
            ['ATM', 'T', 'F', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM', 'T', 'F', 'F', 'F', 'T', 'F', 0.99],
            ['ATM', 'T', 'F', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM', 'T', 'F', 'F', 'T', 'F', 'F', 0.99],
            ['ATM', 'T', 'F', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM', 'T', 'F', 'F', 'T', 'T', 'F', 0.99],
            ['ATM', 'T', 'F', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM', 'T', 'F', 'T', 'F', 'F', 'F', 0.99],
            ['ATM', 'T', 'F', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM', 'T', 'F', 'T', 'F', 'T', 'F', 0.99],
            ['ATM', 'T', 'F', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM', 'T', 'F', 'T', 'T', 'F', 'F', 0.99],
            ['ATM', 'T', 'F', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM', 'T', 'F', 'T', 'T', 'T', 'F', 0.99],
            ['ATM', 'T', 'F', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM', 'T', 'T', 'F', 'F', 'F', 'F', 0.99],
            ['ATM', 'T', 'T', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM', 'T', 'T', 'F', 'F', 'T', 'F', 0.99],
            ['ATM', 'T', 'T', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM', 'T', 'T', 'F', 'T', 'F', 'F', 0.99],
            ['ATM', 'T', 'T', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['ATM', 'T', 'T', 'F', 'T', 'T', 'F', 0.99],
            ['ATM', 'T', 'T', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['ATM', 'T', 'T', 'T', 'F', 'F', 'F', 0.99],
            ['ATM', 'T', 'T', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['ATM', 'T', 'T', 'T', 'F', 'T', 'F', 0.99],
            ['ATM', 'T', 'T', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['ATM', 'T', 'T', 'T', 'T', 'F', 'F', 0.99],
            ['ATM', 'T', 'T', 'T', 'T', 'F', 'T', 0.01],
            ['ATM', 'T', 'T', 'T', 'T', 'T', 'F', 0.99],
            ['ATM', 'T', 'T', 'T', 'T', 'T', 'T', 0.010000000000000009]
            ], [ZONE, HistoriqueDouleur, E1A, DOUL_HAB_PALP, DOUL_PROPAGATION, DOUL_REF]) 


    S_DOULEUR_MYOFASCIALE = State(DOULEUR_MYOFASCIALE, name="DOULEUR_MYOFASCIALE")

    ######################################################################################################



    E4_HAB = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.90],
            ['T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 0.90],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E4B_HAB, E4C_HAB])

    S_E4_HAB = State(E4_HAB, name="E4_HAB")

    E5A_HAB = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E5B_HAB = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E5C_HAB = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E5A_HAB = State(E5A_HAB, name="E5A_HAB")
    S_E5B_HAB = State(E5B_HAB, name="E5B_HAB")
    S_E5C_HAB = State(E5C_HAB, name="E5C_HAB")


    E5_HAB = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'T', 0.90],
            ['F', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'T', 0.90],
            ['F', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'T', 0.95],
            ['T', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'T', 0.9],
            ['T', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'T', 0.95],
            ['T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'T', 0.95],
            ['T', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'T', 0.99]
            ], [E5A_HAB, E5B_HAB, E5C_HAB])

    S_E5_HAB = State(E5_HAB, name="E5_HAB")

    ARTHRALGIE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'ATM', 'F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'ATM', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'F', 'F', 'T', 'F', 0.99],
            ['F', 'F', 'ATM', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'F', 'T', 'F', 'F', 0.99],
            ['F', 'F', 'ATM', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'F', 'T', 'T', 'F', 0.99],
            ['F', 'F', 'ATM', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'T', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'ATM', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'T', 'F', 'T', 'F', 0.99],
            ['F', 'F', 'ATM', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'T', 'T', 'F', 'F', 0.99],
            ['F', 'F', 'ATM', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'ATM', 'T', 'T', 'T', 'F', 0.99],
            ['F', 'F', 'ATM', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'MAST', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'F', 'F', 'T', 'F', 0.99],
            ['F', 'F', 'MAST', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'F', 'T', 'F', 'F', 0.99],
            ['F', 'F', 'MAST', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'F', 'T', 'T', 'F', 0.99],
            ['F', 'F', 'MAST', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'T', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'MAST', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'T', 'F', 'T', 'F', 0.99],
            ['F', 'F', 'MAST', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'T', 'T', 'F', 'F', 0.99],
            ['F', 'F', 'MAST', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'MAST', 'T', 'T', 'T', 'F', 0.99],
            ['F', 'F', 'MAST', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'F', 'F', 'F', 'F', 0.99],
            ['F', 'T', 'ATM', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'F', 'F', 'T', 'F', 0.99],
            ['F', 'T', 'ATM', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'F', 'T', 'F', 'F', 0.99],
            ['F', 'T', 'ATM', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'F', 'T', 'T', 'F', 0.99],
            ['F', 'T', 'ATM', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'T', 'F', 'F', 'F', 0.99],
            ['F', 'T', 'ATM', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'T', 'F', 'T', 'F', 0.99],
            ['F', 'T', 'ATM', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'T', 'T', 'F', 'F', 0.99],
            ['F', 'T', 'ATM', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'ATM', 'T', 'T', 'T', 'F', 0.99],
            ['F', 'T', 'ATM', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'F', 'F', 'F', 'F', 0.99],
            ['F', 'T', 'MAST', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'F', 'F', 'T', 'F', 0.99],
            ['F', 'T', 'MAST', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'F', 'T', 'F', 'F', 0.99],
            ['F', 'T', 'MAST', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'F', 'T', 'T', 'F', 0.99],
            ['F', 'T', 'MAST', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'T', 'F', 'F', 'F', 0.99],
            ['F', 'T', 'MAST', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'T', 'F', 'T', 'F', 0.99],
            ['F', 'T', 'MAST', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'T', 'T', 'F', 'F', 0.99],
            ['F', 'T', 'MAST', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'MAST', 'T', 'T', 'T', 'F', 0.99],
            ['F', 'T', 'MAST', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'F', 'F', 'F', 'F', 0.99],
            ['T', 'F', 'ATM', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'F', 'F', 'T', 'F', 0.99],
            ['T', 'F', 'ATM', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'F', 'T', 'F', 'F', 0.99],
            ['T', 'F', 'ATM', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'F', 'T', 'T', 'F', 0.99],
            ['T', 'F', 'ATM', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'T', 'F', 'F', 'F', 0.99],
            ['T', 'F', 'ATM', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'T', 'F', 'T', 'F', 0.99],
            ['T', 'F', 'ATM', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'T', 'T', 'F', 'F', 0.99],
            ['T', 'F', 'ATM', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'ATM', 'T', 'T', 'T', 'F', 0.99],
            ['T', 'F', 'ATM', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'F', 'F', 'F', 'F', 0.99],
            ['T', 'F', 'MAST', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'F', 'F', 'T', 'F', 0.99],
            ['T', 'F', 'MAST', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'F', 'T', 'F', 'F', 0.99],
            ['T', 'F', 'MAST', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'F', 'T', 'T', 'F', 0.99],
            ['T', 'F', 'MAST', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'T', 'F', 'F', 'F', 0.99],
            ['T', 'F', 'MAST', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'T', 'F', 'T', 'F', 0.99],
            ['T', 'F', 'MAST', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'T', 'T', 'F', 'F', 0.99],
            ['T', 'F', 'MAST', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'MAST', 'T', 'T', 'T', 'F', 0.99],
            ['T', 'F', 'MAST', 'T', 'T', 'T', 'T', 0.010000000000000009],
            ['T', 'T', 'ATM', 'F', 'F', 'F', 'F', 0.99],
            ['T', 'T', 'ATM', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'ATM', 'F', 'F', 'T', 'F', 0.09999999999999998],
            ['T', 'T', 'ATM', 'F', 'F', 'T', 'T', 0.9],
            ['T', 'T', 'ATM', 'F', 'T', 'F', 'F', 0.09999999999999998],
            ['T', 'T', 'ATM', 'F', 'T', 'F', 'T', 0.9],
            ['T', 'T', 'ATM', 'F', 'T', 'T', 'F', 0.09999999999999998],
            ['T', 'T', 'ATM', 'F', 'T', 'T', 'T', 0.9],
            ['T', 'T', 'ATM', 'T', 'F', 'F', 'F', 0.09999999999999998],
            ['T', 'T', 'ATM', 'T', 'F', 'F', 'T', 0.9],
            ['T', 'T', 'ATM', 'T', 'F', 'T', 'F', 0.09999999999999998],
            ['T', 'T', 'ATM', 'T', 'F', 'T', 'T', 0.9],
            ['T', 'T', 'ATM', 'T', 'T', 'F', 'F', 0.09999999999999998],
            ['T', 'T', 'ATM', 'T', 'T', 'F', 'T', 0.9],
            ['T', 'T', 'ATM', 'T', 'T', 'T', 'F', 0.09999999999999998],
            ['T', 'T', 'ATM', 'T', 'T', 'T', 'T', 0.9],
            ['T', 'T', 'MAST', 'F', 'F', 'F', 'F', 0.99],
            ['T', 'T', 'MAST', 'F', 'F', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'F', 'F', 'T', 'F', 0.99],
            ['T', 'T', 'MAST', 'F', 'F', 'T', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'F', 'T', 'F', 'F', 0.99],
            ['T', 'T', 'MAST', 'F', 'T', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'F', 'T', 'T', 'F', 0.99],
            ['T', 'T', 'MAST', 'F', 'T', 'T', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'T', 'F', 'F', 'F', 0.99],
            ['T', 'T', 'MAST', 'T', 'F', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'T', 'F', 'T', 'F', 0.99],
            ['T', 'T', 'MAST', 'T', 'F', 'T', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'T', 'T', 'F', 'F', 0.99],
            ['T', 'T', 'MAST', 'T', 'T', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'MAST', 'T', 'T', 'T', 'F', 0.99],
            ['T', 'T', 'MAST', 'T', 'T', 'T', 'T', 0.010000000000000009]
            ], [HistoriqueDouleur, E1A, ZONE, E4_HAB, E5_HAB , E9_HAB ])

    S_ARTHRALGIE = State(ARTHRALGIE, name="ARTHRALGIE")


    ######################################################################################################



    E1B = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    isTEMPORAL = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS5 = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E1B = State(E1B, name="E1B")
    S_isTEMPORAL = State(isTEMPORAL, name="isTEMPORAL")
    S_QS5 = State(QS5, name="QS5")


    QS7A = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS7B = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS7C = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS7D = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS7 = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 'T', 0.01],
            ['F', 'F', 'F', 'T', 'T', 0.90],
            ['F', 'F', 'T', 'F', 'T', 0.90],
            ['F', 'F', 'T', 'T', 'T', 0.92],
            ['F', 'T', 'F', 'F', 'T', 0.90],
            ['F', 'T', 'F', 'T', 'T', 0.92],
            ['F', 'T', 'T', 'F', 'T', 0.92],
            ['F', 'T', 'T', 'T', 'T', 0.95],
            ['T', 'F', 'F', 'F', 'T', 0.90],
            ['T', 'F', 'F', 'T', 'T', 0.92],
            ['T', 'F', 'T', 'F', 'T', 0.92],
            ['T', 'F', 'T', 'T', 'T', 0.95],
            ['T', 'T', 'F', 'F', 'T', 0.92],
            ['T', 'T', 'F', 'T', 'T', 0.95],
            ['T', 'T', 'T', 'F', 'T', 0.95],
            ['T', 'T', 'T', 'T', 'T', 0.99],
            
            ['F', 'F', 'F', 'F', 'F', 1],
            ['F', 'F', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'F', 'F', 0.01],
            ['F', 'F', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'F', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'T', 'T', 'F', 0.01],
            ['T', 'F', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'F', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'T', 'T', 'F', 0.01]], [QS7A, QS7B, QS7C, QS7D])

    S_QS7A = State(QS7A, name="QS7A")
    S_QS7B = State(QS7B, name="QS7B")
    S_QS7C = State(QS7C, name="QS7C")
    S_QS7D = State(QS7D, name="QS7D")
    S_QS7 = State(QS7, name="QS7")


    HISTORIQUE_MAL_DE_TETE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.99],
            ['F', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'F', 0.99],
            ['T', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [QS5, QS7])

    S_HISTORIQUE_MAL_DE_TETE = State(HISTORIQUE_MAL_DE_TETE, name="HISTORIQUE_MAL_DE_TETE")


    E5A_MAL_TETE = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E5B_MAL_TETE = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E5C_MAL_TETE = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E5A_MAL_TETE = State(E5A_MAL_TETE, name="E5A_MAL_TETE")
    S_E5B_MAL_TETE = State(E5B_MAL_TETE, name="E5B_MAL_TETE")
    S_E5C_MAL_TETE = State(E5C_MAL_TETE, name="E5C_MAL_TETE")

    E5_MAL_TETE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'T', 0.01],
            ['F', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'T', 0.99],
            ['F', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'T', 0.99],
            ['F', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'T', 0.99],
            ['T', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'T', 0.99],
            ['T', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'T', 0.99],
            ['T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'T', 0.01],
            ['T', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'T', 0.99]
            ], [E5A_MAL_TETE, E5B_MAL_TETE, E5C_MAL_TETE])


    S_E5_MAL_TETE = State(E5_MAL_TETE, name="E5_MAL_TETE")


    E9_MAL_TETE_ZONE1 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_MAL_TETE_ZONE2 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E9_MAL_TETE_ZONE3 = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E9_MAL_TETE_ZONE1 = State(E9_MAL_TETE_ZONE1, name="E9_MAL_TETE_ZONE1")
    S_E9_MAL_TETE_ZONE2 = State(E9_MAL_TETE_ZONE2, name="E9_MAL_TETE_ZONE2")
    S_E9_MAL_TETE_ZONE3 = State(E9_MAL_TETE_ZONE3, name="E9_MAL_TETE_ZONE3")

    E9_MAL_TETE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'T', 0.01],
            ['F', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'T', 0.99],
            ['F', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'T', 0.99],
            ['F', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'T', 0.99],
            ['T', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'T', 0.99],
            ['T', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'T', 0.99],
            ['T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'T', 0.01],
            ['T', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'T', 0.99]
            ], [E9_MAL_TETE_ZONE1, E9_MAL_TETE_ZONE2, E9_MAL_TETE_ZONE3])

    S_E9_MAL_TETE = State(E9_MAL_TETE, name="E9_MAL_TETE")


    E4B_MAL_TETE = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E4C_MAL_TETE = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E4B_MAL_TETE = State(E4B_MAL_TETE, name="E4B_MAL_TETE")
    S_E4C_MAL_TETE= State(E4C_MAL_TETE, name="E4C_MAL_TETE")

    E4_MAL_TETE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 0.99],
            ['T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 0.99],
            ['T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 0.99]
            ], [E4B_MAL_TETE, E4C_MAL_TETE])

    S_E4_MAL_TETE= State(E4_MAL_TETE, name="E4_MAL_TETE")

    MYALGIE_FAMILY = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 'F', 0.1],
            ['F', 'F', 'F', 'F', 'T', 0.9],
            ['F', 'F', 'F', 'T', 'F', 0.1],
            ['F', 'F', 'F', 'T', 'T', 0.9],
            ['F', 'F', 'T', 'F', 'F', 0.1],
            ['F', 'F', 'T', 'F', 'T', 0.9],
            ['F', 'F', 'T', 'T', 'F', 0.1],
            ['F', 'F', 'T', 'T', 'T', 0.9],
            ['F', 'T', 'F', 'F', 'F', 0.1],
            ['F', 'T', 'F', 'F', 'T', 0.9],
            ['F', 'T', 'F', 'T', 'F', 0.1],
            ['F', 'T', 'F', 'T', 'T', 0.9],
            ['F', 'T', 'T', 'F', 'F', 0.1],
            ['F', 'T', 'T', 'F', 'T', 0.9],
            ['F', 'T', 'T', 'T', 'F', 0.1],
            ['F', 'T', 'T', 'T', 'T', 0.9],
            ['T', 'F', 'F', 'F', 'F', 0.1],
            ['T', 'F', 'F', 'F', 'T', 0.9],
            ['T', 'F', 'F', 'T', 'F', 0.1],
            ['T', 'F', 'F', 'T', 'T', 0.9],
            ['T', 'F', 'T', 'F', 'F', 0.1],
            ['T', 'F', 'T', 'F', 'T', 0.9],
            ['T', 'F', 'T', 'T', 'F', 0.1],
            ['T', 'F', 'T', 'T', 'T', 0.9],
            ['T', 'T', 'F', 'F', 'F', 0.1],
            ['T', 'T', 'F', 'F', 'T', 0.9],
            ['T', 'T', 'F', 'T', 'F', 0.1],
            ['T', 'T', 'F', 'T', 'T', 0.9],
            ['T', 'T', 'T', 'F', 'F', 0.1],
            ['T', 'T', 'T', 'F', 'T', 0.9],
            ['T', 'T', 'T', 'T', 'F', 0.1],
            ['T', 'T', 'T', 'T', 'T', 0.9]
            ], [MYALGIE, MYALGIE_LOCALE, DOULEUR_MYOFASCIALE, DOULEUR_MYOFASCIALE_AVEC_REF])

    S_MYALGIE_FAMILY= State(MYALGIE_FAMILY, name="MYALGIE_FAMILY")

    DOULEUR_MAL_TETE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'F', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'F', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'F', 'T', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'F', 'T', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'F', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'F', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'F', 'T', 'T', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'F', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'F', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'F', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'F', 'T', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'F', 'T', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'F', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'F', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['F', 'T', 'T', 'T', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['F', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'F', 0.10999999999999999],
            ['F', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 0.89],
            ['T', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'F', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'F', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'F', 'T', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'F', 'T', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'F', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'F', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'F', 'T', 'T', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'F', 'T', 'T', 'T', 'T', 'T', 'T', 'F', 0.10999999999999999],
            ['T', 'F', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 0.89],
            ['T', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'F', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'F', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'F', 'T', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'F', 'T', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'F', 'T', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'F', 'T', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'F', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'F', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'F', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'F', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'F', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'F', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'F', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'F', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'F', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'F', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'F', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'T', 'F', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'T', 'F', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'T', 'F', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'T', 'F', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'T', 'F', 'T', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'T', 'F', 'T', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'T', 'T', 'F', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'T', 'T', 'F', 'T', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'T', 'T', 'F', 'T', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'F', 'F', 0.87],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'F', 'T', 0.13],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'F', 0.10999999999999999],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 0.89]
            ], [MYALGIE_FAMILY, ARTHRALGIE, HISTORIQUE_MAL_DE_TETE, E4_MAL_TETE, E5_MAL_TETE, E9_MAL_TETE, E1B, isTEMPORAL])

    S_DOULEUR_MAL_TETE= State(DOULEUR_MAL_TETE, name="DOULEUR_MAL_TETE")

    ######################################################################################################



    QS8 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E6_CRAQUE_PATIENT = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E6_CREPITE_PATIENT = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E7_CRAQUE_PATIENT = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E7_CREPITE_PATIENT = DiscreteDistribution({'T': 0.5, 'F': 0.5})


    S_QS8= State(QS8, name="QS8")
    S_E6_CRAQUE_PATIENT= State(E6_CRAQUE_PATIENT, name="E6_CRAQUE_PATIENT")
    S_E6_CREPITE_PATIENT= State(E6_CREPITE_PATIENT, name="E6_CREPITE_PATIENT")
    S_E7_CRAQUE_PATIENT= State(E7_CRAQUE_PATIENT, name="E7_CRAQUE_PATIENT")
    S_E7_CREPITE_PATIENT= State(E7_CREPITE_PATIENT, name="E7_CREPITE_PATIENT")

    HISTORIQUE_BRUIT = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'F', 'F', 'T', 0.01],
            ['F', 'F', 'F', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'F', 'F', 'T', 'T', 0.99],
            ['F', 'F', 'F', 'T', 'F', 'F', 0.01],
            ['F', 'F', 'F', 'T', 'F', 'T', 0.99],
            ['F', 'F', 'F', 'T', 'T', 'F', 0.01],
            ['F', 'F', 'F', 'T', 'T', 'T', 0.99],
            ['F', 'F', 'T', 'F', 'F', 'F', 0.01],
            ['F', 'F', 'T', 'F', 'F', 'T', 0.99],
            ['F', 'F', 'T', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'F', 'T', 'T', 0.99],
            ['F', 'F', 'T', 'T', 'F', 'F', 0.01],
            ['F', 'F', 'T', 'T', 'F', 'T', 0.99],
            ['F', 'F', 'T', 'T', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'T', 'T', 'T', 0.99],
            ['F', 'T', 'F', 'F', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'F', 'F', 'T', 0.99],
            ['F', 'T', 'F', 'F', 'T', 'F', 0.01],
            ['F', 'T', 'F', 'F', 'T', 'T', 0.99],
            ['F', 'T', 'F', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'T', 'F', 'T', 0.99],
            ['F', 'T', 'F', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'F', 'T', 'T', 'T', 0.99],
            ['F', 'T', 'T', 'F', 'F', 'F', 0.01],
            ['F', 'T', 'T', 'F', 'F', 'T', 0.99],
            ['F', 'T', 'T', 'F', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'F', 'T', 'T', 0.99],
            ['F', 'T', 'T', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'T', 'T', 'F', 'T', 0.99],
            ['F', 'T', 'T', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'T', 'T', 'T', 0.99],
            ['T', 'F', 'F', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'F', 'F', 'T', 0.99],
            ['T', 'F', 'F', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'F', 'F', 'T', 'T', 0.99],
            ['T', 'F', 'F', 'T', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'T', 'F', 'T', 0.99],
            ['T', 'F', 'F', 'T', 'T', 'F', 0.01],
            ['T', 'F', 'F', 'T', 'T', 'T', 0.99],
            ['T', 'F', 'T', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'T', 'F', 'F', 'T', 0.99],
            ['T', 'F', 'T', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'F', 'T', 'T', 0.99],
            ['T', 'F', 'T', 'T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 'T', 'F', 'T', 0.99],
            ['T', 'F', 'T', 'T', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'T', 'T', 'T', 0.99],
            ['T', 'T', 'F', 'F', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'F', 'F', 'T', 0.99],
            ['T', 'T', 'F', 'F', 'T', 'F', 0.01],
            ['T', 'T', 'F', 'F', 'T', 'T', 0.99],
            ['T', 'T', 'F', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'T', 'F', 'T', 0.99],
            ['T', 'T', 'F', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'F', 'T', 'T', 'T', 0.99],
            ['T', 'T', 'T', 'F', 'F', 'F', 0.01],
            ['T', 'T', 'T', 'F', 'F', 'T', 0.99],
            ['T', 'T', 'T', 'F', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'F', 'T', 'T', 0.99],
            ['T', 'T', 'T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'T', 'T', 'F', 'T', 0.99],
            ['T', 'T', 'T', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'T', 'T', 'T', 0.99]
            ], [QS8, E6_CRAQUE_PATIENT, E6_CREPITE_PATIENT, E7_CRAQUE_PATIENT, E7_CREPITE_PATIENT])


    S_HISTORIQUE_BRUIT= State(HISTORIQUE_BRUIT, name="HISTORIQUE_BRUIT")



    E6_CRAQUE_OUVERT = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E6_CRAQUE_FERM = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E7_CRAQUE = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E6_CRAQUE_OUVERT = State(E6_CRAQUE_OUVERT, name="E6_CRAQUE_OUVERT")
    S_E6_CRAQUE_FERM= State(E6_CRAQUE_FERM, name="E6_CRAQUE_FERM")
    S_E7_CRAQUE= State(E7_CRAQUE, name="E7_CRAQUE")

    CRAQUEMENT = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'T', 0.010000000000000009],
            ['F', 'F', 'T', 'F', 0.99],
            ['F', 'F', 'T', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 'F', 0.99],
            ['F', 'T', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'T', 'F', 0.010000000000000009],
            ['F', 'T', 'T', 'T', 0.99],
            ['T', 'F', 'F', 'F', 0.99],
            ['T', 'F', 'F', 'T', 0.010000000000000009],
            ['T', 'F', 'T', 'F', 0.010000000000000009],
            ['T', 'F', 'T', 'T', 0.99],
            ['T', 'T', 'F', 'F', 0.010000000000000009],
            ['T', 'T', 'F', 'T', 0.99],
            ['T', 'T', 'T', 'F', 0.010000000000000009],
            ['T', 'T', 'T', 'T', 0.99]
            ], [E6_CRAQUE_OUVERT, E6_CRAQUE_FERM,  E7_CRAQUE])

    S_CRAQUEMENT = State(CRAQUEMENT, name="CRAQUEMENT")

    DEPLACEMENT_DISQUE_AVEC_REDUCTION = ConditionalProbabilityTable(
            [
            ['F', 'ATM', 'F', 'F', 0.92],
            ['F', 'ATM', 'F', 'T', 0.07999999999999996],
            ['F', 'ATM', 'T', 'F', 0.92],
            ['F', 'ATM', 'T', 'T', 0.07999999999999996],
            ['F', 'MAST', 'F', 'F', 0.92],
            ['F', 'MAST', 'F', 'T', 0.07999999999999996],
            ['F', 'MAST', 'T', 'F', 0.92],
            ['F', 'MAST', 'T', 'T', 0.07999999999999996],
            ['T', 'ATM', 'F', 'F', 0.92],
            ['T', 'ATM', 'F', 'T', 0.07999999999999996],
            ['T', 'ATM', 'T', 'F', 0.16000000000000003],
            ['T', 'ATM', 'T', 'T', 0.84],
            ['T', 'MAST', 'F', 'F', 0.92],
            ['T', 'MAST', 'F', 'T', 0.07999999999999996],
            ['T', 'MAST', 'T', 'F', 0.92],
            ['T', 'MAST', 'T', 'T', 0.07999999999999996]
            ], [HISTORIQUE_BRUIT, ZONE, CRAQUEMENT])

    S_DEPLACEMENT_DISQUE_AVEC_REDUCTION = State(DEPLACEMENT_DISQUE_AVEC_REDUCTION, name="DEPLACEMENT_DISQUE_AVEC_REDUCTION")



    ######################################################################################################



    QS11 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS12 = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_QS11 = State(QS11, name="QS11")
    S_QS12 = State(QS12, name="QS12")

    E8_BLOCAGE_OUVERT = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E8_BLOCAGE_OUVERT = State(E8_BLOCAGE_OUVERT, name="E8_BLOCAGE_OUVERT")

    BLOCAGE_INTERMITTENT = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.99],
            ['F', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'F', 0.010000000000000009],
            ['T', 'F', 'T', 0.99],
            ['T', 'T', 'F', 0.99],
            ['T', 'T', 'T', 0.010000000000000009]
            ], [QS11, QS12])

    S_BLOCAGE_INTERMITTENT = State(BLOCAGE_INTERMITTENT, name="BLOCAGE_INTERMITTENT")

    DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE = ConditionalProbabilityTable(
            [
            ['F', 'ATM', 'F', 'F', 'F', 'F', 0.98],
            ['F', 'ATM', 'F', 'F', 'F', 'T', 0.020000000000000018],
            ['F', 'ATM', 'F', 'F', 'T', 'F', 0.98],
            ['F', 'ATM', 'F', 'F', 'T', 'T', 0.020000000000000018],
            ['F', 'ATM', 'F', 'T', 'F', 'F', 0.98],
            ['F', 'ATM', 'F', 'T', 'F', 'T', 0.020000000000000018],
            ['F', 'ATM', 'F', 'T', 'T', 'F', 0.98],
            ['F', 'ATM', 'F', 'T', 'T', 'T', 0.020000000000000018],
            ['F', 'ATM', 'T', 'F', 'F', 'F', 0.98],
            ['F', 'ATM', 'T', 'F', 'F', 'T', 0.020000000000000018],
            ['F', 'ATM', 'T', 'F', 'T', 'F', 0.98],
            ['F', 'ATM', 'T', 'F', 'T', 'T', 0.020000000000000018],
            ['F', 'ATM', 'T', 'T', 'F', 'F', 0.98],
            ['F', 'ATM', 'T', 'T', 'F', 'T', 0.020000000000000018],
            ['F', 'ATM', 'T', 'T', 'T', 'F', 0.98],
            ['F', 'ATM', 'T', 'T', 'T', 'T', 0.020000000000000018],
            ['F', 'MAST', 'F', 'F', 'F', 'F', 0.98],
            ['F', 'MAST', 'F', 'F', 'F', 'T', 0.020000000000000018],
            ['F', 'MAST', 'F', 'F', 'T', 'F', 0.98],
            ['F', 'MAST', 'F', 'F', 'T', 'T', 0.020000000000000018],
            ['F', 'MAST', 'F', 'T', 'F', 'F', 0.98],
            ['F', 'MAST', 'F', 'T', 'F', 'T', 0.020000000000000018],
            ['F', 'MAST', 'F', 'T', 'T', 'F', 0.98],
            ['F', 'MAST', 'F', 'T', 'T', 'T', 0.020000000000000018],
            ['F', 'MAST', 'T', 'F', 'F', 'F', 0.98],
            ['F', 'MAST', 'T', 'F', 'F', 'T', 0.020000000000000018],
            ['F', 'MAST', 'T', 'F', 'T', 'F', 0.98],
            ['F', 'MAST', 'T', 'F', 'T', 'T', 0.020000000000000018],
            ['F', 'MAST', 'T', 'T', 'F', 'F', 0.98],
            ['F', 'MAST', 'T', 'T', 'F', 'T', 0.020000000000000018],
            ['F', 'MAST', 'T', 'T', 'T', 'F', 0.98],
            ['F', 'MAST', 'T', 'T', 'T', 'T', 0.020000000000000018],
            ['T', 'ATM', 'F', 'F', 'F', 'F', 0.98],
            ['T', 'ATM', 'F', 'F', 'F', 'T', 0.020000000000000018],
            ['T', 'ATM', 'F', 'F', 'T', 'F', 0.98],
            ['T', 'ATM', 'F', 'F', 'T', 'T', 0.020000000000000018],
            ['T', 'ATM', 'F', 'T', 'F', 'F', 0.98],
            ['T', 'ATM', 'F', 'T', 'F', 'T', 0.020000000000000018],
            ['T', 'ATM', 'F', 'T', 'T', 'F', 0.98],
            ['T', 'ATM', 'F', 'T', 'T', 'T', 0.020000000000000018],
            ['T', 'ATM', 'T', 'F', 'F', 'F', 0.98],
            ['T', 'ATM', 'T', 'F', 'F', 'T', 0.020000000000000018],
            ['T', 'ATM', 'T', 'F', 'T', 'F', 0.98],
            ['T', 'ATM', 'T', 'F', 'T', 'T', 0.020000000000000018],
            ['T', 'ATM', 'T', 'T', 'F', 'F', 0.98],
            ['T', 'ATM', 'T', 'T', 'F', 'T', 0.020000000000000018],
            ['T', 'ATM', 'T', 'T', 'T', 'F', 0.12],
            ['T', 'ATM', 'T', 'T', 'T', 'T', 0.88],
            ['T', 'MAST', 'F', 'F', 'F', 'F', 0.98],
            ['T', 'MAST', 'F', 'F', 'F', 'T', 0.020000000000000018],
            ['T', 'MAST', 'F', 'F', 'T', 'F', 0.98],
            ['T', 'MAST', 'F', 'F', 'T', 'T', 0.020000000000000018],
            ['T', 'MAST', 'F', 'T', 'F', 'F', 0.98],
            ['T', 'MAST', 'F', 'T', 'F', 'T', 0.020000000000000018],
            ['T', 'MAST', 'F', 'T', 'T', 'F', 0.98],
            ['T', 'MAST', 'F', 'T', 'T', 'T', 0.020000000000000018],
            ['T', 'MAST', 'T', 'F', 'F', 'F', 0.98],
            ['T', 'MAST', 'T', 'F', 'F', 'T', 0.020000000000000018],
            ['T', 'MAST', 'T', 'F', 'T', 'F', 0.98],
            ['T', 'MAST', 'T', 'F', 'T', 'T', 0.020000000000000018],
            ['T', 'MAST', 'T', 'T', 'F', 'F', 0.98],
            ['T', 'MAST', 'T', 'T', 'F', 'T', 0.020000000000000018],
            ['T', 'MAST', 'T', 'T', 'T', 'F', 0.98],
            ['T', 'MAST', 'T', 'T', 'T', 'T', 0.020000000000000018]
            ], [HISTORIQUE_BRUIT, ZONE, CRAQUEMENT, BLOCAGE_INTERMITTENT, E8_BLOCAGE_OUVERT])


    S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE = State(DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE, name="DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE")

    ######################################################################################################


    QS9 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS10 = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_QS9 = State(QS9, name="QS9")
    S_QS10 = State(QS10, name="QS10")

    HISTORIQUE_BLOCAGE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 0.99],
            ['F', 'F', 'T', 0.010000000000000009],
            ['F', 'T', 'F', 0.99],
            ['F', 'T', 'T', 0.010000000000000009],
            ['T', 'F', 'F', 0.99],
            ['T', 'F', 'T', 0.010000000000000009],
            ['T', 'T', 'F', 0.010000000000000009],
            ['T', 'T', 'T', 0.99]
            ], [QS9, QS10])

    S_HISTORIQUE_BLOCAGE = State(HISTORIQUE_BLOCAGE, name="HISTORIQUE_BLOCAGE")

    E4C_OUVER_GREATER_40 = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E4C_OUVER_GREATER_40 = State(E4C_OUVER_GREATER_40, name="E4C_OUVER_GREATER_40")

    DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'MAST', 'F', 0.97],
            ['F', 'F', 'MAST', 'T', 0.030000000000000027],
            ['F', 'F', 'ATM', 'F', 0.97],
            ['F', 'F', 'ATM', 'T', 0.030000000000000027],
            ['F', 'T', 'MAST', 'F', 0.97],
            ['F', 'T', 'MAST', 'T', 0.030000000000000027],
            ['F', 'T', 'ATM', 'F', 0.97],
            ['F', 'T', 'ATM', 'T', 0.030000000000000027],
            ['T', 'F', 'MAST', 'F', 0.97],
            ['T', 'F', 'MAST', 'T', 0.030000000000000027],
            ['T', 'F', 'ATM', 'F', 0.19999999999999996],
            ['T', 'F', 'ATM', 'T', 0.8],
            ['T', 'T', 'MAST', 'F', 0.97],
            ['T', 'T', 'MAST', 'T', 0.030000000000000027],
            ['T', 'T', 'ATM', 'F', 0.97],
            ['T', 'T', 'ATM', 'T', 0.030000000000000027]
            ], [HISTORIQUE_BLOCAGE, E4C_OUVER_GREATER_40, ZONE])

    S_DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE = State(DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE, name="DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE")

    ######################################################################################################



    DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE = ConditionalProbabilityTable(
            [
            ['F', 'F', 'MAST', 'F', 0.79],
            ['F', 'F', 'MAST', 'T', 0.20999999999999996],
            ['F', 'F', 'ATM', 'F', 0.79],
            ['F', 'F', 'ATM', 'T', 0.20999999999999996],
            ['F', 'T', 'MAST', 'F', 0.79],
            ['F', 'T', 'MAST', 'T', 0.20999999999999996],
            ['F', 'T', 'ATM', 'F', 0.79],
            ['F', 'T', 'ATM', 'T', 0.20999999999999996],
            ['T', 'F', 'MAST', 'F', 0.79],
            ['T', 'F', 'MAST', 'T', 0.20999999999999996],
            ['T', 'F', 'ATM', 'F', 0.79],
            ['T', 'F', 'ATM', 'T', 0.20999999999999996],
            ['T', 'T', 'MAST', 'F', 0.79],
            ['T', 'T', 'MAST', 'T', 0.20999999999999996],
            ['T', 'T', 'ATM', 'F', 0.45999999999999996],
            ['T', 'T', 'ATM', 'T', 0.54]
            ], [HISTORIQUE_BLOCAGE, E4C_OUVER_GREATER_40, ZONE])


    S_DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE = State(DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE, name="DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE")



    ######################################################################################################




    E6_CREPITE_OUVER = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E6_CREPITE_FERM = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E7_CREPITE_OUVER = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    E7_CREPITE_FERM = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_E6_CREPITE_OUVER = State(E6_CREPITE_OUVER, name="E6_CREPITE_OUVER")
    S_E6_CREPITE_FERM = State(E6_CREPITE_FERM, name="E6_CREPITE_FERM")
    S_E7_CREPITE_OUVER = State(E7_CREPITE_OUVER, name="E7_CREPITE_OUVER")
    S_E7_CREPITE_FERM = State(E7_CREPITE_FERM, name="E7_CREPITE_FERM")


    CREPITEMENT = ConditionalProbabilityTable(
            [
            ['F', 'F', 'F', 'F', 'F', 0.99],
            ['F', 'F', 'F', 'F', 'T', 0.01],
            ['F', 'F', 'F', 'T', 'F', 0.01],
            ['F', 'F', 'F', 'T', 'T', 0.99],
            ['F', 'F', 'T', 'F', 'F', 0.01],
            ['F', 'F', 'T', 'F', 'T', 0.99],
            ['F', 'F', 'T', 'T', 'F', 0.01],
            ['F', 'F', 'T', 'T', 'T', 0.99],
            ['F', 'T', 'F', 'F', 'F', 0.01],
            ['F', 'T', 'F', 'F', 'T', 0.99],
            ['F', 'T', 'F', 'T', 'F', 0.01],
            ['F', 'T', 'F', 'T', 'T', 0.99],
            ['F', 'T', 'T', 'F', 'F', 0.01],
            ['F', 'T', 'T', 'F', 'T', 0.99],
            ['F', 'T', 'T', 'T', 'F', 0.01],
            ['F', 'T', 'T', 'T', 'T', 0.99],
            ['T', 'F', 'F', 'F', 'F', 0.01],
            ['T', 'F', 'F', 'F', 'T', 0.99],
            ['T', 'F', 'F', 'T', 'F', 0.01],
            ['T', 'F', 'F', 'T', 'T', 0.99],
            ['T', 'F', 'T', 'F', 'F', 0.01],
            ['T', 'F', 'T', 'F', 'T', 0.99],
            ['T', 'F', 'T', 'T', 'F', 0.01],
            ['T', 'F', 'T', 'T', 'T', 0.99],
            ['T', 'T', 'F', 'F', 'F', 0.01],
            ['T', 'T', 'F', 'F', 'T', 0.99],
            ['T', 'T', 'F', 'T', 'F', 0.01],
            ['T', 'T', 'F', 'T', 'T', 0.99],
            ['T', 'T', 'T', 'F', 'F', 0.01],
            ['T', 'T', 'T', 'F', 'T', 0.99],
            ['T', 'T', 'T', 'T', 'F', 0.01],
            ['T', 'T', 'T', 'T', 'T', 0.99]
            ], [E6_CREPITE_OUVER, E6_CREPITE_FERM, E7_CREPITE_OUVER, E7_CREPITE_FERM])

    S_CREPITEMENT = State(CREPITEMENT, name="CREPITEMENT")

    MALADIE_ARTICULAIRE_DEGENERATIVE = ConditionalProbabilityTable(
            [
            ['F', 'ATM', 'F', 'F', 0.61],
            ['F', 'ATM', 'F', 'T', 0.39],
            ['F', 'ATM', 'T', 'F', 0.61],
            ['F', 'ATM', 'T', 'T', 0.39],
            ['F', 'MAST', 'F', 'F', 0.99],
            ['F', 'MAST', 'F', 'T', 0.01],
            ['F', 'MAST', 'T', 'F', 0.99],
            ['F', 'MAST', 'T', 'T', 0.01],
            ['T', 'ATM', 'F', 'F', 0.61],
            ['T', 'ATM', 'F', 'T', 0.39],
            ['T', 'ATM', 'T', 'F', 0.44999999999999996],
            ['T', 'ATM', 'T', 'T', 0.55],
            ['T', 'MAST', 'F', 'F', 0.99],
            ['T', 'MAST', 'F', 'T', 0.01],
            ['T', 'MAST', 'T', 'F', 0.99],
            ['T', 'MAST', 'T', 'T', 0.01]
            ], [HISTORIQUE_BRUIT, ZONE, CREPITEMENT])

    S_MALADIE_ARTICULAIRE_DEGENERATIVE = State(MALADIE_ARTICULAIRE_DEGENERATIVE, name="MALADIE_ARTICULAIRE_DEGENERATIVE")


    ######################################################################################################


    QS13 = DiscreteDistribution({'T': 0.5, 'F': 0.5})
    QS14 = DiscreteDistribution({'T': 0.5, 'F': 0.5})

    S_QS13 = State(QS13, name="QS13")
    S_QS14 = State(QS14, name="QS14")

    SUBLUXATION = ConditionalProbabilityTable(
            [
            ['ATM', 'F', 'F', 'F', 'F', 1],
            ['ATM', 'F', 'F', 'F', 'T', 0],
            ['ATM', 'F', 'F', 'T', 'F', 1],
            ['ATM', 'F', 'F', 'T', 'T', 0],
            ['ATM', 'F', 'T', 'F', 'F', 1],
            ['ATM', 'F', 'T', 'F', 'T', 0],
            ['ATM', 'F', 'T', 'T', 'F', 1],
            ['ATM', 'F', 'T', 'T', 'T', 0],
            ['ATM', 'T', 'F', 'F', 'F', 1],
            ['ATM', 'T', 'F', 'F', 'T', 0],
            ['ATM', 'T', 'F', 'T', 'F', 1],
            ['ATM', 'T', 'F', 'T', 'T', 0],
            ['ATM', 'T', 'T', 'F', 'F', 0.020000000000000018],
            ['ATM', 'T', 'T', 'F', 'T', 0.90],
            ['ATM', 'T', 'T', 'T', 'F', 0.020000000000000018],
            ['ATM', 'T', 'T', 'T', 'T', 0.98],
            ['MAST', 'F', 'F', 'F', 'F', 1],
            ['MAST', 'F', 'F', 'F', 'T', 0],
            ['MAST', 'F', 'F', 'T', 'F', 1],
            ['MAST', 'F', 'F', 'T', 'T', 0],
            ['MAST', 'F', 'T', 'F', 'F', 1],
            ['MAST', 'F', 'T', 'F', 'T', 0],
            ['MAST', 'F', 'T', 'T', 'F', 1],
            ['MAST', 'F', 'T', 'T', 'T', 0],
            ['MAST', 'T', 'F', 'F', 'F', 1],
            ['MAST', 'T', 'F', 'F', 'T', 0],
            ['MAST', 'T', 'F', 'T', 'F', 1],
            ['MAST', 'T', 'F', 'T', 'T', 0],
            ['MAST', 'T', 'T', 'F', 'F', 1],
            ['MAST', 'T', 'T', 'F', 'T', 0],
            ['MAST', 'T', 'T', 'T', 'F', 1],
            ['MAST', 'T', 'T', 'T', 'T', 0]
            ], [ZONE, QS13, QS14, E8_BLOCAGE_OUVERT])

    S_SUBLUXATION = State(SUBLUXATION, name="SUBLUXATION")

    ######################################################################################################

    model.add_states(S_QS3, S_QS4A, S_QS4B, S_QS4C, S_QS4D, S_QS4, S_HistoriqueDouleur)




    model.add_states(
    S_E4B_HAB_R,
    S_E4B_HAB_L ,
    S_E4C_HAB_R ,
    S_E4C_HAB_L,
    S_E9_HAB_ZONE_SUB_REGION1 ,
    S_E9_HAB_ZONE_SUB_REGION2 ,
    S_E9_HAB_ZONE_SUB_REGION3,
    S_E10_HAB_R ,
    S_E10_HAB_L,
    S_E4B_HAB,
    S_E4C_HAB,
    S_E9_HAB,
    S_E10_HAB,
    S_DouleurHabituelle,
    S_E1A,
    S_ZONE,
    S_MYALGIE
    )


    model.add_states(
            S_DOUL_HAB_PALP,
            S_E9_REF_ZONE_SUB_REGION1 ,
            S_E9_REF_ZONE_SUB_REGION2,
            S_E9_REF_ZONE_SUB_REGION3,
            S_E10_REF_R ,
            S_E10_REF_L,
            S_E9_REF,
            S_E10_REF,
            S_DOUL_REF,
            S_MYALGIE_LOCALE,
            S_DOULEUR_MYOFASCIALE_AVEC_REF

    )

    model.add_states(
            S_E9_PROPA_ZONE_SUB_REGION1 , S_E9_PROPA_ZONE_SUB_REGION2 , S_E9_PROPA_ZONE_SUB_REGION3 ,
            S_E10_PROPA_ZONE_SUB_REGION1 ,
            S_E10_PROPA_ZONE_SUB_REGION2 ,
            S_E10_PROPA_ZONE_SUB_REGION3,
            S_E9_PROPA,
            S_E10_PROPA,
            S_DOUL_PROPAGATION,
            S_DOULEUR_MYOFASCIALE
    )

    model.add_states(S_E4_HAB,S_E5A_HAB, S_E5B_HAB, S_E5C_HAB, S_E5_HAB, S_ARTHRALGIE)


    model.add_states(
            S_E1B,
            S_isTEMPORAL
            ,
            S_QS5,
            S_QS7A,
            S_QS7B,
            S_QS7C,
            S_QS7D,
            S_QS7,
            S_HISTORIQUE_MAL_DE_TETE
            ,
            S_E5A_MAL_TETE,
            S_E5B_MAL_TETE,
            S_E5C_MAL_TETE,
            S_E5_MAL_TETE,
            S_E9_MAL_TETE_ZONE1 ,
            S_E9_MAL_TETE_ZONE2 ,
            S_E9_MAL_TETE_ZONE3 
            ,
            S_E9_MAL_TETE,
            S_E4B_MAL_TETE ,
            S_E4C_MAL_TETE,
            S_E4_MAL_TETE
            ,
            S_MYALGIE_FAMILY,
            S_DOULEUR_MAL_TETE
            )


    model.add_states(S_QS8, S_E6_CRAQUE_PATIENT,S_E6_CREPITE_PATIENT, S_E7_CRAQUE_PATIENT, S_E7_CREPITE_PATIENT, S_HISTORIQUE_BRUIT, 
    S_E6_CRAQUE_OUVERT ,
    S_E6_CRAQUE_FERM,
    S_E7_CRAQUE,
    S_CRAQUEMENT,
    S_DEPLACEMENT_DISQUE_AVEC_REDUCTION
    )

    model.add_states(
        S_QS11,
        S_QS12,   
    S_E8_BLOCAGE_OUVERT,
    S_BLOCAGE_INTERMITTENT,
    S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE
    )



    model.add_states(
            S_QS9,
            S_QS10, 
    S_HISTORIQUE_BLOCAGE, 
    S_E4C_OUVER_GREATER_40, 
    S_DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE
    )



    model.add_states(S_DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE)


    model.add_states(
            S_E6_CREPITE_OUVER,
            S_E6_CREPITE_FERM,
            S_E7_CREPITE_OUVER,
            S_E7_CREPITE_FERM,
            S_CREPITEMENT,
            S_MALADIE_ARTICULAIRE_DEGENERATIVE
    )

    model.add_states(
            S_QS13,
            S_QS14,
            S_SUBLUXATION
    )



    model.add_edge(S_QS4A, S_QS4)
    model.add_edge(S_QS4B, S_QS4)
    model.add_edge(S_QS4C, S_QS4)
    model.add_edge(S_QS4D, S_QS4)

    model.add_edge(S_QS3, S_HistoriqueDouleur)
    model.add_edge(S_QS4, S_HistoriqueDouleur)


    model.add_edge(S_E4B_HAB_R, S_E4B_HAB)
    model.add_edge(S_E4B_HAB_L, S_E4B_HAB)
    model.add_edge(S_E4C_HAB_R, S_E4C_HAB)
    model.add_edge(S_E4C_HAB_L, S_E4C_HAB)


    model.add_edge(S_E9_HAB_ZONE_SUB_REGION1, S_E9_HAB)
    model.add_edge(S_E9_HAB_ZONE_SUB_REGION2, S_E9_HAB)
    model.add_edge(S_E9_HAB_ZONE_SUB_REGION3, S_E9_HAB)
    model.add_edge(S_E10_HAB_R, S_E10_HAB)
    model.add_edge(S_E10_HAB_L, S_E10_HAB)

    model.add_edge(S_E9_HAB, S_DouleurHabituelle)
    model.add_edge(S_E10_HAB, S_DouleurHabituelle)
    model.add_edge(S_E4C_HAB, S_DouleurHabituelle)
    model.add_edge(S_E4B_HAB, S_DouleurHabituelle)

    model.add_edge(S_DouleurHabituelle, S_MYALGIE)
    model.add_edge(S_E1A, S_MYALGIE)
    model.add_edge(S_ZONE, S_MYALGIE)
    model.add_edge(S_HistoriqueDouleur, S_MYALGIE)



    ############
    model.add_edge(S_ZONE, S_MYALGIE_LOCALE)
    model.add_edge(S_DOUL_REF, S_MYALGIE_LOCALE)
    model.add_edge(S_E1A, S_MYALGIE_LOCALE)
    model.add_edge(S_DOUL_HAB_PALP, S_MYALGIE_LOCALE)
    model.add_edge(S_HistoriqueDouleur, S_MYALGIE_LOCALE)

    model.add_edge(S_E9_REF, S_DOUL_REF)
    model.add_edge(S_E10_REF, S_DOUL_REF)

    model.add_edge(S_E9_REF_ZONE_SUB_REGION1, S_E9_REF)
    model.add_edge(S_E9_REF_ZONE_SUB_REGION2, S_E9_REF)
    model.add_edge(S_E9_REF_ZONE_SUB_REGION3, S_E9_REF)

    model.add_edge(S_E10_REF_R, S_E10_REF)
    model.add_edge(S_E10_REF_L, S_E10_REF)

    model.add_edge(S_E9_HAB, S_DOUL_HAB_PALP)
    model.add_edge(S_E10_HAB, S_DOUL_HAB_PALP)

    model.add_edge(S_ZONE, S_DOULEUR_MYOFASCIALE_AVEC_REF)
    model.add_edge(S_DOUL_REF, S_DOULEUR_MYOFASCIALE_AVEC_REF)
    model.add_edge(S_E1A, S_DOULEUR_MYOFASCIALE_AVEC_REF)
    model.add_edge(S_DOUL_HAB_PALP, S_DOULEUR_MYOFASCIALE_AVEC_REF)
    model.add_edge(S_HistoriqueDouleur, S_DOULEUR_MYOFASCIALE_AVEC_REF)

    #############


    model.add_edge(S_E9_PROPA_ZONE_SUB_REGION1, S_E9_PROPA)
    model.add_edge(S_E9_PROPA_ZONE_SUB_REGION2, S_E9_PROPA)
    model.add_edge(S_E9_PROPA_ZONE_SUB_REGION3, S_E9_PROPA)

    model.add_edge(S_E10_PROPA_ZONE_SUB_REGION1, S_E10_PROPA)
    model.add_edge(S_E10_PROPA_ZONE_SUB_REGION2, S_E10_PROPA)
    model.add_edge(S_E10_PROPA_ZONE_SUB_REGION3, S_E10_PROPA)

    model.add_edge(S_E9_PROPA, S_DOUL_PROPAGATION)
    model.add_edge(S_E10_PROPA, S_DOUL_PROPAGATION)

    model.add_edge(S_ZONE, S_DOULEUR_MYOFASCIALE)
    model.add_edge(S_DOUL_PROPAGATION, S_DOULEUR_MYOFASCIALE)
    model.add_edge(S_HistoriqueDouleur, S_DOULEUR_MYOFASCIALE)
    model.add_edge(S_E1A, S_DOULEUR_MYOFASCIALE)
    model.add_edge(S_DOUL_HAB_PALP, S_DOULEUR_MYOFASCIALE)
    model.add_edge(S_DOUL_REF, S_DOULEUR_MYOFASCIALE)


    ############
    model.add_edge(S_E5A_HAB, S_E5_HAB)
    model.add_edge(S_E5B_HAB, S_E5_HAB)
    model.add_edge(S_E5C_HAB, S_E5_HAB)

    model.add_edge(S_E4_HAB, S_ARTHRALGIE)
    model.add_edge(S_E5_HAB, S_ARTHRALGIE)
    model.add_edge(S_E1A, S_ARTHRALGIE)
    model.add_edge(S_HistoriqueDouleur, S_ARTHRALGIE)
    model.add_edge(S_ZONE, S_ARTHRALGIE)
    model.add_edge(S_E9_HAB, S_ARTHRALGIE)

    model.add_edge(S_E4B_HAB, S_E4_HAB)
    model.add_edge(S_E4C_HAB, S_E4_HAB)


    #######

    model.add_edge(S_MYALGIE, S_MYALGIE_FAMILY)
    model.add_edge(S_DOULEUR_MYOFASCIALE, S_MYALGIE_FAMILY)
    model.add_edge(S_DOULEUR_MYOFASCIALE_AVEC_REF, S_MYALGIE_FAMILY)
    model.add_edge(S_MYALGIE_LOCALE, S_MYALGIE_FAMILY)

    model.add_edge(S_E4_MAL_TETE, S_DOULEUR_MAL_TETE)
    model.add_edge(S_E9_MAL_TETE, S_DOULEUR_MAL_TETE)
    model.add_edge(S_E5_MAL_TETE, S_DOULEUR_MAL_TETE)
    model.add_edge(S_HISTORIQUE_MAL_DE_TETE, S_DOULEUR_MAL_TETE)
    model.add_edge(S_E1B, S_DOULEUR_MAL_TETE)
    model.add_edge(S_isTEMPORAL, S_DOULEUR_MAL_TETE)
    model.add_edge(S_MYALGIE_FAMILY, S_DOULEUR_MAL_TETE)
    model.add_edge(S_ARTHRALGIE, S_DOULEUR_MAL_TETE)

    model.add_edge(S_E4B_MAL_TETE, S_E4_MAL_TETE)
    model.add_edge(S_E4C_MAL_TETE, S_E4_MAL_TETE)

    model.add_edge(S_E9_MAL_TETE_ZONE1, S_E9_MAL_TETE)
    model.add_edge(S_E9_MAL_TETE_ZONE2, S_E9_MAL_TETE)
    model.add_edge(S_E9_MAL_TETE_ZONE3, S_E9_MAL_TETE)

    model.add_edge(S_E5A_MAL_TETE, S_E5_MAL_TETE)
    model.add_edge(S_E5B_MAL_TETE, S_E5_MAL_TETE)
    model.add_edge(S_E5C_MAL_TETE, S_E5_MAL_TETE)

    model.add_edge(S_QS7, S_HISTORIQUE_MAL_DE_TETE)
    model.add_edge(S_QS5, S_HISTORIQUE_MAL_DE_TETE)

    model.add_edge(S_QS7A, S_QS7)
    model.add_edge(S_QS7B, S_QS7)
    model.add_edge(S_QS7C, S_QS7)
    model.add_edge(S_QS7D, S_QS7)

    ######


    model.add_edge(S_CRAQUEMENT, S_DEPLACEMENT_DISQUE_AVEC_REDUCTION)
    model.add_edge(S_ZONE, S_DEPLACEMENT_DISQUE_AVEC_REDUCTION)
    model.add_edge(S_HISTORIQUE_BRUIT, S_DEPLACEMENT_DISQUE_AVEC_REDUCTION)

    model.add_edge(S_E6_CRAQUE_OUVERT, S_CRAQUEMENT)
    model.add_edge(S_E6_CRAQUE_FERM, S_CRAQUEMENT)
    model.add_edge(S_E7_CRAQUE, S_CRAQUEMENT)

    model.add_edge(S_QS8, S_HISTORIQUE_BRUIT)
    model.add_edge(S_E6_CRAQUE_PATIENT, S_HISTORIQUE_BRUIT)
    model.add_edge(S_E6_CREPITE_PATIENT, S_HISTORIQUE_BRUIT)
    model.add_edge(S_E7_CRAQUE_PATIENT, S_HISTORIQUE_BRUIT)
    model.add_edge(S_E7_CREPITE_PATIENT, S_HISTORIQUE_BRUIT)

    #####


    model.add_edge(S_QS11, S_BLOCAGE_INTERMITTENT)
    model.add_edge(S_QS12, S_BLOCAGE_INTERMITTENT)

    model.add_edge(S_E8_BLOCAGE_OUVERT, S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE)
    model.add_edge(S_BLOCAGE_INTERMITTENT, S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE)

    model.add_edge(S_HISTORIQUE_BRUIT, S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE)
    model.add_edge(S_ZONE, S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE)
    model.add_edge(S_CRAQUEMENT, S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE)


    ####

    model.add_edge(S_QS9, S_HISTORIQUE_BLOCAGE)
    model.add_edge(S_QS10, S_HISTORIQUE_BLOCAGE)
    model.add_edge(S_HISTORIQUE_BLOCAGE, S_DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE)
    model.add_edge(S_E4C_OUVER_GREATER_40, S_DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE)
    model.add_edge(S_ZONE, S_DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE)


    ####

    model.add_edge(S_HISTORIQUE_BLOCAGE, S_DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE)
    model.add_edge(S_E4C_OUVER_GREATER_40, S_DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE)
    model.add_edge(S_ZONE, S_DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE)


    ####

    model.add_edge(S_CREPITEMENT, S_MALADIE_ARTICULAIRE_DEGENERATIVE)
    model.add_edge(S_ZONE, S_MALADIE_ARTICULAIRE_DEGENERATIVE)
    model.add_edge(S_HISTORIQUE_BRUIT, S_MALADIE_ARTICULAIRE_DEGENERATIVE)

    model.add_edge(S_E6_CREPITE_OUVER, S_CREPITEMENT)
    model.add_edge(S_E6_CREPITE_FERM, S_CREPITEMENT)
    model.add_edge(S_E7_CREPITE_OUVER, S_CREPITEMENT)
    model.add_edge(S_E7_CREPITE_FERM, S_CREPITEMENT)


    ####
    model.add_edge(S_QS13, S_SUBLUXATION)
    model.add_edge(S_QS14, S_SUBLUXATION)
    model.add_edge(S_ZONE, S_SUBLUXATION)
    model.add_edge(S_E8_BLOCAGE_OUVERT, S_SUBLUXATION)


    ###

    ############
    model.bake()
    #print("Done")
    return model


'''
print(model.predict_proba([
        #S_QS3
        'c', 
        #S_QS4A
        'T',
        #S_QS4B
        'T',
        #S_QS4C
        'T',
        #S_QS4D
        'T',
        #S_QS4
        None, 
        #S_HistoriqueDouleur
        None, 
        #S_E4B_HAB_R
        'T',
        #S_E4B_HAB_L
        'T',
        #S_E4C_HAB_R
        'T',
        #S_E4C_HAB_L
        'T', 
        #S_E9_HAB_ZONE_SUB_REGION1 ,
        'T',
        #S_E9_HAB_ZONE_SUB_REGION2 ,
        'T',
        #S_E9_HAB_ZONE_SUB_REGION3,
        'T',
        #S_E10_HAB_R
        'T',
        #S_E10_HAB_L
        'T',
        #S_E4B_HAB
        None, 
        #S_E4C_HAB
        None,
        #S_E9_HAB
        None, 
        #S_E10_HAB
        None,
        #S_DouleurHabituelle
        None, 
        #S_E1A
        'T', 
        #S_ZONE
        'ATM', 
        #S_MYALGIE
        None,
        #S_DOUL_HAB_PALP
        None, 
        #S_E9_REF_ZONE_SUB_REGION1
        'F' , 
        #S_E9_REF_ZONE_SUB_REGION2
        'F' ,
        #S_E9_REF_ZONE_SUB_REGION1
        'F' ,
        #S_E10_REF_R
        'F'  , 
        #S_E10_REF_L
        'F' , 
        #S_E9_REF
        None, 
        #S_E10_REF
        None, 
        #S_DOUL_REF
        None, 
        #S_MYALGIE_LOCALE
        None, 
        #S_DOULEUR_MYOFASCIALE_AVEC_REF
        None,
        #S_E9_PROPA_ZONE_SUB_REGION1
        'T' , 
        #S_E9_PROPA_ZONE_SUB_REGION2
        'T' , 
        #S_E9_PROPA_ZONE_SUB_REGION3
        'T' , 
        #S_E10_PROPA_ZONE_SUB_REGION1
        'T' ,
        #S_E10_PROPA_ZONE_SUB_REGION2
        'T' , 
        #S_E10_PROPA_ZONE_SUB_REGION3
        'T', 
        #S_E9_PROPA
        None, 
        #S_E10_PROPA
        None, 
        #S_DOUL_PROPAGATION
        None, 
        #S_DOULEUR_MYOFASCIALE
        None,
        #S_E4_HAB
        None,
        #S_E5A_HAB
        'T', 
        #S_E5B_HAB
        'T', 
        #S_E5C_HAB
        'T', 
        #S_E5_HAB
        None, 
        #S_ARTHRALGIE
        None,
        #S_E1B,
        'T',
        #S_isTEMPORAL,
        'T',
        #S_QS5,
        'T',
        #S_QS7A,
        'T',
        #S_QS7B,
        'T',
        #S_QS7C,
        'T',
        #S_QS7D,
        'T',
        #S_QS7,
        None,
        #S_HISTORIQUE_MAL_DE_TETE,
        None,
        #S_E5A_MAL_TETE,
        'T',
        #S_E5B_MAL_TETE,
        'T',
        #S_E5C_MAL_TETE,
        'T',
        #S_E5_MAL_TETE,
        None,
        #S_E9_MAL_TETE_ZONE1,
        'T',
        #S_E9_MAL_TETE_ZONE2,
        'T',
        #S_E9_MAL_TETE_ZONE3 ,
        'T',
        #S_E9_MAL_TETE,
        None,
        #S_E4B_MAL_TETE ,
        'T',
        #S_E4C_MAL_TETE,
        'T',
        #S_E4_MAL_TETE,
        None,
        #S_MYALGIE_FAMILY,
        None,
        #S_DOULEUR_MAL_TETE
        None,
        #S_QS8, 
        'T',
        # S_E6_CRAQUE_PATIENT,
        'T',
        # S_E6_CREPITE_PATIENT, 
        'T',
        # S_E7_CRAQUE_PATIENT, 
        'T',
        # S_E7_CREPITE_PATIENT, 
        'T',
        # S_HISTORIQUE_BRUIT, 
        None,
        #S_E6_CRAQUE_OUVERT ,
        'T',
        #S_E6_CRAQUE_FERM,
        'T',
        #S_E7_CRAQUE,
        'T',
        #S_CRAQUEMENT,
        None,
        #S_DEPLACEMENT_DISQUE_AVEC_REDUCTION
        None,
        #S_QS11,
        'T',
        #S_QS12,   
        'F',
        #S_E8_BLOCAGE_OUVERT,
        'T',
        #S_BLOCAGE_INTERMITTENT,
        None,
        #S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE
        None,
        #S_QS9,
        'T',
        #S_QS10, 
        'T',
        #S_HISTORIQUE_BLOCAGE, 
        None,
        #S_E4C_OUVER_GREATER_40, 
        'T',
        #S_DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE
        None,
        #S_DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE
        None,
        #S_E6_CREPITE_OUVER,
        'T',
        #S_E6_CREPITE_FERM,
        'T',
        #S_E7_CREPITE_OUVER,
        'T',
        #S_E7_CREPITE_FERM,
        'T',
        #S_CREPITEMENT,
        None,
        #S_MALADIE_ARTICULAIRE_DEGENERATIVE
        None,
        #S_QS13,
        'T',
        #S_QS14,
        'T',
        #S_SUBLUXATION
        None
        ]))
'''



def predictVector(model, line):
        probabilities = (model.predict_proba([
                #S_QS3
                line['QS3'], 
                #S_QS4A
                line['QS4A'],
                #S_QS4B
                line['QS4B'],
                #S_QS4C
                line['QS4C'],
                #S_QS4D
                line['QS4D'],
                #S_QS4
                None, 
                #S_HistoriqueDouleur
                None, 
                #S_E4B_HAB_R
                None,
                #S_E4B_HAB_L
                None,
                #S_E4C_HAB_R
                None,
                #S_E4C_HAB_L
                None,
                #S_E9_HAB_ZONE_SUB_REGION1 ,
                line['E9_HAB_ZONE_SUB_REGION1'],
                #S_E9_HAB_ZONE_SUB_REGION2 ,
                line['E9_HAB_ZONE_SUB_REGION2'],
                #S_E9_HAB_ZONE_SUB_REGION3,
                line['E9_HAB_ZONE_SUB_REGION3'],
                #S_E10_HAB_R
                None,
                #S_E10_HAB_L
                None,
                #S_E4B_HAB
                line['E4B_HAB'],
                #S_E4C_HAB
                line['E4C_HAB'],
                #S_E9_HAB
                None, 
                #S_E10_HAB
                line['E10_HAB'],
                #S_DouleurHabituelle
                None, 
                #S_E1A
                line['E1A'],
                #S_ZONE
                line['ZONE'],
                #S_MYALGIE
                None,
                #S_DOUL_HAB_PALP
                None, 
                #S_E9_REF_ZONE_SUB_REGION1
                line['E9_REF_ZONE_SUB_REGION1'],
                #S_E9_REF_ZONE_SUB_REGION2
                line['E9_REF_ZONE_SUB_REGION2'],
                #S_E9_REF_ZONE_SUB_REGION3
                line['E9_REF_ZONE_SUB_REGION3'],
                #S_E10_REF_R
                None,
                #S_E10_REF_L
                None,
                #S_E9_REF
                None, 
                #S_E10_REF
                line['E10_REF'], 
                #S_DOUL_REF
                None, 
                #S_MYALGIE_LOCALE
                None, 
                #S_DOULEUR_MYOFASCIALE_AVEC_REF
                None,
                #S_E9_PROPA_ZONE_SUB_REGION1
                line['E9_PROPA_ZONE_SUB_REGION1'],
                #S_E9_PROPA_ZONE_SUB_REGION2
                line['E9_PROPA_ZONE_SUB_REGION2'],
                #S_E9_PROPA_ZONE_SUB_REGION3
                line['E9_PROPA_ZONE_SUB_REGION3'],
                #S_E10_PROPA_ZONE_SUB_REGION1
                line['E10_PROPA_ZONE_SUB_REGION1'],
                #S_E10_PROPA_ZONE_SUB_REGION2
                line['E10_PROPA_ZONE_SUB_REGION2'],
                #S_E10_PROPA_ZONE_SUB_REGION3
                line['E10_PROPA_ZONE_SUB_REGION3'],
                #S_E9_PROPA
                None, 
                #S_E10_PROPA
                None, 
                #S_DOUL_PROPAGATION
                None, 
                #S_DOULEUR_MYOFASCIALE
                None,
                #S_E4_HAB
                None,
                #S_E5A_HAB
                line['E5A_HAB'],
                #S_E5B_HAB
                line['E5B_HAB'],
                #S_E5C_HAB
                line['E5C_HAB'],
                #S_E5_HAB
                None, 
                #S_ARTHRALGIE
                None,
                #S_E1B,
                line['E1B'],
                #S_isTEMPORAL,
                line['isTEMPORAL'],
                #S_QS5,
                line['QS5'],
                #S_QS7A,
                line['QS7A'],
                #S_QS7B,
                line['QS7B'],
                #S_QS7C,
                line['QS7C'],
                #S_QS7D,
                line['QS7D'],
                #S_QS7,
                None,
                #S_HISTORIQUE_MAL_DE_TETE,
                None,
                #S_E5A_MAL_TETE,
                line['E5A_MAL_TETE'],
                #S_E5B_MAL_TETE,
                line['E5B_MAL_TETE'],
                #S_E5C_MAL_TETE,
                line['E5C_MAL_TETE'],
                #S_E5_MAL_TETE,
                None,
                #S_E9_MAL_TETE_ZONE1,
                line['E9_MAL_TETE_ZONE1'],
                #S_E9_MAL_TETE_ZONE2,
                line['E9_MAL_TETE_ZONE2'],
                #S_E9_MAL_TETE_ZONE3 ,
                line['E9_MAL_TETE_ZONE3'],
                #S_E9_MAL_TETE,
                None,
                #S_E4B_MAL_TETE ,
                line['E4B_MAL_TETE'],
                #S_E4C_MAL_TETE,
                line['E4C_MAL_TETE'],
                #S_E4_MAL_TETE,
                None,
                #S_MYALGIE_FAMILY,
                None,
                #S_DOULEUR_MAL_TETE
                None,
                #S_QS8, 
                line['QS8'],
                # S_E6_CRAQUE_PATIENT,
                line['E6_CRAQUE_PATIENT'],
                # S_E6_CREPITE_PATIENT, 
                line['E6_CREPITE_PATIENT'],
                # S_E7_CRAQUE_PATIENT, 
                line['E7_CRAQUE_PATIENT'],
                # S_E7_CREPITE_PATIENT, 
                line['E7_CREPITE_PATIENT'],
                # S_HISTORIQUE_BRUIT, 
                None,
                #S_E6_CRAQUE_OUVERT ,
                line['E6_CRAQUE_OUVERT'],
                #S_E6_CRAQUE_FERM,
                line['E6_CRAQUE_FERM'],
                #S_E7_CRAQUE,
                line['E7_CRAQUE'],
                #S_CRAQUEMENT,
                None,
                #S_DEPLACEMENT_DISQUE_AVEC_REDUCTION
                None,
                #S_QS11,
                line['QS11'],
                #S_QS12,   
                line['QS12'],
                #S_E8_BLOCAGE_OUVERT,
                line['E8_BLOCAGE_OUVERT'],
                #S_BLOCAGE_INTERMITTENT,
                None,
                #S_DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE
                None,
                #S_QS9,
                line['QS9'],
                #S_QS10, 
                line['QS10'],
                #S_HISTORIQUE_BLOCAGE, 
                None,
                #S_E4C_OUVER_GREATER_40, 
                line['E4C_OUVER_GREATER_40'],
                #S_DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE
                None,
                #S_DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE
                None,
                #S_E6_CREPITE_OUVER,
                line['E6_CREPITE_OUVER'],
                #S_E6_CREPITE_FERM,
                line['E6_CREPITE_FERM'],
                #S_E7_CREPITE_OUVER,
                line['E7_CREPITE_OUVER'],
                #S_E7_CREPITE_FERM,
                line['E7_CREPITE_FERM'],
                #S_CREPITEMENT,
                None,
                #S_MALADIE_ARTICULAIRE_DEGENERATIVE
                None,
                #S_QS13,
                line['QS13'],
                #S_QS14,
                line['QS14'],
                #S_SUBLUXATION
                None
                ]))

        

        predictions = {}
        vectorProdiction = []
        vectorPROBA = []
        predictions['DOULEUR_MAL_TETE'] = probabilities[72]
        #vectorProdiction.append(probabilities[72])
        predictions['MYALGIE'] = probabilities[23]
        #vectorProdiction.append(probabilities[23])
        predictions['MYALGIE_LOCALE'] = probabilities[33]
        #vectorProdiction.append(probabilities[33])
        predictions['DOULEUR_MYOFASCIALE_AVEC_REF'] = probabilities[34]
        #vectorProdiction.append(probabilities[34])
        predictions['DOULEUR_MYOFASCIALE'] = probabilities[44]
        #vectorProdiction.append(probabilities[44])
        predictions['ARTHRALGIE'] = probabilities[50]
        #vectorProdiction.append(probabilities[50])
        predictions['DEPLACEMENT_DISQUE_AVEC_REDUCTION'] = probabilities[83]
        #vectorProdiction.append(probabilities[83])
        predictions['DEPLACEMENT_DISQUE_AVEC_REDUCTION_ET_BLOCAGE'] = probabilities[88]
        #vectorProdiction.append(probabilities[88])
        predictions['DEPLACEMENT_DISQUE_SANS_REDUCTION_AVEC_OUVER_LIMITE'] = probabilities[93]
        #vectorProdiction.append(probabilities[93])
        predictions['DEPLACEMENT_DISQUE_SANS_REDUCTION_SANS_OUVER_LIMITE'] = probabilities[94]
        #vectorProdiction.append(probabilities[94])
        predictions['MALADIE_ARTICULAIRE_DEGENERATIVE'] = probabilities[100]
        #vectorProdiction.append(probabilities[100])
        predictions['SUBLUXATION'] = probabilities[103]
        #vectorProdiction.append(probabilities[103])

        #print(predictions)

        highestProb = 0.45
        highestPrediction = 'NO_DISORDER'
        for key in predictions.keys():
                if predictions[key].items()[1][0] == 'T':
                        probOfKey = predictions[key].items()[1][1]
                        if  probOfKey > highestProb:
                                vectorProdiction.append(math.ceil(probOfKey))
                                vectorPROBA.append(probOfKey)
                        else:
                                vectorProdiction.append(math.floor(probOfKey))
                                vectorPROBA.append(probOfKey)
                elif predictions[key].items()[0][0] == 'T':
                        probOfKey = predictions[key].items()[0][1]
                        if  probOfKey > highestProb:
                                vectorProdiction.append(math.ceil(probOfKey))
                                vectorPROBA.append(probOfKey)
                        else:
                                vectorProdiction.append(math.floor(probOfKey))
                                vectorPROBA.append(probOfKey)



        return highestPrediction, vectorProdiction, vectorPROBA



################################################################################################
################################################################################################
##LOAD THE DATA
################################################################################################
################################################################################################
'''
cwd = os.getcwd()
print(cwd)
#filename = cwd + "/../../../data.json"
filename = "/Users/charles-olivierfavreau/Desktop/data_fixed.json"
print(filename)
if filename:
    with open(filename, 'r', encoding='utf-8') as f:
        datastore = json.load(f)

dataQuestionnaires = []
for line in datastore['list']:
    #print(line)
    dataQuestionnaires.append(line['questions'])  
'''

def preprocess(dataQuestionnaires):
    df = pd.DataFrame(dataQuestionnaires, index=[0])

    #############################################################################################
    #############################################################################################
    #### Transformations needed (Might need to be changed if database columns problems are fixed)
    #############################################################################################
    #############################################################################################
    df['QS4D'] = df['QS4C']
    df['E9_AL_DOU_REF_G'] = 'F'
    df['E11_AG'] = 'F'

    df['E9_AL_D_D'] = df['E9_AL_DH_D']
    df['E9_AL_D_G'] = df['E9_AL_DH_G']

    df['E9_PL_D_D'] = df['E9_PL_DH_D']
    df['E9_PL_D_G'] = df['E9_PL_DH_G']

    df = df.dropna(subset=['QS3', 'QS4A', 'QS4B', 'QS4C', 'QS4D'])


    #############################################################################################

    def cleanQS3(x):
        if x == 'Aucune douleur':
            return 'a'
        if x == 'Douleur qui vient et part':
            return 'b'
        if x ==  'Douleur toujours présente':
            return 'c'
        else:
            return 'a'

    def cleanOUI_NON_TO_TRUE_FALSE(x):
        if x == 'Oui':
            return 'T'
        if x == 'Non':
            return 'F'
        else:
            return 'F'

    def preprocess_DOUL_HAB_TO_TRUE_FALSE(x):
            if x == 'DH':
                    return 'T'
            elif x == 'AP':
                    return 'T'
            else:
                    return 'F'

    def preprocess_3_regions(x):
        if x[0] == 'T':
            return x[0]
        elif x[1] == 'T': 
            return x[1]
        elif x[2] == 'T': 
            return x[2]
        else:
            return 'F'

    def preprocess_DOUL_TO_TRUE_FALSE(x):
            if x == 'D':
                    return 'T'
            elif x == 'AP':
                    return 'T'
            else:
                    return 'F'


    def preprocess_DOUL_REF_TO_TRUE_FALSE(x):
            if x == 'DR':
                    return 'T'
            elif x == 'AP':
                    return 'T'
            else:
                    return 'F'

    def preprocess_DOUL_PROPA_TO_TRUE_FALSE(x):
            if x == 'DH':
                    return 'T'
            elif x == 'D':
                    return 'T'
            elif x == 'AP':
                    return 'T'
            else:
                    return 'F'

    def preprocess_E1B_IS_AUTRE(x):
        if x == 'Autre':
            return 'T'
        else:
            return 'F'

    def preprocess_E1B_IS_TEMPORAL(x):
        if x == 'Temporal':
            return 'T'
        else:
            return 'F'

    def preprocess_E4C_is_GREATER_THAN_40(x):
        if x != 'nan':
            if int(np.nan_to_num(x)) >= 40:
                return 'T'
            else:
                return 'F'
        else:
            return 'F'

    def preprocess_Y_MASSETER_DROIT(x):
        if x == 'MyalgieMasseterDroit':
            return 'MYALGIE'
        if x == 'DouleurMyofascialeRéféréeMasseterDroit':
            return 'DOULEUR_MYOFASCIALE_AVEC_REF'
        if x == 'ArthralgieMasseterDroit':
            return 'ARTHRALGIE'
        if x == 'DouleurMyofascialeMasseterDroit':
            return 'DOULEUR_MYOFASCIALE'
        else:
            return 'NO_DISORDER'

    def preprocess_N_Y_TO_TRUE_FALSE(x):
        if x == 'Y':
            return 'T'
        else:
            return 'F'

    def preprocess_N_Y_TO_1_0(x):
        if x == 'Y':
            return 1
        else:
            return 0

    def preprocess_TRUE_FALSE_TO_T_F(x):
        if x == 'true':
            return 'T'
        else:
            return 'F'

    def preprocess_E9_PROPA_ATM_region(DOUL, HAB):
        if DOUL == 'Y':
            return 'T'
        elif HAB == 'Y':
            return 'T'
        else:
            return 'F'

    def preprocess_E7_CRAQUE_ATM_(OUVERT, FERMER):
        if OUVERT == 'Y':
            return 'T'
        elif FERMER == 'Y':
            return 'T'
        else:
            return 'F'


    def preprocess_DISORDER_ATM_DEP_REDUC(x):
        if x == 'DEP_REDUC':
            return 1
        else:
            return 0

    def preprocess_DISORDER_ATM_S_REDUC_ET_OUV_LIM(x):
        if x == 'S_REDUC_ET_OUV_LIM':
            return 1
        else:
            return 0

    def preprocess_DISORDER_ATM_MDA(x):
        if x == 'MDA':
            return 1
        else:
            return 0

    def preprocess_DISORDER_ATM_DEP_REDUC_BLOC(x):
        if x == 'DEP_REDUC_BLOC':
            return 1
        else:
            return 0
        
    def preprocess_DISORDER_ATM_SUB(x):
        if x == 'SUB':
            return 1
        else:
            return 0

    def preprocess_DISORDER_ATM_S_REDUC_S_OUV(x):
        if x == 'S_REDUC_S_OUV':
            return 1
        else:
            return 0



    def visualise_Data(original_df, df, TRUE_LABELS, PREDICTED_LABLES, index):
            print("DATA: ")
            data_dict_original= original_df.iloc[index].to_dict()
            for item in data_dict_original.items():
                    print(item)
            print('\n')

            print("DATA transformed: ")
            data_dict = df.iloc[index].to_dict()
            for item in data_dict.items():
                    print(item)
            print('\n')

            print("TRUE_LABELS : ")
            print(TRUE_LABELS[index])
            print('\n')

            print("PREDICTED_LABLES : ")
            print(PREDICTED_LABLES[index])
            print('\n')

    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour MASSETER DROIT
    ####################################################################################################################
    ####################################################################################################################

    df_MASSETER_DROIT = pd.DataFrame()
    df_MASSETER_DROIT['QS3'] = df['QS3'].apply(cleanQS3)

    df_MASSETER_DROIT['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_DROIT['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_DROIT['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_DROIT['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E4B_HAB'] = df['E4_MS_D_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E4C_HAB'] = df['E4_MA_D_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PALP_D_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_MASSETER_DROIT['E9_HAB_ZONE_SUB_REGION2'] = df['E9_PALP_D_MASSETER_INSERTION'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_MASSETER_DROIT['E9_HAB_ZONE_SUB_REGION3'] = df['E9_PALP_D_MASSETER_ORIGIN'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E10_HAB'] = 'F'

    df_MASSETER_DROIT["E1A"] = df["E1_DOUL_D_MASSETER_BODY"].apply(preprocess_DOUL_TO_TRUE_FALSE)

    df_MASSETER_DROIT['ZONE'] = 'MAST'

    df_MASSETER_DROIT['E9_REF_ZONE_SUB_REGION1'] = df['E9_PALP_D_MASSETER_BODY'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_MASSETER_DROIT['E9_REF_ZONE_SUB_REGION2'] = df['E9_PALP_D_MASSETER_INSERTION'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_MASSETER_DROIT['E9_REF_ZONE_SUB_REGION3'] = df['E9_PALP_D_MASSETER_ORIGIN'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E10_REF'] = 'F'

    df_MASSETER_DROIT['E9_PROPA_ZONE_SUB_REGION1'] = df['E9_PALP_D_MASSETER_BODY'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_MASSETER_DROIT['E9_PROPA_ZONE_SUB_REGION2'] = df['E9_PALP_D_MASSETER_INSERTION'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_MASSETER_DROIT['E9_PROPA_ZONE_SUB_REGION3'] = df['E9_PALP_D_MASSETER_ORIGIN'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E10_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_MASSETER_DROIT['E10_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_MASSETER_DROIT['E10_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_MASSETER_DROIT['E5A_HAB'] = df['E5_LD_D_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E5B_HAB'] = df['E5_LG_D_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E5C_HAB'] = df['E5_PI_D_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E1B'] = df['E1B_D'].apply(preprocess_E1B_IS_AUTRE)

    df_MASSETER_DROIT['isTEMPORAL'] = 'F'

    df_MASSETER_DROIT['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_DROIT['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_DROIT['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_DROIT['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_DROIT['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E5A_MAL_TETE'] = 'F'
    df_MASSETER_DROIT['E5B_MAL_TETE'] = 'F'
    df_MASSETER_DROIT['E5C_MAL_TETE'] = 'F'

    df_MASSETER_DROIT['E9_MAL_TETE_ZONE1'] = 'F'
    df_MASSETER_DROIT['E9_MAL_TETE_ZONE2'] = 'F'
    df_MASSETER_DROIT['E9_MAL_TETE_ZONE3'] = 'F'

    df_MASSETER_DROIT['E4B_MAL_TETE'] = 'F'
    df_MASSETER_DROIT['E4C_MAL_TETE'] = 'F'

    df_MASSETER_DROIT['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E6_CRAQUE_PATIENT'] = 'F'
    df_MASSETER_DROIT['E6_CREPITE_PATIENT'] = 'F'
    df_MASSETER_DROIT['E7_CRAQUE_PATIENT'] = 'F'
    df_MASSETER_DROIT['E7_CREPITE_PATIENT'] = 'F'

    df_MASSETER_DROIT['E6_CRAQUE_OUVERT'] = 'F'
    df_MASSETER_DROIT['E6_CRAQUE_FERM'] = 'F'
    df_MASSETER_DROIT['E7_CRAQUE'] = 'F'

    df_MASSETER_DROIT['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_DROIT['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E8_BLOCAGE_OUVERT'] = 'F'

    df_MASSETER_DROIT['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_DROIT['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_DROIT['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_MASSETER_DROIT['E6_CREPITE_OUVER'] = 'F'
    df_MASSETER_DROIT['E6_CREPITE_FERM'] = 'F'
    df_MASSETER_DROIT['E7_CREPITE_OUVER'] = 'F'
    df_MASSETER_DROIT['E7_CREPITE_FERM'] = 'F'

    df_MASSETER_DROIT['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_DROIT['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_DROIT['ZONE'] = 'MAST'

    Y_MASSETER_DROIT_predicted = []
    Y_MASSETER_DROIT_PROBA = []
    for i in range(0,df_MASSETER_DROIT.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_MASSETER_DROIT.iloc[i].to_dict())
            Y_MASSETER_DROIT_predicted.append(vectorPredicted)
            Y_MASSETER_DROIT_PROBA.append(vectorPROBA)


    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour MASSETER GAUCHE
    ####################################################################################################################
    ####################################################################################################################

    df_MASSETER_GAUCHE = pd.DataFrame()
    df_MASSETER_GAUCHE['QS3'] = df['QS3'].apply(cleanQS3)

    df_MASSETER_GAUCHE['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E4B_HAB'] = df['E4_MS_G_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E4C_HAB'] = df['E4_MA_G_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PALP_G_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['E9_HAB_ZONE_SUB_REGION2'] = df['E9_PALP_G_MASSETER_INSERTION'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['E9_HAB_ZONE_SUB_REGION3'] = df['E9_PALP_G_MASSETER_ORIGIN'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E10_HAB'] = 'F'

    df_MASSETER_GAUCHE["E1A"] = df["E1_DOUL_G_MASSETER_BODY"].apply(preprocess_DOUL_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['ZONE'] = 'MAST'

    df_MASSETER_GAUCHE['E9_REF_ZONE_SUB_REGION1'] = df['E9_PALP_G_MASSETER_BODY'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['E9_REF_ZONE_SUB_REGION2'] = df['E9_PALP_G_MASSETER_INSERTION'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['E9_REF_ZONE_SUB_REGION3'] = df['E9_PALP_G_MASSETER_ORIGIN'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E10_REF'] = 'F'

    df_MASSETER_GAUCHE['E9_PROPA_ZONE_SUB_REGION1'] = df['E9_PALP_G_MASSETER_BODY'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['E9_PROPA_ZONE_SUB_REGION2'] = df['E9_PALP_G_MASSETER_INSERTION'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['E9_PROPA_ZONE_SUB_REGION3'] = df['E9_PALP_G_MASSETER_ORIGIN'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E10_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_MASSETER_GAUCHE['E10_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_MASSETER_GAUCHE['E10_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_MASSETER_GAUCHE['E5A_HAB'] = df['E5_LD_G_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E5B_HAB'] = df['E5_LG_G_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E5C_HAB'] = df['E5_PI_G_MASSETER_BODY'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E1B'] = df['E1B_G'].apply(preprocess_E1B_IS_AUTRE)

    df_MASSETER_GAUCHE['isTEMPORAL'] = 'F'

    df_MASSETER_GAUCHE['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E5A_MAL_TETE'] = 'F'
    df_MASSETER_GAUCHE['E5B_MAL_TETE'] = 'F'
    df_MASSETER_GAUCHE['E5C_MAL_TETE'] = 'F'

    df_MASSETER_GAUCHE['E9_MAL_TETE_ZONE1'] = 'F'
    df_MASSETER_GAUCHE['E9_MAL_TETE_ZONE2'] = 'F'
    df_MASSETER_GAUCHE['E9_MAL_TETE_ZONE3'] = 'F'

    df_MASSETER_GAUCHE['E4B_MAL_TETE'] = 'F'
    df_MASSETER_GAUCHE['E4C_MAL_TETE'] = 'F'

    df_MASSETER_GAUCHE['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E6_CRAQUE_PATIENT'] = 'F'
    df_MASSETER_GAUCHE['E6_CREPITE_PATIENT'] = 'F'
    df_MASSETER_GAUCHE['E7_CRAQUE_PATIENT'] = 'F'
    df_MASSETER_GAUCHE['E7_CREPITE_PATIENT'] = 'F'

    df_MASSETER_GAUCHE['E6_CRAQUE_OUVERT'] = 'F'
    df_MASSETER_GAUCHE['E6_CRAQUE_FERM'] = 'F'
    df_MASSETER_GAUCHE['E7_CRAQUE'] = 'F'

    df_MASSETER_GAUCHE['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E8_BLOCAGE_OUVERT'] = 'F'

    df_MASSETER_GAUCHE['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_MASSETER_GAUCHE['E6_CREPITE_OUVER'] = 'F'
    df_MASSETER_GAUCHE['E6_CREPITE_FERM'] = 'F'
    df_MASSETER_GAUCHE['E7_CREPITE_OUVER'] = 'F'
    df_MASSETER_GAUCHE['E7_CREPITE_FERM'] = 'F'

    df_MASSETER_GAUCHE['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_MASSETER_GAUCHE['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_MASSETER_GAUCHE['ZONE'] = 'MAST'


    Y_MASSETER_GAUCHE_predicted = []
    Y_MASSETER_GAUCHE_PROBA= []
    for i in range(0,df_MASSETER_GAUCHE.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_MASSETER_GAUCHE.iloc[i].to_dict())
            Y_MASSETER_GAUCHE_predicted.append(vectorPredicted)
            Y_MASSETER_GAUCHE_PROBA.append(vectorPROBA)


    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour TEMPORAL DROIT
    ####################################################################################################################
    ####################################################################################################################

    df_TEMPORAL_DROIT = pd.DataFrame()
    df_TEMPORAL_DROIT['QS3'] = df['QS3'].apply(cleanQS3)

    df_TEMPORAL_DROIT['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E4B_HAB'] = df['E4_MS_D_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E4C_HAB'] = df['E4_MA_D_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PALP_D_TEMPORAL_ANTERIOR'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['E9_HAB_ZONE_SUB_REGION2'] = df['E9_PALP_D_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['E9_HAB_ZONE_SUB_REGION3'] = df['E9_PALP_D_TEMPORAL_POSTERIOR'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E10_HAB'] = 'F'

    df_TEMPORAL_DROIT["E1A"] = df["E1_DOUL_D_TEMPORAL_MIDDLE"].apply(preprocess_DOUL_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['ZONE'] = 'MAST'

    df_TEMPORAL_DROIT['E9_REF_ZONE_SUB_REGION1'] = df['E9_PALP_D_TEMPORAL_ANTERIOR'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['E9_REF_ZONE_SUB_REGION2'] = df['E9_PALP_D_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['E9_REF_ZONE_SUB_REGION3'] = df['E9_PALP_D_TEMPORAL_POSTERIOR'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E10_REF'] = 'F'

    df_TEMPORAL_DROIT['E9_PROPA_ZONE_SUB_REGION1'] = df['E9_PALP_D_TEMPORAL_ANTERIOR'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['E9_PROPA_ZONE_SUB_REGION2'] = df['E9_PALP_D_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['E9_PROPA_ZONE_SUB_REGION3'] = df['E9_PALP_D_TEMPORAL_POSTERIOR'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E10_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_TEMPORAL_DROIT['E10_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_TEMPORAL_DROIT['E10_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_TEMPORAL_DROIT['E5A_HAB'] = df['E5_LD_D_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E5B_HAB'] = df['E5_LG_D_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E5C_HAB'] = df['E5_PI_D_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E1B'] = df['E1B_D'].apply(preprocess_E1B_IS_TEMPORAL)

    df_TEMPORAL_DROIT['isTEMPORAL'] = 'T'

    df_TEMPORAL_DROIT['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E5A_MAL_TETE'] = df['E5_LD_MT_D_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_DROIT['E5B_MAL_TETE'] = df['E5_LG_MT_D_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_DROIT['E5C_MAL_TETE'] = df['E5_PI_MT_D_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)

    df_TEMPORAL_DROIT['E9_MAL_TETE_ZONE1'] = df['E9_PALP_MT_D_TEMPORAL_ANTERIOR'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_DROIT['E9_MAL_TETE_ZONE2'] = df['E9_PALP_MT_D_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_DROIT['E9_MAL_TETE_ZONE3'] = df['E9_PALP_MT_D_TEMPORAL_POSTERIOR'].apply(preprocess_TRUE_FALSE_TO_T_F)

    df_TEMPORAL_DROIT['E4B_MAL_TETE'] = df['E4_MS_MT_D_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_DROIT['E4C_MAL_TETE'] = df['E4_MA_MT_D_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)

    df_TEMPORAL_DROIT['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E6_CRAQUE_PATIENT'] = 'F'
    df_TEMPORAL_DROIT['E6_CREPITE_PATIENT'] = 'F'
    df_TEMPORAL_DROIT['E7_CRAQUE_PATIENT'] = 'F'
    df_TEMPORAL_DROIT['E7_CREPITE_PATIENT'] = 'F'

    df_TEMPORAL_DROIT['E6_CRAQUE_OUVERT'] = 'F'
    df_TEMPORAL_DROIT['E6_CRAQUE_FERM'] = 'F'
    df_TEMPORAL_DROIT['E7_CRAQUE'] = 'F'

    df_TEMPORAL_DROIT['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E8_BLOCAGE_OUVERT'] = 'F'

    df_TEMPORAL_DROIT['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_TEMPORAL_DROIT['E6_CREPITE_OUVER'] = 'F'
    df_TEMPORAL_DROIT['E6_CREPITE_FERM'] = 'F'
    df_TEMPORAL_DROIT['E7_CREPITE_OUVER'] = 'F'
    df_TEMPORAL_DROIT['E7_CREPITE_FERM'] = 'F'

    df_TEMPORAL_DROIT['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_DROIT['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_DROIT['ZONE'] = 'MAST'


    Y_TEMPORAL_DROIT_predicted = []
    Y_TEMPORAL_DROIT_PROBA = []
    for i in range(0,df_TEMPORAL_DROIT.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_TEMPORAL_DROIT.iloc[i].to_dict())
            Y_TEMPORAL_DROIT_predicted.append(vectorPredicted)
            Y_TEMPORAL_DROIT_PROBA.append(vectorPROBA)


    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour TEMPORAL GAUCHE
    ####################################################################################################################
    ####################################################################################################################

    df_TEMPORAL_GAUCHE = pd.DataFrame()
    df_TEMPORAL_GAUCHE['QS3'] = df['QS3'].apply(cleanQS3)

    df_TEMPORAL_GAUCHE['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E4B_HAB'] = df['E4_MS_G_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E4C_HAB'] = df['E4_MA_G_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PALP_G_TEMPORAL_ANTERIOR'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['E9_HAB_ZONE_SUB_REGION2'] = df['E9_PALP_G_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['E9_HAB_ZONE_SUB_REGION3'] = df['E9_PALP_G_TEMPORAL_POSTERIOR'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E10_HAB'] = 'F'

    df_TEMPORAL_GAUCHE["E1A"] = df["E1_DOUL_G_TEMPORAL_MIDDLE"].apply(preprocess_DOUL_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['ZONE'] = 'MAST'

    df_TEMPORAL_GAUCHE['E9_REF_ZONE_SUB_REGION1'] = df['E9_PALP_G_TEMPORAL_ANTERIOR'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['E9_REF_ZONE_SUB_REGION2'] = df['E9_PALP_G_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['E9_REF_ZONE_SUB_REGION3'] = df['E9_PALP_G_TEMPORAL_POSTERIOR'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E10_REF'] = 'F'

    df_TEMPORAL_GAUCHE['E9_PROPA_ZONE_SUB_REGION1'] = df['E9_PALP_G_TEMPORAL_ANTERIOR'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['E9_PROPA_ZONE_SUB_REGION2'] = df['E9_PALP_G_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['E9_PROPA_ZONE_SUB_REGION3'] = df['E9_PALP_G_TEMPORAL_POSTERIOR'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E10_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_TEMPORAL_GAUCHE['E10_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_TEMPORAL_GAUCHE['E10_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_TEMPORAL_GAUCHE['E5A_HAB'] = df['E5_LD_G_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E5B_HAB'] = df['E5_LG_G_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E5C_HAB'] = df['E5_PI_G_TEMPORAL_MIDDLE'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E1B'] = df['E1B_G'].apply(preprocess_E1B_IS_TEMPORAL)

    df_TEMPORAL_GAUCHE['isTEMPORAL'] = 'T'

    df_TEMPORAL_GAUCHE['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E5A_MAL_TETE'] = df['E5_LD_MT_G_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_GAUCHE['E5B_MAL_TETE'] = df['E5_LG_MT_G_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_GAUCHE['E5C_MAL_TETE'] = df['E5_PI_MT_G_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)

    df_TEMPORAL_GAUCHE['E9_MAL_TETE_ZONE1'] = df['E9_PALP_MT_G_TEMPORAL_ANTERIOR'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_GAUCHE['E9_MAL_TETE_ZONE2'] = df['E9_PALP_MT_G_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_GAUCHE['E9_MAL_TETE_ZONE3'] = df['E9_PALP_MT_G_TEMPORAL_POSTERIOR'].apply(preprocess_TRUE_FALSE_TO_T_F)

    df_TEMPORAL_GAUCHE['E4B_MAL_TETE'] = df['E4_MS_MT_G_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)
    df_TEMPORAL_GAUCHE['E4C_MAL_TETE'] = df['E4_MA_MT_G_TEMPORAL_MIDDLE'].apply(preprocess_TRUE_FALSE_TO_T_F)

    df_TEMPORAL_GAUCHE['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E6_CRAQUE_PATIENT'] = 'F'
    df_TEMPORAL_GAUCHE['E6_CREPITE_PATIENT'] = 'F'
    df_TEMPORAL_GAUCHE['E7_CRAQUE_PATIENT'] = 'F'
    df_TEMPORAL_GAUCHE['E7_CREPITE_PATIENT'] = 'F'

    df_TEMPORAL_GAUCHE['E6_CRAQUE_OUVERT'] = 'F'
    df_TEMPORAL_GAUCHE['E6_CRAQUE_FERM'] = 'F'
    df_TEMPORAL_GAUCHE['E7_CRAQUE'] = 'F'

    df_TEMPORAL_GAUCHE['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E8_BLOCAGE_OUVERT'] = 'F'

    df_TEMPORAL_GAUCHE['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_TEMPORAL_GAUCHE['E6_CREPITE_OUVER'] = 'F'
    df_TEMPORAL_GAUCHE['E6_CREPITE_FERM'] = 'F'
    df_TEMPORAL_GAUCHE['E7_CREPITE_OUVER'] = 'F'
    df_TEMPORAL_GAUCHE['E7_CREPITE_FERM'] = 'F'

    df_TEMPORAL_GAUCHE['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TEMPORAL_GAUCHE['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TEMPORAL_GAUCHE['ZONE'] = 'MAST'

    Y_TEMPORAL_GAUCHE_predicted = []
    Y_TEMPORAL_GAUCHE_PROBA = []
    for i in range(0,df_TEMPORAL_GAUCHE.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_TEMPORAL_GAUCHE.iloc[i].to_dict())
            Y_TEMPORAL_GAUCHE_predicted.append(vectorPredicted)
            Y_TEMPORAL_GAUCHE_PROBA.append(vectorPROBA)

    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour PTERIGOIDIEN DROIT
    ####################################################################################################################
    ####################################################################################################################

    df_PTERIGOIDIEN_DROIT = pd.DataFrame()
    df_PTERIGOIDIEN_DROIT['QS3'] = df['QS3'].apply(cleanQS3)

    df_PTERIGOIDIEN_DROIT['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E4B_HAB'] = df['E4_MS_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E4C_HAB'] = df['E4_MA_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['E9_HAB_ZONE_SUB_REGION2'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['E9_HAB_ZONE_SUB_REGION3'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E10_HAB'] = df['E10_REG_PTER_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_PTERIGOIDIEN_DROIT["E1A"] = df["E1_DOUL_D_PTERIGOIDIENMEDIAL"].apply(preprocess_DOUL_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['ZONE'] = 'MAST'

    df_PTERIGOIDIEN_DROIT['E9_REF_ZONE_SUB_REGION1'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['E9_REF_ZONE_SUB_REGION2'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['E9_REF_ZONE_SUB_REGION3'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E10_REF'] = df['E10_REG_PTER_DOUL_REF_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_PTERIGOIDIEN_DROIT['E9_PROPA_ZONE_SUB_REGION1'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['E9_PROPA_ZONE_SUB_REGION2'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['E9_PROPA_ZONE_SUB_REGION3'] = df['E9_PALP_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E10_PROPA_ZONE_SUB_REGION1'] = df['E10_REG_PTER_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['E10_PROPA_ZONE_SUB_REGION2'] = df['E10_REG_PTER_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['E10_PROPA_ZONE_SUB_REGION3'] = df['E10_REG_PTER_DOUL_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E5A_HAB'] = df['E5_LD_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E5B_HAB'] = df['E5_LG_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E5C_HAB'] = df['E5_PI_D_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E1B'] = df['E1B_D'].apply(preprocess_E1B_IS_AUTRE)

    df_PTERIGOIDIEN_DROIT['isTEMPORAL'] = 'F'

    df_PTERIGOIDIEN_DROIT['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E5A_MAL_TETE'] = 'F'
    df_PTERIGOIDIEN_DROIT['E5B_MAL_TETE'] = 'F'
    df_PTERIGOIDIEN_DROIT['E5C_MAL_TETE'] = 'F'

    df_PTERIGOIDIEN_DROIT['E9_MAL_TETE_ZONE1'] = 'F'
    df_PTERIGOIDIEN_DROIT['E9_MAL_TETE_ZONE2'] = 'F'
    df_PTERIGOIDIEN_DROIT['E9_MAL_TETE_ZONE3'] = 'F'

    df_PTERIGOIDIEN_DROIT['E4B_MAL_TETE'] = 'F'
    df_PTERIGOIDIEN_DROIT['E4C_MAL_TETE'] = 'F'

    df_PTERIGOIDIEN_DROIT['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E6_CRAQUE_PATIENT'] = 'F'
    df_PTERIGOIDIEN_DROIT['E6_CREPITE_PATIENT'] = 'F'
    df_PTERIGOIDIEN_DROIT['E7_CRAQUE_PATIENT'] = 'F'
    df_PTERIGOIDIEN_DROIT['E7_CREPITE_PATIENT'] = 'F'

    df_PTERIGOIDIEN_DROIT['E6_CRAQUE_OUVERT'] = 'F'
    df_PTERIGOIDIEN_DROIT['E6_CRAQUE_FERM'] = 'F'
    df_PTERIGOIDIEN_DROIT['E7_CRAQUE'] = 'F'

    df_PTERIGOIDIEN_DROIT['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E8_BLOCAGE_OUVERT'] = 'F'

    df_PTERIGOIDIEN_DROIT['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_PTERIGOIDIEN_DROIT['E6_CREPITE_OUVER'] = 'F'
    df_PTERIGOIDIEN_DROIT['E6_CREPITE_FERM'] = 'F'
    df_PTERIGOIDIEN_DROIT['E7_CREPITE_OUVER'] = 'F'
    df_PTERIGOIDIEN_DROIT['E7_CREPITE_FERM'] = 'F'

    df_PTERIGOIDIEN_DROIT['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_DROIT['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_DROIT['ZONE'] = 'MAST'

    Y_PTERIGOIDIEN_DROIT_predicted = []
    Y_PTERIGOIDIEN_DROIT_PROBA = []
    for i in range(0,df_PTERIGOIDIEN_DROIT.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_PTERIGOIDIEN_DROIT.iloc[i].to_dict())
            Y_PTERIGOIDIEN_DROIT_predicted.append(vectorPredicted)
            Y_PTERIGOIDIEN_DROIT_PROBA.append(vectorPROBA)


    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour PTERIGOIDIEN GAUCHE
    ####################################################################################################################
    ####################################################################################################################

    df_PTERIGOIDIEN_GAUCHE = pd.DataFrame()
    df_PTERIGOIDIEN_GAUCHE['QS3'] = df['QS3'].apply(cleanQS3)

    df_PTERIGOIDIEN_GAUCHE['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E4B_HAB'] = df['E4_MS_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E4C_HAB'] = df['E4_MA_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['E9_HAB_ZONE_SUB_REGION2'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['E9_HAB_ZONE_SUB_REGION3'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E10_HAB'] = df['E10_REG_PTER_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_PTERIGOIDIEN_GAUCHE["E1A"] = df["E1_DOUL_G_PTERIGOIDIENMEDIAL"].apply(preprocess_DOUL_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['ZONE'] = 'MAST'

    df_PTERIGOIDIEN_GAUCHE['E9_REF_ZONE_SUB_REGION1'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['E9_REF_ZONE_SUB_REGION2'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['E9_REF_ZONE_SUB_REGION3'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E10_REF'] = df['E10_REG_PTER_DOUL_REF_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_PTERIGOIDIEN_GAUCHE['E9_PROPA_ZONE_SUB_REGION1'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['E9_PROPA_ZONE_SUB_REGION2'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['E9_PROPA_ZONE_SUB_REGION3'] = df['E9_PALP_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E10_PROPA_ZONE_SUB_REGION1'] = df['E10_REG_PTER_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['E10_PROPA_ZONE_SUB_REGION2'] = df['E10_REG_PTER_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['E10_PROPA_ZONE_SUB_REGION3'] = df['E10_REG_PTER_DOUL_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E5A_HAB'] = df['E5_LD_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E5B_HAB'] = df['E5_LG_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E5C_HAB'] = df['E5_PI_G_PTERIGOIDIENMEDIAL'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E1B'] = df['E1B_G'].apply(preprocess_E1B_IS_AUTRE)

    df_PTERIGOIDIEN_GAUCHE['isTEMPORAL'] = 'F'

    df_PTERIGOIDIEN_GAUCHE['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E5A_MAL_TETE'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E5B_MAL_TETE'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E5C_MAL_TETE'] = 'F'

    df_PTERIGOIDIEN_GAUCHE['E9_MAL_TETE_ZONE1'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E9_MAL_TETE_ZONE2'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E9_MAL_TETE_ZONE3'] = 'F'

    df_PTERIGOIDIEN_GAUCHE['E4B_MAL_TETE'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E4C_MAL_TETE'] = 'F'

    df_PTERIGOIDIEN_GAUCHE['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E6_CRAQUE_PATIENT'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E6_CREPITE_PATIENT'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E7_CRAQUE_PATIENT'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E7_CREPITE_PATIENT'] = 'F'

    df_PTERIGOIDIEN_GAUCHE['E6_CRAQUE_OUVERT'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E6_CRAQUE_FERM'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E7_CRAQUE'] = 'F'

    df_PTERIGOIDIEN_GAUCHE['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E8_BLOCAGE_OUVERT'] = 'F'

    df_PTERIGOIDIEN_GAUCHE['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_PTERIGOIDIEN_GAUCHE['E6_CREPITE_OUVER'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E6_CREPITE_FERM'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E7_CREPITE_OUVER'] = 'F'
    df_PTERIGOIDIEN_GAUCHE['E7_CREPITE_FERM'] = 'F'

    df_PTERIGOIDIEN_GAUCHE['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_PTERIGOIDIEN_GAUCHE['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_PTERIGOIDIEN_GAUCHE['ZONE'] = 'MAST'


    Y_PTERIGOIDIEN_GAUCHE_predicted = []
    Y_PTERIGOIDIEN_GAUCHE_PROBA = []
    for i in range(0,df_PTERIGOIDIEN_GAUCHE.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_PTERIGOIDIEN_GAUCHE.iloc[i].to_dict())
            Y_PTERIGOIDIEN_GAUCHE_predicted.append(vectorPredicted)
            Y_PTERIGOIDIEN_GAUCHE_PROBA.append(vectorPROBA)



    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour DIGASTRIQUE DROIT
    ####################################################################################################################
    ####################################################################################################################

    df_DIGASTRIQUE_DROIT = pd.DataFrame()
    df_DIGASTRIQUE_DROIT['QS3'] = df['QS3'].apply(cleanQS3)

    df_DIGASTRIQUE_DROIT['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E4B_HAB'] = df['E4_MS_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E4C_HAB'] = df['E4_MA_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['E9_HAB_ZONE_SUB_REGION2'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['E9_HAB_ZONE_SUB_REGION3'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E10_HAB'] = df['E10_REG_MAND_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_DIGASTRIQUE_DROIT["E1A"] = df["E1_DOUL_D_DIGASTRIQUEPOS"].apply(preprocess_DOUL_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['ZONE'] = 'MAST'

    df_DIGASTRIQUE_DROIT['E9_REF_ZONE_SUB_REGION1'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['E9_REF_ZONE_SUB_REGION2'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['E9_REF_ZONE_SUB_REGION3'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E10_REF'] = df['E10_REG_MAND_DOUL_REF_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_DIGASTRIQUE_DROIT['E9_PROPA_ZONE_SUB_REGION1'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['E9_PROPA_ZONE_SUB_REGION2'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['E9_PROPA_ZONE_SUB_REGION3'] = df['E9_PALP_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E10_PROPA_ZONE_SUB_REGION1'] = df['E10_REG_MAND_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['E10_PROPA_ZONE_SUB_REGION2'] = df['E10_REG_MAND_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['E10_PROPA_ZONE_SUB_REGION3'] = df['E10_REG_MAND_DOUL_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E5A_HAB'] = df['E5_LD_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E5B_HAB'] = df['E5_LG_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E5C_HAB'] = df['E5_PI_D_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E1B'] = df['E1B_D'].apply(preprocess_E1B_IS_AUTRE)

    df_DIGASTRIQUE_DROIT['isTEMPORAL'] = 'F'

    df_DIGASTRIQUE_DROIT['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E5A_MAL_TETE'] = 'F'
    df_DIGASTRIQUE_DROIT['E5B_MAL_TETE'] = 'F'
    df_DIGASTRIQUE_DROIT['E5C_MAL_TETE'] = 'F'

    df_DIGASTRIQUE_DROIT['E9_MAL_TETE_ZONE1'] = 'F'
    df_DIGASTRIQUE_DROIT['E9_MAL_TETE_ZONE2'] = 'F'
    df_DIGASTRIQUE_DROIT['E9_MAL_TETE_ZONE3'] = 'F'

    df_DIGASTRIQUE_DROIT['E4B_MAL_TETE'] = 'F'
    df_DIGASTRIQUE_DROIT['E4C_MAL_TETE'] = 'F'

    df_DIGASTRIQUE_DROIT['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E6_CRAQUE_PATIENT'] = 'F'
    df_DIGASTRIQUE_DROIT['E6_CREPITE_PATIENT'] = 'F'
    df_DIGASTRIQUE_DROIT['E7_CRAQUE_PATIENT'] = 'F'
    df_DIGASTRIQUE_DROIT['E7_CREPITE_PATIENT'] = 'F'

    df_DIGASTRIQUE_DROIT['E6_CRAQUE_OUVERT'] = 'F'
    df_DIGASTRIQUE_DROIT['E6_CRAQUE_FERM'] = 'F'
    df_DIGASTRIQUE_DROIT['E7_CRAQUE'] = 'F'

    df_DIGASTRIQUE_DROIT['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E8_BLOCAGE_OUVERT'] = 'F'

    df_DIGASTRIQUE_DROIT['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_DIGASTRIQUE_DROIT['E6_CREPITE_OUVER'] = 'F'
    df_DIGASTRIQUE_DROIT['E6_CREPITE_FERM'] = 'F'
    df_DIGASTRIQUE_DROIT['E7_CREPITE_OUVER'] = 'F'
    df_DIGASTRIQUE_DROIT['E7_CREPITE_FERM'] = 'F'

    df_DIGASTRIQUE_DROIT['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_DROIT['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_DROIT['ZONE'] = 'MAST'


    Y_DIGASTRIQUE_DROIT_predicted = []
    Y_DIGASTRIQUE_DROIT_PROBA = []
    for i in range(0,df_DIGASTRIQUE_DROIT.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_DIGASTRIQUE_DROIT.iloc[i].to_dict())
            Y_DIGASTRIQUE_DROIT_predicted.append(vectorPredicted)
            Y_DIGASTRIQUE_DROIT_PROBA.append(vectorPROBA)


    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour DIGASTRIQUE GAUCHE
    ####################################################################################################################
    ####################################################################################################################

    df_DIGASTRIQUE_GAUCHE = pd.DataFrame()
    df_DIGASTRIQUE_GAUCHE['QS3'] = df['QS3'].apply(cleanQS3)

    df_DIGASTRIQUE_GAUCHE['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E4B_HAB'] = df['E4_MS_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E4C_HAB'] = df['E4_MA_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['E9_HAB_ZONE_SUB_REGION2'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['E9_HAB_ZONE_SUB_REGION3'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E10_HAB'] = df['E10_REG_MAND_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_DIGASTRIQUE_GAUCHE["E1A"] = df["E1_DOUL_G_DIGASTRIQUEPOS"].apply(preprocess_DOUL_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['ZONE'] = 'MAST'

    df_DIGASTRIQUE_GAUCHE['E9_REF_ZONE_SUB_REGION1'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['E9_REF_ZONE_SUB_REGION2'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['E9_REF_ZONE_SUB_REGION3'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_REF_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E10_REF'] = df['E10_REG_MAND_DOUL_REF_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_DIGASTRIQUE_GAUCHE['E9_PROPA_ZONE_SUB_REGION1'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['E9_PROPA_ZONE_SUB_REGION2'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['E9_PROPA_ZONE_SUB_REGION3'] = df['E9_PALP_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_PROPA_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E10_PROPA_ZONE_SUB_REGION1'] = df['E10_REG_MAND_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['E10_PROPA_ZONE_SUB_REGION2'] = df['E10_REG_MAND_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['E10_PROPA_ZONE_SUB_REGION3'] = df['E10_REG_MAND_DOUL_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E5A_HAB'] = df['E5_LD_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E5B_HAB'] = df['E5_LG_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E5C_HAB'] = df['E5_PI_G_DIGASTRIQUEPOS'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E1B'] = df['E1B_G'].apply(preprocess_E1B_IS_AUTRE)

    df_DIGASTRIQUE_GAUCHE['isTEMPORAL'] = 'F'

    df_DIGASTRIQUE_GAUCHE['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E5A_MAL_TETE'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E5B_MAL_TETE'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E5C_MAL_TETE'] = 'F'

    df_DIGASTRIQUE_GAUCHE['E9_MAL_TETE_ZONE1'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E9_MAL_TETE_ZONE2'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E9_MAL_TETE_ZONE3'] = 'F'

    df_DIGASTRIQUE_GAUCHE['E4B_MAL_TETE'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E4C_MAL_TETE'] = 'F'

    df_DIGASTRIQUE_GAUCHE['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E6_CRAQUE_PATIENT'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E6_CREPITE_PATIENT'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E7_CRAQUE_PATIENT'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E7_CREPITE_PATIENT'] = 'F'

    df_DIGASTRIQUE_GAUCHE['E6_CRAQUE_OUVERT'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E6_CRAQUE_FERM'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E7_CRAQUE'] = 'F'

    df_DIGASTRIQUE_GAUCHE['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E8_BLOCAGE_OUVERT'] = 'F'

    df_DIGASTRIQUE_GAUCHE['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_DIGASTRIQUE_GAUCHE['E6_CREPITE_OUVER'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E6_CREPITE_FERM'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E7_CREPITE_OUVER'] = 'F'
    df_DIGASTRIQUE_GAUCHE['E7_CREPITE_FERM'] = 'F'

    df_DIGASTRIQUE_GAUCHE['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_DIGASTRIQUE_GAUCHE['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_DIGASTRIQUE_GAUCHE['ZONE'] = 'MAST'

    Y_DIGASTRIQUE_GAUCHE_predicted = []
    Y_DIGASTRIQUE_GAUCHE_PROBA = []
    for i in range(0,df_DIGASTRIQUE_GAUCHE.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_DIGASTRIQUE_GAUCHE.iloc[i].to_dict())
            Y_DIGASTRIQUE_GAUCHE_predicted.append(vectorPredicted)
            Y_DIGASTRIQUE_GAUCHE_PROBA.append(vectorPROBA)


    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour SOUS MANDIBULAIRE DROIT
    ####################################################################################################################
    ####################################################################################################################

    df_SOUS_MANDIBULAIRE_DROIT = pd.DataFrame()
    df_SOUS_MANDIBULAIRE_DROIT['QS3'] = df['QS3'].apply(cleanQS3)

    df_SOUS_MANDIBULAIRE_DROIT['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_DROIT['E4B_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E4C_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E9_HAB_ZONE_SUB_REGION1'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E9_HAB_ZONE_SUB_REGION2'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E9_HAB_ZONE_SUB_REGION3'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E10_HAB'] = df['E10_REG_SOUS_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_SOUS_MANDIBULAIRE_DROIT["E1A"] = 'T'

    df_SOUS_MANDIBULAIRE_DROIT['ZONE'] = 'MAST'

    df_SOUS_MANDIBULAIRE_DROIT['E9_REF_ZONE_SUB_REGION1'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E9_REF_ZONE_SUB_REGION2'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E9_REF_ZONE_SUB_REGION3'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E10_REF'] = df['E10_REG_SOUS_DOUL_REF_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_SOUS_MANDIBULAIRE_DROIT['E9_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E9_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E9_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E10_PROPA_ZONE_SUB_REGION1'] = df['E10_REG_SOUS_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['E10_PROPA_ZONE_SUB_REGION2'] = df['E10_REG_SOUS_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['E10_PROPA_ZONE_SUB_REGION3'] = df['E10_REG_SOUS_DOUL_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_DROIT['E5A_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E5B_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E5C_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E1B'] = df['E1B_D'].apply(preprocess_E1B_IS_AUTRE)

    df_SOUS_MANDIBULAIRE_DROIT['isTEMPORAL'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_DROIT['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_DROIT['E5A_MAL_TETE'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E5B_MAL_TETE'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E5C_MAL_TETE'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E9_MAL_TETE_ZONE1'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E9_MAL_TETE_ZONE2'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E9_MAL_TETE_ZONE3'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E4B_MAL_TETE'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E4C_MAL_TETE'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_DROIT['E6_CRAQUE_PATIENT'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E6_CREPITE_PATIENT'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E7_CRAQUE_PATIENT'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E7_CREPITE_PATIENT'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['E6_CRAQUE_OUVERT'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E6_CRAQUE_FERM'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E7_CRAQUE'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_DROIT['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_DROIT['E8_BLOCAGE_OUVERT'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_DROIT['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_SOUS_MANDIBULAIRE_DROIT['E6_CREPITE_OUVER'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E6_CREPITE_FERM'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E7_CREPITE_OUVER'] = 'F'
    df_SOUS_MANDIBULAIRE_DROIT['E7_CREPITE_FERM'] = 'F'

    df_SOUS_MANDIBULAIRE_DROIT['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_DROIT['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)


    Y_SOUS_MANDIBULAIRE_DROIT_predicted = []
    Y_SOUS_MANDIBULAIRE_DROIT_PROBA = []
    for i in range(0,df_SOUS_MANDIBULAIRE_DROIT.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_SOUS_MANDIBULAIRE_DROIT.iloc[i].to_dict())
            Y_SOUS_MANDIBULAIRE_DROIT_predicted.append(vectorPredicted)
            Y_SOUS_MANDIBULAIRE_DROIT_PROBA.append(vectorPROBA)


    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour SOUS MANDIBULAIRE GAUCHE
    ####################################################################################################################
    ####################################################################################################################

    df_SOUS_MANDIBULAIRE_GAUCHE = pd.DataFrame()
    df_SOUS_MANDIBULAIRE_GAUCHE['QS3'] = df['QS3'].apply(cleanQS3)

    df_SOUS_MANDIBULAIRE_GAUCHE['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_GAUCHE['E4B_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E4C_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E9_HAB_ZONE_SUB_REGION1'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E9_HAB_ZONE_SUB_REGION2'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E9_HAB_ZONE_SUB_REGION3'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E10_HAB'] = df['E10_REG_SOUS_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_SOUS_MANDIBULAIRE_GAUCHE["E1A"] = 'T'

    df_SOUS_MANDIBULAIRE_GAUCHE['ZONE'] = 'MAST'

    df_SOUS_MANDIBULAIRE_GAUCHE['E9_REF_ZONE_SUB_REGION1'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E9_REF_ZONE_SUB_REGION2'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E9_REF_ZONE_SUB_REGION3'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E10_REF'] = df['E10_REG_SOUS_DOUL_REF_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_SOUS_MANDIBULAIRE_GAUCHE['E9_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E9_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E9_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E10_PROPA_ZONE_SUB_REGION1'] = df['E10_REG_SOUS_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['E10_PROPA_ZONE_SUB_REGION2'] = df['E10_REG_SOUS_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['E10_PROPA_ZONE_SUB_REGION3'] = df['E10_REG_SOUS_DOUL_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_GAUCHE['E5A_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E5B_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E5C_HAB'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E1B'] = df['E1B_G'].apply(preprocess_E1B_IS_AUTRE)

    df_SOUS_MANDIBULAIRE_GAUCHE['isTEMPORAL'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_GAUCHE['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_GAUCHE['E5A_MAL_TETE'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E5B_MAL_TETE'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E5C_MAL_TETE'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E9_MAL_TETE_ZONE1'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E9_MAL_TETE_ZONE2'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E9_MAL_TETE_ZONE3'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E4B_MAL_TETE'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E4C_MAL_TETE'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_GAUCHE['E6_CRAQUE_PATIENT'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E6_CREPITE_PATIENT'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E7_CRAQUE_PATIENT'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E7_CREPITE_PATIENT'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['E6_CRAQUE_OUVERT'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E6_CRAQUE_FERM'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E7_CRAQUE'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_GAUCHE['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_GAUCHE['E8_BLOCAGE_OUVERT'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_SOUS_MANDIBULAIRE_GAUCHE['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_SOUS_MANDIBULAIRE_GAUCHE['E6_CREPITE_OUVER'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E6_CREPITE_FERM'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E7_CREPITE_OUVER'] = 'F'
    df_SOUS_MANDIBULAIRE_GAUCHE['E7_CREPITE_FERM'] = 'F'

    df_SOUS_MANDIBULAIRE_GAUCHE['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_SOUS_MANDIBULAIRE_GAUCHE['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)


    Y_SOUS_MANDIBULAIRE_GAUCHE_predicted = []
    Y_SOUS_MANDIBULAIRE_GAUCHE_PROBA = []
    for i in range(0,df_SOUS_MANDIBULAIRE_GAUCHE.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_SOUS_MANDIBULAIRE_GAUCHE.iloc[i].to_dict())
            Y_SOUS_MANDIBULAIRE_GAUCHE_predicted.append(vectorPredicted)
            Y_SOUS_MANDIBULAIRE_GAUCHE_PROBA.append(vectorPROBA)



    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour TENDON_TEMPORAL_DROIT
    ####################################################################################################################
    ####################################################################################################################

    df_TENDON_TEMPORAL_DROIT = pd.DataFrame()
    df_TENDON_TEMPORAL_DROIT['QS3'] = df['QS3'].apply(cleanQS3)

    df_TENDON_TEMPORAL_DROIT['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_DROIT['E4B_HAB'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E4C_HAB'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E9_HAB_ZONE_SUB_REGION1'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E9_HAB_ZONE_SUB_REGION2'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E9_HAB_ZONE_SUB_REGION3'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E10_HAB'] = df['E10_TEND_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_TENDON_TEMPORAL_DROIT["E1A"] = 'T'

    df_TENDON_TEMPORAL_DROIT['ZONE'] = 'MAST'

    df_TENDON_TEMPORAL_DROIT['E9_REF_ZONE_SUB_REGION1'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E9_REF_ZONE_SUB_REGION2'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E9_REF_ZONE_SUB_REGION3'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E10_REF'] = df['E10_TEND_DOUL_REF_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_TENDON_TEMPORAL_DROIT['E9_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E9_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E9_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E10_PROPA_ZONE_SUB_REGION1'] = df['E10_TEND_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['E10_PROPA_ZONE_SUB_REGION2'] = df['E10_TEND_DOUL_HAB_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['E10_PROPA_ZONE_SUB_REGION3'] = df['E10_TEND_DOUL_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_DROIT['E5A_HAB'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E5B_HAB'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E5C_HAB'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E1B'] = df['E1B_D'].apply(preprocess_E1B_IS_AUTRE)

    df_TENDON_TEMPORAL_DROIT['isTEMPORAL'] = 'F'

    df_TENDON_TEMPORAL_DROIT['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_DROIT['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_DROIT['E5A_MAL_TETE'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E5B_MAL_TETE'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E5C_MAL_TETE'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E9_MAL_TETE_ZONE1'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E9_MAL_TETE_ZONE2'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E9_MAL_TETE_ZONE3'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E4B_MAL_TETE'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E4C_MAL_TETE'] = 'F'

    df_TENDON_TEMPORAL_DROIT['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_DROIT['E6_CRAQUE_PATIENT'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E6_CREPITE_PATIENT'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E7_CRAQUE_PATIENT'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E7_CREPITE_PATIENT'] = 'F'

    df_TENDON_TEMPORAL_DROIT['E6_CRAQUE_OUVERT'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E6_CRAQUE_FERM'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E7_CRAQUE'] = 'F'

    df_TENDON_TEMPORAL_DROIT['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_DROIT['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_DROIT['E8_BLOCAGE_OUVERT'] = 'F'

    df_TENDON_TEMPORAL_DROIT['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_DROIT['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_TENDON_TEMPORAL_DROIT['E6_CREPITE_OUVER'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E6_CREPITE_FERM'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E7_CREPITE_OUVER'] = 'F'
    df_TENDON_TEMPORAL_DROIT['E7_CREPITE_FERM'] = 'F'

    df_TENDON_TEMPORAL_DROIT['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_DROIT['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    Y_TENDON_TEMPORAL_DROIT_predicted = []
    Y_TENDON_TEMPORAL_DROIT_PROBA = []
    for i in range(0,df_TENDON_TEMPORAL_DROIT.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_TENDON_TEMPORAL_DROIT.iloc[i].to_dict())
            Y_TENDON_TEMPORAL_DROIT_predicted.append(vectorPredicted)
            Y_TENDON_TEMPORAL_DROIT_PROBA.append(vectorPROBA)



    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour TENDON_TEMPORAL_GAUCHE
    ####################################################################################################################
    ####################################################################################################################

    df_TENDON_TEMPORAL_GAUCHE = pd.DataFrame()
    df_TENDON_TEMPORAL_GAUCHE['QS3'] = df['QS3'].apply(cleanQS3)

    df_TENDON_TEMPORAL_GAUCHE['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_GAUCHE['E4B_HAB'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E4C_HAB'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E9_HAB_ZONE_SUB_REGION1'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E9_HAB_ZONE_SUB_REGION2'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E9_HAB_ZONE_SUB_REGION3'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E10_HAB'] = df['E10_TEND_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_TENDON_TEMPORAL_GAUCHE["E1A"] = 'T'

    df_TENDON_TEMPORAL_GAUCHE['ZONE'] = 'MAST'

    df_TENDON_TEMPORAL_GAUCHE['E9_REF_ZONE_SUB_REGION1'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E9_REF_ZONE_SUB_REGION2'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E9_REF_ZONE_SUB_REGION3'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E10_REF'] = df['E10_TEND_DOUL_REF_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 

    df_TENDON_TEMPORAL_GAUCHE['E9_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E9_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E9_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E10_PROPA_ZONE_SUB_REGION1'] = df['E10_TEND_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['E10_PROPA_ZONE_SUB_REGION2'] = df['E10_TEND_DOUL_HAB_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['E10_PROPA_ZONE_SUB_REGION3'] = df['E10_TEND_DOUL_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_GAUCHE['E5A_HAB'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E5B_HAB'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E5C_HAB'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E1B'] = df['E1B_G'].apply(preprocess_E1B_IS_AUTRE)

    df_TENDON_TEMPORAL_GAUCHE['isTEMPORAL'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_GAUCHE['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_GAUCHE['E5A_MAL_TETE'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E5B_MAL_TETE'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E5C_MAL_TETE'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E9_MAL_TETE_ZONE1'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E9_MAL_TETE_ZONE2'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E9_MAL_TETE_ZONE3'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E4B_MAL_TETE'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E4C_MAL_TETE'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_GAUCHE['E6_CRAQUE_PATIENT'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E6_CREPITE_PATIENT'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E7_CRAQUE_PATIENT'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E7_CREPITE_PATIENT'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['E6_CRAQUE_OUVERT'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E6_CRAQUE_FERM'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E7_CRAQUE'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_GAUCHE['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_GAUCHE['E8_BLOCAGE_OUVERT'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_TENDON_TEMPORAL_GAUCHE['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_TENDON_TEMPORAL_GAUCHE['E6_CREPITE_OUVER'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E6_CREPITE_FERM'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E7_CREPITE_OUVER'] = 'F'
    df_TENDON_TEMPORAL_GAUCHE['E7_CREPITE_FERM'] = 'F'

    df_TENDON_TEMPORAL_GAUCHE['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_TENDON_TEMPORAL_GAUCHE['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    Y_TENDON_TEMPORAL_GAUCHE_predicted = []
    Y_TENDON_TEMPORAL_GAUCHE_PROBA = []
    for i in range(0,df_TENDON_TEMPORAL_GAUCHE.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_TENDON_TEMPORAL_GAUCHE.iloc[i].to_dict())
            Y_TENDON_TEMPORAL_GAUCHE_predicted.append(vectorPredicted)
            Y_TENDON_TEMPORAL_GAUCHE_PROBA.append(vectorPROBA)





    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour ATM_DROIT
    ####################################################################################################################
    ####################################################################################################################

    df_ATM_DROIT = pd.DataFrame()
    df_ATM_DROIT['QS3'] = df['QS3'].apply(cleanQS3)

    df_ATM_DROIT['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_DROIT['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_DROIT['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_DROIT['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_DROIT['E4B_HAB'] = df['E4_MS_D_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_DROIT['E4C_HAB'] = df['E4_MA_D_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_DROIT['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PL_DH_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E9_HAB_ZONE_SUB_REGION2'] = df['E9_AL_DH_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E9_HAB_ZONE_SUB_REGION3'] = 'F'

    df_ATM_DROIT['E10_HAB'] = 'F'

    df_ATM_DROIT["E1A"] = df["E1_DOUL_D_ATM"].apply(preprocess_DOUL_TO_TRUE_FALSE) 

    df_ATM_DROIT['ZONE'] = 'ATM'

    df_ATM_DROIT['E9_REF_ZONE_SUB_REGION1'] = df['E9_PL_DOU_REF_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E9_REF_ZONE_SUB_REGION2'] = df['E9_AL_DOU_REF_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E9_REF_ZONE_SUB_REGION3'] = 'F'

    df_ATM_DROIT['E10_REF'] = 'F'

    df_ATM_DROIT['E9_PROPA_ZONE_SUB_REGION1'] = df.apply(lambda x: preprocess_E9_PROPA_ATM_region(x.E9_AL_D_D, x.E9_AL_DH_D), axis=1)
    df_ATM_DROIT['E9_PROPA_ZONE_SUB_REGION2'] = df.apply(lambda x: preprocess_E9_PROPA_ATM_region(x.E9_PL_D_D, x.E9_PL_DH_D), axis=1)
    df_ATM_DROIT['E9_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_ATM_DROIT['E10_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_ATM_DROIT['E10_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_ATM_DROIT['E10_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_ATM_DROIT['E5A_HAB'] = df['E5_LD_D_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_DROIT['E5B_HAB'] = df['E5_LG_D_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_DROIT['E5C_HAB'] = df['E5_PI_D_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_DROIT['E1B'] = df['E1B_D'].apply(preprocess_E1B_IS_AUTRE)

    df_ATM_DROIT['isTEMPORAL'] = 'F'

    df_ATM_DROIT['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_DROIT['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_DROIT['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_DROIT['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_DROIT['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_DROIT['E5A_MAL_TETE'] = 'F'
    df_ATM_DROIT['E5B_MAL_TETE'] = 'F'
    df_ATM_DROIT['E5C_MAL_TETE'] = 'F'

    df_ATM_DROIT['E9_MAL_TETE_ZONE1'] = 'F'
    df_ATM_DROIT['E9_MAL_TETE_ZONE2'] = 'F'
    df_ATM_DROIT['E9_MAL_TETE_ZONE3'] = 'F'

    df_ATM_DROIT['E4B_MAL_TETE'] = 'F'
    df_ATM_DROIT['E4C_MAL_TETE'] = 'F'

    df_ATM_DROIT['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_DROIT['E6_CRAQUE_PATIENT'] = df['E6_CRAQ_PAT_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E6_CREPITE_PATIENT'] = df['E6_CREP_PAT_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E7_CRAQUE_PATIENT'] = df['E7_CRAQ_PAT_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E7_CREPITE_PATIENT'] = df['E7_CREP_PAT_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_ATM_DROIT['E6_CRAQUE_OUVERT'] = df['E6_CRAQ_OUV_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)  
    df_ATM_DROIT['E6_CRAQUE_FERM'] = df['E6_CRAQ_FERM_D'].apply(preprocess_N_Y_TO_TRUE_FALSE) 
    df_ATM_DROIT['E7_CRAQUE'] = df.apply(lambda x: preprocess_E7_CRAQUE_ATM_(x.E7_CRAQ_OUV_D, x.E7_CRAQ_FERM_D), axis=1)

    df_ATM_DROIT['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_DROIT['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_DROIT['E8_BLOCAGE_OUVERT'] = df['E8_OUVRANT_BLOC_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)   

    df_ATM_DROIT['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_DROIT['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_DROIT['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_ATM_DROIT['E6_CREPITE_OUVER'] = df['E6_CREP_OUV_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E6_CREPITE_FERM'] = df['E6_CREP_FERM_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E7_CREPITE_OUVER'] = df['E7_CREP_OUV_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_DROIT['E7_CREPITE_FERM'] = df['E7_CREP_FERM_D'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_ATM_DROIT['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_DROIT['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    Y_ATM_DROIT_predicted = []
    Y_ATM_DROIT_PROBA = []
    for i in range(0,df_ATM_DROIT.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_ATM_DROIT.iloc[i].to_dict())
            Y_ATM_DROIT_predicted.append(vectorPredicted)
            Y_ATM_DROIT_PROBA.append(vectorPROBA)




    ####################################################################################################################
    ####################################################################################################################
    ##Transformations pour ATM_GAUCHE
    ####################################################################################################################
    ####################################################################################################################

    df_ATM_GAUCHE = pd.DataFrame()
    df_ATM_GAUCHE['QS3'] = df['QS3'].apply(cleanQS3)

    df_ATM_GAUCHE['QS4A'] = df['QS4A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_GAUCHE['QS4B'] = df['QS4B'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_GAUCHE['QS4C'] = df['QS4C'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_GAUCHE['QS4D'] = df['QS4D'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E4B_HAB'] = df['E4_MS_G_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E4C_HAB'] = df['E4_MA_G_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E9_HAB_ZONE_SUB_REGION1'] = df['E9_PL_DH_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E9_HAB_ZONE_SUB_REGION2'] = df['E9_AL_DH_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E9_HAB_ZONE_SUB_REGION3'] = 'F'

    df_ATM_GAUCHE['E10_HAB'] = 'F'

    df_ATM_GAUCHE["E1A"] = df["E1_DOUL_G_ATM"].apply(preprocess_DOUL_TO_TRUE_FALSE) 

    df_ATM_GAUCHE['ZONE'] = 'ATM'

    df_ATM_GAUCHE['E9_REF_ZONE_SUB_REGION1'] = df['E9_PL_DOU_REF_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E9_REF_ZONE_SUB_REGION2'] = df['E9_AL_DOU_REF_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E9_REF_ZONE_SUB_REGION3'] = 'F'

    df_ATM_GAUCHE['E10_REF'] = 'F'

    df_ATM_GAUCHE['E9_PROPA_ZONE_SUB_REGION1'] = df.apply(lambda x: preprocess_E9_PROPA_ATM_region(x.E9_AL_D_G, x.E9_AL_DH_G), axis=1)
    df_ATM_GAUCHE['E9_PROPA_ZONE_SUB_REGION2'] = df.apply(lambda x: preprocess_E9_PROPA_ATM_region(x.E9_PL_D_G, x.E9_PL_DH_G), axis=1)
    df_ATM_GAUCHE['E9_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_ATM_GAUCHE['E10_PROPA_ZONE_SUB_REGION1'] = 'F'
    df_ATM_GAUCHE['E10_PROPA_ZONE_SUB_REGION2'] = 'F'
    df_ATM_GAUCHE['E10_PROPA_ZONE_SUB_REGION3'] = 'F'

    df_ATM_GAUCHE['E5A_HAB'] = df['E5_LD_G_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E5B_HAB'] = df['E5_LG_G_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E5C_HAB'] = df['E5_PI_G_ATM'].apply(preprocess_DOUL_HAB_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E1B'] = df['E1B_G'].apply(preprocess_E1B_IS_AUTRE)

    df_ATM_GAUCHE['isTEMPORAL'] = 'F'

    df_ATM_GAUCHE['QS5'] = df['QS5'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_GAUCHE['QS7A'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_GAUCHE['QS7B'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_GAUCHE['QS7C'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_GAUCHE['QS7D'] = df['QS7A'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E5A_MAL_TETE'] = 'F'
    df_ATM_GAUCHE['E5B_MAL_TETE'] = 'F'
    df_ATM_GAUCHE['E5C_MAL_TETE'] = 'F'

    df_ATM_GAUCHE['E9_MAL_TETE_ZONE1'] = 'F'
    df_ATM_GAUCHE['E9_MAL_TETE_ZONE2'] = 'F'
    df_ATM_GAUCHE['E9_MAL_TETE_ZONE3'] = 'F'

    df_ATM_GAUCHE['E4B_MAL_TETE'] = 'F'
    df_ATM_GAUCHE['E4C_MAL_TETE'] = 'F'

    df_ATM_GAUCHE['QS8'] = df['QS8'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E6_CRAQUE_PATIENT'] = df['E6_CRAQ_PAT_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E6_CREPITE_PATIENT'] = df['E6_CREP_PAT_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E7_CRAQUE_PATIENT'] = df['E7_CRAQ_PAT_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E7_CREPITE_PATIENT'] = df['E7_CREP_PAT_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E6_CRAQUE_OUVERT'] = df['E6_CRAQ_OUV_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)  
    df_ATM_GAUCHE['E6_CRAQUE_FERM'] = df['E6_CRAQ_FERM_G'].apply(preprocess_N_Y_TO_TRUE_FALSE) 
    df_ATM_GAUCHE['E7_CRAQUE'] = df.apply(lambda x: preprocess_E7_CRAQUE_ATM_(x.E7_CRAQ_OUV_D, x.E7_CRAQ_FERM_D), axis=1)

    df_ATM_GAUCHE['QS11'] = df['QS11'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_GAUCHE['QS12'] = df['QS12'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E8_BLOCAGE_OUVERT'] = df['E8_OUVRANT_BLOC_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)   

    df_ATM_GAUCHE['QS9'] = df['QS9'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_GAUCHE['QS10'] = df['QS10'].apply(cleanOUI_NON_TO_TRUE_FALSE)

    df_ATM_GAUCHE['E4C_OUVER_GREATER_40'] = df['E4C'].apply(preprocess_E4C_is_GREATER_THAN_40)

    df_ATM_GAUCHE['E6_CREPITE_OUVER'] = df['E6_CREP_OUV_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E6_CREPITE_FERM'] = df['E6_CREP_FERM_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E7_CREPITE_OUVER'] = df['E7_CREP_OUV_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)
    df_ATM_GAUCHE['E7_CREPITE_FERM'] = df['E7_CREP_FERM_G'].apply(preprocess_N_Y_TO_TRUE_FALSE)

    df_ATM_GAUCHE['QS13'] = df['QS13'].apply(cleanOUI_NON_TO_TRUE_FALSE)
    df_ATM_GAUCHE['QS14'] = df['QS14'].apply(cleanOUI_NON_TO_TRUE_FALSE)



    Y_ATM_GAUCHE_predicted = []
    Y_ATM_GAUCHE_PROBA = []
    for i in range(0,df_ATM_GAUCHE.shape[0]):
            highest, vectorPredicted, vectorPROBA = predictVector(model, df_ATM_GAUCHE.iloc[i].to_dict())
            Y_ATM_GAUCHE_predicted.append(vectorPredicted)
            Y_ATM_GAUCHE_PROBA.append(vectorPROBA)

    results = {}
    results['MASSETER_DROIT'] = [Y_MASSETER_DROIT_predicted, Y_MASSETER_DROIT_PROBA]
    results['MASSETER_GAUCHE'] = [Y_MASSETER_GAUCHE_predicted, Y_MASSETER_GAUCHE_PROBA]
    results['TEMPORAL_DROIT'] = [Y_TEMPORAL_DROIT_predicted, Y_TEMPORAL_DROIT_PROBA]
    results['TEMPORAL_GAUCHE'] = [Y_TEMPORAL_GAUCHE_predicted, Y_TEMPORAL_GAUCHE_PROBA]
    results['DIGASTRIQUE_DROIT'] = [Y_DIGASTRIQUE_DROIT_predicted, Y_DIGASTRIQUE_DROIT_PROBA]
    results['DIGASTRIQUE_GAUCHE'] = [Y_DIGASTRIQUE_GAUCHE_predicted, Y_DIGASTRIQUE_GAUCHE_PROBA]
    results['SOUS_MANDIBULAIRE_DROIT'] = [Y_SOUS_MANDIBULAIRE_DROIT_predicted, Y_SOUS_MANDIBULAIRE_DROIT_PROBA]
    results['SOUS_MANDIBULAIRE_GAUCHE'] = [Y_SOUS_MANDIBULAIRE_GAUCHE_predicted, Y_SOUS_MANDIBULAIRE_GAUCHE_PROBA]
    results['ATM_DROIT'] = [Y_ATM_DROIT_predicted, Y_ATM_DROIT_PROBA]
    results['ATM_GAUCHE'] = [Y_ATM_GAUCHE_predicted, Y_ATM_GAUCHE_PROBA]
    results['TENDON_TEMPORAL_DROIT'] = [Y_TENDON_TEMPORAL_DROIT_predicted, Y_TENDON_TEMPORAL_DROIT_PROBA]
    results['TENDON_TEMPORAL_GAUCHE'] =[Y_TENDON_TEMPORAL_GAUCHE_predicted, Y_TENDON_TEMPORAL_GAUCHE_PROBA]
    results['PTERIGOIDIEN_DROIT'] = [Y_PTERIGOIDIEN_DROIT_predicted,  Y_PTERIGOIDIEN_DROIT_PROBA]
    results['PTERIGOIDIEN_GAUCHE'] = [Y_PTERIGOIDIEN_GAUCHE_predicted, Y_PTERIGOIDIEN_GAUCHE_PROBA]
    results['TEMPORAL_DROIT'] = [Y_TEMPORAL_DROIT_predicted, Y_TEMPORAL_DROIT_PROBA]
    results['TEMPORAL_GAUCHE'] = [Y_TEMPORAL_GAUCHE_predicted, Y_TEMPORAL_GAUCHE_PROBA]
    return results

if __name__ == "__main__":
    import sys
    model = loadModel()
    f = open("input.txt", "w")
    f.write(sys.argv[1])
    f.close()
    input = json.loads(sys.argv[1])
    data = preprocess(input)
    
    print(json.dumps(data))
    sys.stdout.flush()




