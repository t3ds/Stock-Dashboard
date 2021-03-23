from flask import Flask, jsonify
from fetch_data import fetch_data, fetch_gainers, fetch_losers
from nsepy import get_history
from datetime import date,timedelta
import pandas as pd
import os
import json

app = Flask(__name__)

@app.route('/api/<string:ticker>', methods = ['GET'])
def api(ticker):
    return fetch_data(ticker)

@app.route('/history/<string:ticker>', methods = ['GET'])
def history(ticker):
    today = date.today()
    days = timedelta(30)
    period = today - days
    data = get_history(symbol = ticker, start = period, end = today)
    dates = []
    for day in data.index.values:
         dates.append(day.strftime("%d-%b-%Y"))

    formatted_data = pd.DataFrame(zip(dates, data["Close"]), columns = ["Date", "Price"])
    return formatted_data.to_json(orient="records")

@app.route('/gainers', methods = ['GET'])
def gainers():
    return fetch_gainers()

@app.route('/losers', methods = ['GET'])
def losers():
    return fetch_losers()

@app.route('/models', methods = ['GET'])
def models():
    jsons = []
    for sub_dir in os.listdir('../models'):

        with open('../models/' + sub_dir + '/data.json') as json_file:
            jsons.append(json.load(json_file))

    return jsonify(jsons)