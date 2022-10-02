import iris
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
import time

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/")
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/testModel', methods=['POST'])
def testModel():
    """ Creates a todo object.
        Requires location, date, seconds fields.
    """
    parser = reqparse.RequestParser()
    parser.add_argument("station_id", type=str)
    parser.add_argument("station_name", type=str)
    parser.add_argument("day", type=str)
    parser.add_argument("seconds", type=str)
    parser.add_argument("capacity", type=str)

    try:
        args = parser.parse_args()
        
        connection_string = "k8s-c2946e25-a84f586f-e65cd244bc-8e44646e8e2c86bf.elb.us-east-2.amazonaws.com:1972/USER"
        username = "SQLAdmin"
        password = "HackMIT69!"
    
        connection = iris.connect(connection_string, username, password)
        
        cursor = connection.cursor()

        # Insert point into table
        cursor.execute("INSERT INTO station_status_test (station_id, location_name, day, dtime, capacity) VALUES (" + args['station_id']  + ", '" + args['station_name'] + "', " + args['day'] + ", " + args['seconds'] + ", " + args['capacity'] + ")")
        
        time.sleep(5)

        # Predict time
        cursor.execute("SELECT TOP(100) PREDICT(predictionv3)*1 as prediction, num_bikes_available, PROBABILITY(predictionv3) as probability_num_bikes_available, * FROM SQLUser.station_status_test WHERE dtime = " + args['seconds'])
        responses = cursor.fetchall()
        
        connection.close()

        return {"status": 200, "message": "test Success", "data": responses}

    except:
        return {"status": 500, "message": "Request Failed", "data" : "msg failed"}