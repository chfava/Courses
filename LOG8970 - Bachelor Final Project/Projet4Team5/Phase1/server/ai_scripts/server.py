from flask import Flask
from flask import request
from flask import jsonify
from pickling import save_pickle_model
from pickling import load_pickle_model
from aicontroller import AIController

import numpy as np
import parameters
import copy

# code which helps initialize our server
app = Flask(__name__)

# try to load previously trained models from server if they exist
treatment_ai = load_pickle_model(parameters.TREATMENT_MODEL_FILE_NAME)
diagnosis_ai = load_pickle_model(parameters.DIAGNOSTIC_MODEL_FILE_NAME)

# if there was no previous model create a new one
if treatment_ai is None:
    treatment_ai = AIController()
if diagnosis_ai is None:
    diagnosis_ai = AIController()

@app.route('/')
def default_route():
    return 'Meditrinae python server'

@app.route('/train', methods=['POST'])
def train():
    data = request.get_json()
    treatment_data = copy.deepcopy(data)
    diagnosis_data = copy.deepcopy(data)

    # prep data before loading
    for patient in treatment_data:
        patient["x"] = patient.pop("results")
        patient["y"] = patient.pop("treatments")
        del patient['diagnostic']

    for patient in diagnosis_data:
        patient["x"] = patient.pop("results")
        patient["y"] = patient.pop("diagnostic")
        del patient['treatments']

    # load data
    treatment_ai.load_data(treatment_data)
    diagnosis_ai.load_data(diagnosis_data)

    # train
    treatment_ai.train_models()
    diagnosis_ai.train_models()

    # evaluate
    treatment_model_result = treatment_ai.evaluate_models_and_select_best_one()
    diagnosis_model_result = diagnosis_ai.evaluate_models_and_select_best_one()

    # save results locally
    save_pickle_model(treatment_ai, parameters.TREATMENT_MODEL_FILE_NAME)
    save_pickle_model(diagnosis_ai, parameters.DIAGNOSTIC_MODEL_FILE_NAME)

    # send results
    results = {"treatment model": treatment_model_result['name'], "diagnosis model": diagnosis_model_result['name']}

    return jsonify(results)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    data = np.array(data)
    data = data.reshape(1, -1)  # for the array size to be compatible with sk learn functions
    treatment_prediction = treatment_ai.predict_with_best_model(data)
    diagnosis_prediction = diagnosis_ai.predict_with_best_model(data)

    results = {"treatment results": treatment_prediction, "diagnosis results": diagnosis_prediction}

    return jsonify(results)

@app.route('/test_models', methods=['POST'])
def test_models():
    data = request.get_json()
    treatment_data = copy.deepcopy(data)
    diagnosis_data = copy.deepcopy(data)

    # prep data before loading
    for patient in treatment_data:
        patient["x"] = patient.pop("results")
        patient["y"] = patient.pop("treatments")
        del patient['diagnostic']

    for patient in diagnosis_data:
        patient["x"] = patient.pop("results")
        patient["y"] = patient.pop("diagnostic")
        del patient['treatments']

    results_treatment_ai = []
    results_diagnosic_ai = []

    for i in range(10):
        # load data
        treatment_ai.load_data(treatment_data)
        diagnosis_ai.load_data(diagnosis_data)

        # train
        treatment_ai.train_models()
        diagnosis_ai.train_models()

        # evaluate
        treatment_model_result = treatment_ai.evaluate_models_and_select_best_one()
        results_treatment_ai.push(treatment_model_result)
        diagnosis_model_result = diagnosis_ai.evaluate_models_and_select_best_one()
        results_diagnosic_ai.push(results_diagnosic_ai)


    # send results
    results = {"treatment model": treatment_model_result['name'], "diagnosis model": diagnosis_model_result['name']}

    return jsonify(results)
