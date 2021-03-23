from nsepy import get_history
from datetime import date,timedelta
today = date.today()
days = timedelta(14)
period = today - days
data = get_history(symbol = "SBIN", start = period, end = today)

#data = data["Close"]
print(data["Dates"])
#print(type(data.to_json(orient = "index")))