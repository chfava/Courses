
# coding: utf-8

# # Loading the dataset

# In[473]:


import pandas as pd
import os
import boto3


# In[474]:


s3 = boto3.resource('s3')
s3.Bucket('aws-logs-862438390833-us-east-1').download_file('elasticmapreduce/tp2-dataset.zip','tp2-dataset.zip')


# In[475]:


import zipfile
with zipfile.ZipFile("tp2-dataset.zip","r") as zip_ref:
    zip_ref.extractall('tp2-dataset')


# In[476]:


files = os.listdir("tp2-dataset")


# In[477]:


data = []
for file in files:
    data.append(pd.read_csv("tp2-dataset/" + file)) 


# In[478]:


data[5].head()


# In[479]:


data[4].shape


# In[480]:


df = pd.concat(data)


# In[481]:


df.shape


# In[482]:


df_pipeline = df


# In[483]:


df_test = df_pipeline


# In[484]:


df_test.head()


# # Data Preprocessing

# ### Dropping the rows where the temperature (label) is null 

# In[485]:


df = df[df['TEMP'].notna()]
df_pipeline = df_pipeline[df_pipeline['TEMP'].notna()]


# In[486]:


df.shape


# In[487]:


df.describe()


# ### Counting the null values for each explanatory variable

# In[488]:


print(df['PM2.5'].isna().sum())


# In[489]:


print(df['PM10'].isna().sum())


# In[490]:


df['SO2'].isna().sum()


# In[491]:


df['NO2'].isna().sum()


# In[492]:


df['CO'].isna().sum()


# In[493]:


df['O3'].isna().sum()


# In[494]:


df['PRES'].isna().sum()


# In[495]:


df['DEWP'].isna().sum()


# In[496]:


df['RAIN'].isna().sum()


# In[497]:


df['WSPM'].isna().sum()


# In[498]:


df['wd'].isna().sum()


# In[499]:


df.iloc[0].values


# In[500]:


from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

from sklearn.impute import SimpleImputer
import numpy as np

imputer = SimpleImputer(missing_values=np.nan, strategy='mean')
df[['PM2.5','PM10', 'SO2', 'NO2', 'CO', 'O3', 'PRES', 'DEWP', 'RAIN', 'WSPM']] = imputer.fit_transform(
    df[['PM2.5','PM10', 'SO2', 'NO2', 'CO', 'O3', 'PRES', 'DEWP', 'RAIN', 'WSPM']].values)


############# Pipeline #################
numbers_features = ['PRES', 'DEWP', 'RAIN', 'WSPM']
transfo_numbers = Pipeline(steps=[
    ('number', SimpleImputer(missing_values=np.nan, strategy='mean'))])

string_features = ['wd']
transfo_string = Pipeline(steps=[
    ('string', SimpleImputer(strategy="most_frequent"))])

imputer_tranformation = ColumnTransformer(
    transformers=[
        ('numbers', transfo_numbers, numbers_features),
    ('strings', transfo_string, string_features)])


# In[501]:


imputerString = SimpleImputer(strategy="most_frequent")
df['wd'] = imputerString.fit_transform(df['wd'].values.reshape(-1, 1))


# ### Convert temperature into categories

# In[502]:


def convertToCustomCategories(x):
    if x < 0:
        return 0
    if x < 10 and x >= 0:
        return 1
    if x < 20 and x >= 10:
        return 2
    if x < 30 and x >= 20:
        return 3
    if x >= 30:
        return 4
    else:
        print('Value not in range')
        print(x)
        return 2 #returning the halfway value (this gives less weight to an incorrect value)


# In[503]:


df.TEMP = df.TEMP.apply(lambda x : convertToCustomCategories(x))


# In[504]:


df.head()


# ### Convert Wind into One hot encoded variable

# In[505]:


from sklearn.preprocessing import OneHotEncoder

wdOneHotEncoder = OneHotEncoder(handle_unknown='ignore')

df_wind = pd.get_dummies(df['wd'])


# In[506]:


from sklearn.preprocessing import FunctionTransformer


transfo_WD = Pipeline(steps=[
    ('oneHotWD', OneHotEncoder(handle_unknown='ignore'))])

transfo_Station = Pipeline(steps=[
    ('oneHotStation', OneHotEncoder(handle_unknown='ignore'))])


oneHot_features = ['wd']
oneHot_station = ['station']

def removeWD(X):
    return X.drop(columns=['wd'])

def removeStation(X):
    return X.drop(columns=['station'])


oneHot_tranformation = ColumnTransformer(
    transformers=[
        ('numbers', transfo_numbers, numbers_features),
        ('strings', transfo_string, string_features),
        ('oneHot', transfo_WD, ['wd']),
        ('oneHotstation', transfo_Station, ['station'])
    ])


# In[507]:


df_wind.head()


# In[508]:


df = pd.concat([df,df_wind], axis=1)


