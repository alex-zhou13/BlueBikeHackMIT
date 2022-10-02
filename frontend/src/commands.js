import axios from "axios";

const IP = "127.0.0.1";
const PORT = 5000;
const URL = `http://${IP}:${PORT}/`;

const testModel = async (station_id, station_name, day, seconds, capacity) => {
    console.log("sending2: ",  {"station_id": station_id.toString(), "station_name": station_name.toString(), "day": day.toString(), "seconds": seconds.toString(), "capacity": capacity.toString()});
    const response = await axios.post(URL + "testModel", {"station_id": station_id.toString(), "station_name": station_name.toString(), "day": day.toString(), "seconds": seconds.toString(), "capacity": capacity.toString()});
    return response.data;
}

export { testModel };