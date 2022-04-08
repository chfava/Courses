import pickle
import os


def save_pickle_model(model, filename):
    directory = os.path.dirname(filename)
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(filename, "wb") as model_file:
            pickle.dump(model, model_file)


def load_pickle_model(filename):
    try:
        with open(filename, "rb") as model_file:
            return pickle.load(model_file)
    except(OSError, IOError):
        return None
