import axios from 'axios';

export const getAddressByCoords = async (coords: google.maps.LatLngLiteral | null) => {
  if (coords) {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.REACT_APP_GOOGLE_APP_API_KEY}`
    );
    return data.results as google.maps.GeocoderResult[];
  }
};
