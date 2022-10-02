import axios from "axios";

const IP = "127.0.0.1";
const PORT = 5000;
const URL = `http://${IP}:${PORT}/`;

const testModel = async (location, date, seconds) => {
    const response = await axios.get(URL + "testModel", {"location": location, "date": date, "seconds": seconds});
    return response.data;
}

export { testModel };