import sys
import pandas as pd
import os
import boto3
import pickle
from sklearn.svm import LinearSVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.decomposition import PCA
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import numpy as np


def toDense(X):
    return X.todense()

def predict(argv):
    s3_bucket = argv[0]
    input_name = argv[1]
    output_name = argv[2]
    model1 = argv[3]
    model2 = argv[4]
    model3 = argv[5]

    s3 = boto3.resource('s3')
    s3.Bucket(s3_bucket).download_file('elasticmapreduce/Pipeline.pckl','Pipeline.pckl')
    s3.Bucket(s3_bucket).download_file(model1,'SVM.pckl')
    s3.Bucket(s3_bucket).download_file(model2,'Random_Forest.pckl')
    s3.Bucket(s3_bucket).download_file(model3 ,'Gradient_Boosting.pckl')

    
    # Please see pipeline details in file 'extra/original_notebook.pdf'
    Pipeline = pickle.load(open('Pipeline.pckl', 'rb'))
    SVM = pickle.load(open('SVM.pckl', 'rb'))
    Random_Forest = pickle.load(open('Random_Forest.pckl', 'rb'))
    Gradient_Boosting_Model = pickle.load(open('Gradient_Boosting.pckl', 'rb'))

    df = pd.read_csv(input_name)

    df = df[[ 'DEWP', 'PRES', 'RAIN','WSPM',
         'hour', 'month', 'year', 'station', 'wd']]

    X_preprocessed = Pipeline.transform(df.values)

    Y_predicted = SVM.predict(X_preprocessed)
    np.savetxt(output_name + "_SVM.csv", Y_predicted, delimiter=",")

    Y_predicted = Random_Forest.predict(X_preprocessed)
    np.savetxt(output_name + "_Random_Forest.csv", Y_predicted, delimiter=",")

    Y_predicted = Gradient_Boosting_Model.predict(X_preprocessed)
    np.savetxt(output_name + "_Gradient_Boosting.csv", Y_predicted, delimiter=",")



if __name__ == "__main__":
   predict(sys.argv[1:])