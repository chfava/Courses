from sklearn.datasets import make_multilabel_classification
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import RidgeClassifierCV
from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import MultinomialNB
from sklearn.neighbors import KNeighborsClassifier, RadiusNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import MultiLabelBinarizer, OneHotEncoder
from sklearn.tree import DecisionTreeClassifier, ExtraTreeClassifier

import numpy as np
import parameters


class AIController:

    def __init__(self):
        self.X_train = None
        self.y_train = None
        self.X_test = None
        self.y_test = None
        self.multilabel_binarizer = MultiLabelBinarizer()
        self.one_hot_encoder = OneHotEncoder(handle_unknown='ignore')
        self.simple_imputer = SimpleImputer(missing_values=None, strategy='most_frequent')

        self.best_model = None
        self.best_score = 0

        gaussian_naive_bayes = GaussianNB()
        multinomial_naive_bayes = MultinomialNB()
        forest = RandomForestClassifier(random_state=parameters.RANDOM_STATE)
        one_vs_rest_naive_bayes = OneVsRestClassifier(gaussian_naive_bayes)
        one_vs_rest_multinomial_bayes = OneVsRestClassifier(multinomial_naive_bayes)

        decision_tree = DecisionTreeClassifier()
        extra_tree = ExtraTreeClassifier()
        extra_trees = ExtraTreesClassifier()
        k_neighbors = KNeighborsClassifier()
        mlp = MLPClassifier()
        # ridge = RidgeClassifierCV()

        self.models = [
                         {'name': 'forest', 'model': forest},
                         {'name': 'decision_tree', 'model': decision_tree},
                         {'name': 'extra_tree', 'model': extra_tree},
                         {'name': 'extra_trees', 'model': extra_trees},
                         {'name': 'mlp', 'model': mlp},
                         {'name': 'k_neighbors', 'model': k_neighbors}
                         # {'name': 'naive bayes', 'model': one_vs_rest_naive_bayes},
                         # {'name': 'multinomial bayes', 'model': one_vs_rest_multinomial_bayes}
                      ]

    def load_mock_training_data(self):
        # ceci est juste pour tester
        problem_set =\
            make_multilabel_classification(random_state=parameters.RANDOM_STATE, n_samples=20000, n_features=5,
                                           n_classes=3, n_labels=3), 0, 0, 0
        X, y = problem_set[0][0], problem_set[0][1]
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=parameters.TEST_SPLIT_PROPORTION, random_state=parameters.RANDOM_STATE)

    def load_data(self, data):
        X = [patient['x'] for patient in data]
        X = np.array(X)

        # transform X
        self.simple_imputer.fit(X)
        X = self.simple_imputer.transform(X)
        self.one_hot_encoder.fit(X)
        X = self.one_hot_encoder.transform(X)

        # transform y
        y = [patient['y'] for patient in data]
        for i in range(0, len(y)):
            for j in range(0, len(y[i])):
                if y[i][j] is None:
                    y[i][j] = ''
        y = self.multilabel_binarizer.fit_transform(y)

        # split into training and test sets
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=parameters.TEST_SPLIT_PROPORTION, random_state=parameters.RANDOM_STATE)

    def train_models(self):
        if (self.X_train is None
                or self.X_test is None
                or self.y_train is None
                or self.y_test is None):
            self.load_mock_training_data()
        for model in self.models:
            print("training model: " + model['name'])
            X = self.X_train
            y = self.y_train
            model['model'].fit(X, y)

    def predict_with_all_models(self, x):
        # transform sample x to match training data
        x = self.simple_imputer.transform(x)
        x = self.one_hot_encoder.transform(x)

        for model in self.models:
            model['model'].predict(x)

    def predict_with_best_model(self, x):
        # transform sample x to match training data
        x = self.simple_imputer.transform(x)
        x = self.one_hot_encoder.transform(x)

        prediction = self.best_model['model'].predict(x)
        unencoded_result = self.multilabel_binarizer.inverse_transform(prediction)
        return unencoded_result

    def evaluate_models_and_select_best_one(self):
        self.best_score = 0
        self.best_model = None
        for model in self.models:
            result = model['model'].score(self.X_test, self.y_test)
            if result >= self.best_score:
                self.best_score = result
                self.best_model = model
            print(model['name'], ":", result)
        return self.best_model

    def get_best_model_and_score(self):
        self.best_score = 0
        self.best_model = None
        for model in self.models:
            result = model['model'].score(self.X_test, self.y_test)
            if result >= self.best_score:
                self.best_score = result
                self.best_model = model
            print(model['name'], ":", result)
        return self.best_model, result








