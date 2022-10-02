import iris
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/")
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/testModel', methods=['GET'])
def testModel():
    """ Creates a todo object.
        Requires location, date, seconds fields.
    """
    parser = reqparse.RequestParser()
    parser.add_argument("location", type=str)
    parser.add_argument("date", type=str)
    parser.add_argument("seconds", type=str)

    try:
        args = parser.parse_args()
        
        connection_string = "k8s-c2946e25-a84f586f-e65cd244bc-8e44646e8e2c86bf.elb.us-east-2.amazonaws.com:1972/USER"
        username = "SQLAdmin"
        password = "HackMIT69!"
    
        connection = iris.connect(connection_string, username, password)
        
        #irispy = iris.createIRIS(connection)
        cursor = connection.cursor()
        # cursor.execute("select * from sqluser.station_status")
        cursor.execute("INSERT INTO station_status_test (station_id, location_name, day, dtime, capacity) VALUES (user_station_id(380), user_station_address(‘Mass Ave’), day(5), time_to_predict(82800), capacity(18));")
        cursor.execute("select * from sqluser.station_status")
        responses = cursor.fetchall()
        
        connection.close()

        return {"status": 200, "message": "test Success", "data": responses}

    except:
        return {"status": 500, "message": "Request Failed", "data" : "msg failed"}