const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric&appid=b9711b0559c63077f425326a324512cc";

  request({ url, json: true }, (error, { body }) => {
    //if there is an internet connection problem
    if (error) {
      callback("Unable to connect to weather service", undefined);
    }
    //if you input a incorrect input
    else if (body.error) {
      console.log("Unable to find location", undefined);
    }
    //if there is no error
    else {
      let array = [
        //1st element of the array
        "It is currently " +
          body.current.temp +
          " degree out. There is a " +
          body.current.humidity +
          "% humidity  " +
          " and " +
          body.current.weather[0].description,
        //2nd element of the array
        "./img/" + body.current.weather[0].icon + "@2x.png",
      ];
      callback(undefined, array);
    }
  });
};

module.exports = forecast;
