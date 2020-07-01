const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2VudXJhIiwiYSI6ImNrYzBydGsybjBzNzIycHFxZ3UzZHp2dWEifQ.1jI4RoB4FeM72wF3MAmCDQ";

  request({ url, json: true }, (error, { body }) => {
    //if there is an internet connection problem
    if (error) {
      callback("Unable to connect loation services", undefined);
    }
    //if you input an icorrect data
    else if (body.features.length === 0) {
      callback("unable to find location.Try another one", undefined);
    }
    //if there is no error
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