# In[509]:


df.head()


# In[510]:


df.shape


# ### Convert station into One hot encoded variable

# In[511]:


df = pd.concat([df,pd.get_dummies(df['station'])], axis=1)


# In[512]:


df.shape


# In[513]:


df.head()


# # Separating dataset into train and test

# In[514]:


print(df.columns.values)


# In[ ]:


from sklearn.model_selection import train_test_split
from sklearn.decomposition import PCA
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer
from sklearn.preprocessing import FunctionTransformer

X = df[[ 'DEWP',  'No', 'PRES', 'RAIN','WSPM',
         'hour', 'month', 'year',
      'E', 'ENE', 'ESE', 'N', 'NE', 'NNE', 'NNW', 'NW', 'S', 'SE', 'SSE', 'SSW', 'SW', 'W',
 'WNW', 'WSW', 'E', 'ENE', 'ESE', 'N', 'NE','NNE', 'NNW', 'NW', 'S', 'SE', 'SSE',
 'SSW', 'SW', 'W', 'WNW', 'WSW', 'Aotizhongxin', 'Changping', 'Dingling', 'Dongsi',
 'Guanyuan', 'Gucheng', 'Huairou', 'Nongzhanguan', 'Shunyi', 'Tiantan','Wanliu']].values

X_pipeline = X

normalizer = Normalizer()

X = normalizer.fit_transform(X)

PCA = PCA(n_components=10)

SVD = TruncatedSVD(n_components=30)

#X = PCA.fit_transform(X)

Y = df['TEMP'].values

def toDense(X):
    return X.todense()

transformer = FunctionTransformer(toDense)

pipeline = Pipeline(steps=[
                                ('imputer',SimpleImputer(strategy="most_frequent")),
                                ('oneHotStation', OneHotEncoder(handle_unknown='ignore')),
                                ('normalizer', normalizer),
    ('toDense', transformer),
                                ('dimensionReduction', PCA)
                                
                               ])

X_pipeline = df_pipeline[[ 'DEWP', 'PRES', 'RAIN','WSPM',
         'hour', 'month', 'year', 'station', 'wd']]

X_preprocessed_pipeline = pipeline.fit_transform(X_pipeline.values)

X_train, X_test, Y_train, Y_test = train_test_split(X_preprocessed_pipeline, Y, test_size=0.15)


# In[ ]:


X_preprocessed_pipeline.shape


# # Training

# In[ ]:


import pickle
from joblibspark import register_spark


from sklearn.svm import LinearSVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.utils import parallel_backend
from sklearn.model_selection import cross_val_score
from spark_sklearn.util import createLocalSparkSession
from sklearn.model_selection import GridSearchCV


os.environ['PYSPARK_PYTHON'] = '/usr/bin/python3'

register_spark()



SVM_Model = LinearSVC()

Random_Forest_Model = RandomForestClassifier()

Gradient_Boosting_Model = GradientBoostingClassifier()

print("Starting parallel tasks :")


with parallel_backend('spark', n_jobs=5):
    SVM_Model.fit(X_train, Y_train)
    Random_Forest_Model.fit(X_train, Y_train)
    Gradient_Boosting_Model.fit(X_train, Y_train)
    
print("Models training done")
    
with parallel_backend('spark', n_jobs=5):
    scoresSVM = cross_val_score(SVM_Model, X_train, Y_train, cv=2)

    
print("SVM_Model cross-validation done")

with parallel_backend('spark', n_jobs=5):
    scoresRandomForest = cross_val_score(Random_Forest_Model, X_train, Y_train, cv=2)

    
print("Random_Forest_Model cross-validation  done")

with parallel_backend('spark', n_jobs=5):
    scoresGradientBoosting = cross_val_score(Gradient_Boosting_Model, X_train, Y_train, cv=2)

print("Gradient_Boosting_Model cross-validation done")

print("Random_Forest score : ")
print(scoresRandomForest)
print( "SVM score : ")
print(scoresSVM)
print("Gradient_Boosting score : ")
print(scoresGradientBoosting)
    
fileName = "Pipeline" 
f = open(fileName + '.pckl', 'wb') 
pickle.dump(pipeline , f) 
f.close()

fileName = "SVM" 
f = open(fileName + '.pckl', 'wb') 
pickle.dump(SVM_Model , f) 
f.close()

fileName = "Random_Forest"
f = open(fileName + '.pckl', 'wb') 
pickle.dump(Random_Forest_Model , f) 
f.close()

fileName = "Gradient_Boosting"
f = open(fileName + '.pckl', 'wb') 
pickle.dump(Gradient_Boosting_Model , f) 
f.close()


# In[ ]:


from sklearn.metrics import classification_report

Y_test_Predicted = Random_Forest_Model.predict(X_test)

print(classification_report(Y_test_Predicted, Y_test))


# In[ ]:


Y_test_Predicted
    
    

