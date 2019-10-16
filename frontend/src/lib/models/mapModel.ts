import axios from 'axios';

const MAPBOX_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const GEOCODING_KEY = process.env.REACT_APP_GEOCODING_KEY;

interface IReverseGeocodingRequest {
  longitude: number;
  latitude: number;
}

export default class MapModel {
  public static reverseGeocoding = async ({ longitude, latitude }: IReverseGeocodingRequest) => {
    const res = await axios.get(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${GEOCODING_KEY}&format=json&geocode=${longitude},${latitude}`
    );
    return res.data;
  };
}
