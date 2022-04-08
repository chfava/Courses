# INF8953CE_Kaggle
## Team: Masterminds

If you already have the data downloaded on your computer, skip this first section of this Notebook and directly enter your path in the first cell of Class Definition section.
If you want to mount to your Google Drive and get data from Kaggle website, follow the first section:

# Connect Google Drive for Kaggle config file 
1. From your Kaggle account, create New API Token and download file
2. Create directory /Kaggle at the highest level in your Google Drive (My Drive/Kaggle)
3. Place the kaggle.json file in My Drive/Kaggle/
4. Link the colab to your google drive in the following cell

# Class Definitions
## Class: Dataset 
This class has different methods for loading the data, apply preprocessing and data augmentation operations as described in the final report and splitting data into train/validation/test, following 72-18-10 proportions. 
The parameters of this class are:
- name: Used to print history files while training different models.
- preprocess: default=False. If set to True, this parameter will activate functions to remove background noise in images and reduce images size from 100x100 to 32x32 pixels.
- augment: default=False. Data Augmentation parameter. If set to True, the dataset is augmented by doing a horizontal flip of all images.
- deform_augment: default=False. Data Augmentation parameter. If set to True, all images are slighlty deformed (see figure 2 of final report) following amplitude and stdDev parameters and apended to augment dataset size. 
- amplitude: default=5. Amplitude of deformation for data augmentation. Can be a list or a single value. 
- stdDev: default=2. Smoothing of deformed images for data augmentation.  Can be a list or a single value. 
- rotate_augment: default=False.  Data Augmentation parameter. If set to True, all images are slighlty rotated by angles parameter and apended to augment dataset size. 
- angles: default=60. Can be a list or a single value. 
- flipAND_: default=False. Apply separately deformation and rotation operations for data augmentation. If True, it perform data augmentation operations additively.

Data is loaded by instantiating Dataset object, and it is saved as attributes X_train, Y_train, etc. Example: dataset_Pre_Aug = Dataset('Data_flip_angles-45To45_5deform', True, True, True, amplitude = amplitudes, stdDev = stdDevs, rotate_augment = True, angles = angles, flipAND_ = True)

## Class: TrainableModel
This class allows the training of different models, fitting and saves predicted data for submission.
The parameters of this class are:
- dataset: Dataset object.
- model: Selected model by Keras library, declared in the following sections. 
- name: Name of model to save in training history. 
- patience: default=15. Number of epochs before calling EarlyStopping.

# Models 
The following sections of this Notebook are simply to implement different models, as discussed in the final report. The are trained with the TrainableModel class object. All models are set to RUN=False, except for Baseline and DenseNet, the later being our best model for this Kaggle competition. 
Models:
Baseline
Random Forest
MobileNet
CNN
DenseNet
