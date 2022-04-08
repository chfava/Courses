import pickle
from joblibspark import register_spark
from sklearn import svm

from sklearn.utils import parallel_backend
from sklearn.model_selection import cross_val_score
from sklearn import datasets

register_spark()

#iris = datasets.load_iris()
#SVM_Model = svm.SVC(kernel='linear', C=1)
#with parallel_backend('spark', n_jobs=3):
  #scores = cross_val_score(SVM_Model, iris.data, iris.target, cv=5)

#print(scores)