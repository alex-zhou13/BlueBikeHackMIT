# BlueBike Plan Helper

BlueBike Plan Helper is an application powered by **InterSystem IRIS Cloud IntegratedML**, that allows the user to perform the following:
* Plan their blue bike trips days in advance.
* Predict the number of bikes at a station in a future time.
* Predict the number of docks at a station in a future time.
* Predict the probability of getting a bike and stock a bike at a station in a future time.

<img src="/bluebike.png" height="350" width="550">

## Developers
* [Tom Penanko](https://github.com/tompenanko)
* [John Chai](https://github.com/ychai23)
* [Marco Raigoza](https://github.com/mraigoza)
* [Alex Zhou](https://github.com/alex-zhou13)

## Frameworks and Services used
* The app is built with **InterSystem IRIS Cloud IntegratedML** as our ML model prediction service platform and SQL data storage space.
* The app fetches the streamed data from **BlueBike** APIs and use **Python** scripts to generate timestamp data.
* We use a **Flask** server to handle requests from the application and make connection with IntegratedML by driver.
* The app uses **React** to display frontend UI components and retrieve user inputs.

## Data Sources
* [BlueBike Station Information Data](https://gbfs.bluebikes.com/gbfs/en/station_information.json)
* [BlueBike Station Status & Rides Data](https://gbfs.bluebikes.com/gbfs/es/station_status.json)

# How to run
* cd frontend/ then npm install then npm run build
* cd / then flask run

## Future Features
* Map to navigate station location
* Bike Station Recommendation base on user current location
* Trip Planner to record best station options during trip time
