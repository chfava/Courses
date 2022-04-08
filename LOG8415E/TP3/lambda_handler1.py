import sys
from textblob import TextBlob
import json
import boto3

lambda_client = boto3.client('lambda', region_name='us-east-1')

def handler(event, context):
    print(event)
    tweets = event
    for tweet in tweets:
        analyser = TextBlob(tweets[tweet]['text'])
        if(analyser.sentiment.polarity >= 0):
            tweets[tweet]['sentiment'] = "positive"
        if(analyser.sentiment.polarity < 0):
            tweets[tweet]['sentiment'] = "negative"
        tweets[tweet]['score'] = abs(analyser.sentiment.polarity)
    
    response = lambda_client.invoke(FunctionName="lambda_handler2", InvocationType='RequestResponse', Payload = json.dumps(tweets).encode('utf-8'))

    return tweets
