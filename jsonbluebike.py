import json
import requests
import csv
import time as t
import datetime

url = 'https://gbfs.bluebikes.com/gbfs/en/station_status.json'

def convert(unixtime):
    dict = {0: "Monday", 1: "Tuesday", 2: "Wednsday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"}
    unixToDatetime = datetime.datetime.fromtimestamp(unixtime) # Unix Time
    time = unixToDatetime.time()
    day = unixToDatetime.weekday()
    return day, time

bikeiddict = dict() #id to name
bike_actual_capacity_dict = dict() #name to capacity

with open('current_bluebikes_stations.csv', newline='') as station_file:
	stations_data = csv.DictReader(station_file, delimiter=',')

	for station in stations_data:
		location_name = station['Name']
		capacity = station['Total docks']
		bike_actual_capacity_dict[location_name] = capacity

with open('202208-bluebikes-tripdata.csv', newline='') as csvfile:
	data = csv.DictReader(csvfile, delimiter=',')
	for row in data:
		start_station_name = row['start station name']
		end_station_name = row['end station name']
		start_bikeid = int(row['start station id'])
		end_bikeid = int(row['end station id'])
		bikeiddict[start_bikeid] = start_station_name
		bikeiddict[end_bikeid] = end_station_name


while(1):
	with open("bluebikecsv.csv","a",newline='') as fin:
		r = requests.get(url)
		writer = csv.writer(fin)
		writer.writerow(["station_id","location_name","day","time","num_bikes_available","num_docks_available","capacity"])
		for x in r.json()['data']['stations']:
			if int(x['station_id']) in bikeiddict and bikeiddict[int(x['station_id'])] in bike_actual_capacity_dict:
				day,time = convert(x['last_reported'])
				writer.writerow([x['station_id'],bikeiddict[int(x['station_id'])],day,time,x['num_bikes_available'],x['num_docks_available'],bike_actual_capacity_dict[bikeiddict[int(x['station_id'])]]])
	print('done')
	t.sleep(600)