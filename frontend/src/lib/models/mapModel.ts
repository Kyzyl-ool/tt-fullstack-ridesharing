import axios from 'axios';

// const MAPBOX_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const GEOCODING_KEY = process.env.REACT_APP_GEOCODING_KEY;

interface IReverseGeocodingRequest {
  longitude: number;
  latitude: number;
}

interface IPoint {
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
  public static getRoute = async (startPoint: IPoint, endPoint: IPoint) => {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint.longitude},${startPoint.latitude};${endPoint.longitude},${endPoint.latitude}?geometries=geojson&access_token=${ACCESS_TOKEN}`
    );
    return res.data;
  };
  public static forwardGeocoding = async (address: string) => {
    try {
      const res =
        address &&
        (await axios.get(
          `https://geocode-maps.yandex.ru/1.x/?apikey=${GEOCODING_KEY}&bbox=37.144775,55.561263~38.070374,56.059769&rspn=1&format=json&geocode=${address}`
        ));
      return res.data;
    } catch (e) {
      return null;
    }
  };
}
