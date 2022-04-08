import logging
import boto3
import os
from pyspark import SparkContext
from stop_words import get_stop_words

s3 = boto3.client('s3')
stop_words = get_stop_words('en')

def download_file(file_name):
    print("Downloading file '%s' from S3..." % file_name)
    s3.download_file('log8415e-tp2-part-1', file_name, file_name)
    print("File downloaded '%s' from S3" % file_name)

def count_words(file_name):
    print("Processing data with Spark...")
    sc = SparkContext()

    # Split in lines
    text = sc.textFile(file_name)

    # Use Spark to process data
    word_counts = text.flatMap(lambda line: map(lambda word: word.lower(), line.split(" "))) \
             .filter(lambda word: word not in stop_words and word != '') \
             .map(lambda word: (word, 1)) \
             .reduceByKey(lambda count_1, count_2: count_1 + count_2)

    print("20 most frequent words")

    # Print top 20 words
    print(word_counts.takeOrdered(20, key=lambda x: -x[1]))

    print("Processing done")


if __name__== "__main__":
    file_name = '219-0.txt'

    download_file('219-0.txt')
    count_words(file_name)