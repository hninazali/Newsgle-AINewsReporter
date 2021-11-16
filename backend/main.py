import os
from flask import Flask, redirect, url_for, request
from newsapi import NewsApiClient
from flask_cors import CORS
import openai
import requests

# Constants
is_dev = False
if is_dev:
    portnum = 5000
else:
    portnum = 80 

api = NewsApiClient(api_key='{APIKeyHere}')
openai.organisation="org-a0tIdnFMHf3T8q8X0EQURTAU"
openai.api_key = "{APIKeyHere}"
newsCatcherAPIKey = "{APIKeyHere}"
tldr_tag = "\n tl;dr:"

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
if is_dev:
    CORS(app)

@app.route('/')
def hello_world():
   return app.send_static_file('index.html')

# Should be POST, body includes the keyword
@app.route('/getsum', methods = ['POST'])
def get_summary():
    # print("Request:",str(request.json))
    keywords = dict(request.json)['keyword']
    # Change params here 
    res1 = api.get_everything(q=keywords,sort_by="relevancy", page_size=20, page=1)
    st = ""
    try:
        for i in range(20):
            # st+=(res1['articles'][i]['title']+ res1['articles'][i]['description']+ ';')
            st+=(res1['articles'][i]['description'])
    except:
        return "No results found"


    text = st+ tldr_tag
    response = openai.Completion.create(
        engine="davinci",
        prompt=text,
        temperature=0.2,
        max_tokens=140,
        top_p=1,
        frequency_penalty=0.7,
        presence_penalty=0.7,
        stop=["\n"]
    )
    print(response["choices"][0]["text"])

    return response["choices"][0]["text"]

@app.route('/getsummary', methods = ['POST'])
def get_newsCatcherSummary():
    my_headers={'X-API-KEY' : newsCatcherAPIKey}
    keywords = dict(request.json)['keyword']
    query={'lang':'en',
        'sources':'straitstimes.com, theonlinecitizen.com, theindependent.sg, mothership.sg, todayonline.com',
        'sort_by':'relevancy',
        'page_size':'20',
        'q': keywords}
    res1 = requests.get('https://api.newscatcherapi.com/v2/search', headers=my_headers, params=query).json()
    # print(res1["articles"][0]["summary"])
    print(res1["total_hits"])
    # print(res["articles"][0]["summary"])

    st = ""
    try:
        num=0
        i=0
        print(len(res1["articles"]))
        while num < 10:
            if len(res1["articles"][i]["summary"]) > 20:
                num+=1
            # print(res1["articles"][i]["summary"])
            # st+=(res1['articles'][i]['title']+ res1['articles'][i]['description']+ ';')
                st+=(res1["articles"][i]["summary"])
            else:
                print("Skipped")
            i+=1
    except:
        print(num)
        return "Insufficient articles to summarise. No results found."

    # return st

    openai.organisation="org-a0tIdnFMHf3T8q8X0EQURTAU"
    openai.api_key = "{APIKeyHere}"
    tldr_tag = "\n tl;dr:"
    engine_list = openai.Engine.list()

    text = st+ tldr_tag
    print("Text : " + text)
    response = openai.Completion.create(
        engine="davinci",
        prompt=text,
        temperature=0.5,
        max_tokens=140,
        top_p=1,
        frequency_penalty=1,
        presence_penalty=0,
        # stop=["\n"]
    )
    # print("Summarised version from AI : " + response["choices"][0]["text"])

    return response["choices"][0]["text"]

if __name__ == '__main__':
    app.run(debug=is_dev, port=os.environ.get("PORT", portnum))
