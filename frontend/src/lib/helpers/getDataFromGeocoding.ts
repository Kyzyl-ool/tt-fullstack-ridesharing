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
  const initial = { ...initialData };
  return data.response.GeoObjectCollection.featureMember.reduce(
    (acc, { GeoObject: { name, metaDataProperty, Point } }) => {
      const latLng = Point.pos.split(' ').reverse();
      return metaDataProperty.GeocoderMetaData.kind === 'street' || metaDataProperty.GeocoderMetaData.kind === 'house'
        ? {
            ...acc,
            options: [...acc.options, `${name}`],
            addresses: [...acc.addresses, { label: `${name}`, pos: { lat: latLng[0], lng: latLng[1] } }]
          }
        : acc;
    },
    initial
  );
};

export default getDataFromGeocoding;
