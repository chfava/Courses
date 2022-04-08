from __future__ import print_function 
import boto3
import sys
import psycopg2
from psycopg2.extras import RealDictCursor
import random
import json

s3 = boto3.resource('s3')


def handlerProxy(event, context):
    tweets = event

    s3_pointer = s3.Object('lambda-handler-1-log8415', '/tweets.json')
    s3_pointer.put( Body=(bytes(json.dumps(tweets).encode('UTF-8'))))

    connection = psycopg2.connect(host="database-2.cnqe6x5urhbu.us-east-1.rds.amazonaws.com" , user="postgres", password="7ZKD3FCtpZkCXvQCCeJz" , dbname="postgres")
    cur = connection.cursor(cursor_factory=RealDictCursor)
    print(cur)
    cur.execute("DROP TABLE IF EXISTS master CASCADE")
    cur.execute("DROP TABLE IF EXISTS slave CASCADE")
    cur.execute("CREATE TABLE IF NOT EXISTS master (id VARCHAR NOT NULL, date DATE NOT NULL, sentiment VARCHAR NOT NULL, score DECIMAL NOT NULL, PRIMARY KEY (id));")
    cur.execute("CREATE TABLE IF NOT EXISTS slave (id VARCHAR NOT NULL, date DATE NOT NULL, sentiment VARCHAR NOT NULL, score DECIMAL NOT NULL, PRIMARY KEY (id));")
    for tweet in tweets:
        if(random.random() > 0.5):
            cur.execute("""INSERT INTO master (id, date, sentiment, score) VALUES (%s, %s, %s, %s)""", (tweets[tweet]['id'], tweets[tweet]['date'], tweets[tweet]['sentiment'], tweets[tweet]['score']))
        else:
            cur.execute("""INSERT INTO slave (id, date, sentiment, score) VALUES (%s, %s, %s, %s)""", (tweets[tweet]['id'], tweets[tweet]['date'], tweets[tweet]['sentiment'], tweets[tweet]['score']))
    cur.execute("SELECT * FROM master")
    cur.execute("SELECT * FROM slave")
    print(cur.fetchall())
    return True

def handlerSharding(event, context):
    tweets = event
    s3_pointer = s3.Object('lambda-handler-1-log8415', '/tweets.json')
    s3_pointer.put( Body=(bytes(json.dumps(tweets).encode('UTF-8'))))

    connection = psycopg2.connect(host="database-1.cnqe6x5urhbu.us-east-1.rds.amazonaws.com" , user="postgres", password="FhhmS1VSyZY5s2bW52DQ" , dbname="database-1")
    cur = connection.cursor(cursor_factory=RealDictCursor)
    print(cur)
    cur.execute("CREATE TABLE IF NOT EXISTS shard1 (id VARCHAR NOT NULL, date DATE NOT NULL, sentiment VARCHAR NOT NULL, score DECIMAL NOT NULL, PRIMARY KEY (id));")
    cur.execute("CREATE TABLE IF NOT EXISTS shard2 (id VARCHAR NOT NULL, date DATE NOT NULL, sentiment VARCHAR NOT NULL, score DECIMAL NOT NULL, PRIMARY KEY (id));")
    N = random.random() * len(tweets)
    for tweet in tweets.keys()[0:N]:
        cur.execute("""INSERT INTO shard1 (id, date, sentiment, score) VALUES (%s, %s, %s, %s)""", (tweets[tweet]['id'], tweets[tweet]['date'], tweets[tweet]['sentiment'], tweets[tweet]['score']))
    for tweet in tweets.keys()[N:]:    
        cur.execute("""INSERT INTO slave (id, date, sentiment, score) VALUES (%s, %s, %s, %s)""", (tweets[tweet]['id'], tweets[tweet]['date'], tweets[tweet]['sentiment'], tweets[tweet]['score']))
    return True
