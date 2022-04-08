from __future__ import print_function 
from flask import Flask
from flask import request
import boto3
import json
import psycopg2
from psycopg2.extras import RealDictCursor

  
app = Flask(__name__)
lambda_client = boto3.client('lambda', region_name='us-east-1')

def getResultsFromDB(pattern):
    if pattern == "PROXY":
        connection = psycopg2.connect(host="database-2.cnqe6x5urhbu.us-east-1.rds.amazonaws.com" , user="postgres", password="7ZKD3FCtpZkCXvQCCeJz" , dbname="postgres")
        cur = connection.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM master")
        cur.execute("SELECT * FROM slave")
    if pattern == "SHARDING":
        connection = psycopg2.connect(host="database-1.cnqe6x5urhbu.us-east-1.rds.amazonaws.com" , user="postgres", password="FhhmS1VSyZY5s2bW52DQ" , dbname="postgres")
        cur = connection.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM shard1")
        cur.execute("SELECT * FROM shard1")
    return cur.fetchall()

@app.route('/sentiment', methods = ['POST'])
def postTweets():
    print("POST Method")
    print (request.files)
    tweets = json.loads(request.files.get('json').read().decode('utf-8'))
    print(tweets)
    ## Invoke serverless function 
    response = lambda_client.invoke(FunctionName="lambda_handler1v2", InvocationType='RequestResponse', Payload = json.dumps(tweets).encode('utf-8'))
    print(response) 
    return json.dumps(getResultsFromDB("PROXY"))

#################################
def convertCSVToJSON():
    import pandas as pd
    df = pd.read_csv ('/Users/charles-olivierfavreau/Downloads/input 3.csv', encoding = "latin")
    df.to_json ('/Users/charles-olivierfavreau/Downloads/input.json', orient = "index")

#################################

app.run(host='0.0.0.0', port= 5000)

