// import React from 'react'

const Places = () => {
function geolocation(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}
                `);
            getLocation (latitude,longitude)
          },
          (error: GeolocationPositionError) => {
            console.error(`Error getting location: ${error.message}`);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
}


function getLocation (latitude:number, longitude:number){
    fetch('/places/nearby-bars', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json'
  },
  body: JSON.stringify({ latitude, longitude}), 
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

  return (
    <button onClick={geolocation} className="form-button" type='submit'>
       Go on, scout out a proper place for a pint! 🍺
    </button>
  )
}

export default Places