interface IAddress {
  label: string;
  pos: {
    lat: string;
    lng: string;
  };
}

interface IGeocodingData {
  options: string[];
  addresses: IAddress[];
}

const initialData: IGeocodingData = {
  options: [],
  addresses: []
};

const getDataFromGeocoding = (data: any): IGeocodingData => {
  return data.response.GeoObjectCollection.featureMember.reduce((acc, { GeoObject: { name, description, Point } }) => {
    const latLng = Point.pos.split(' ');
    acc.options.push(`${name} (${description})`);
    acc.addresses.push({ label: `${name} (${description})`, pos: { lat: latLng[0], lng: latLng[1] } });
    return acc;
  }, initialData);
};

export default getDataFromGeocoding;
