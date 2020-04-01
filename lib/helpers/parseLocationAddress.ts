// refine address and separate meaningful part into 'name'
// and secondary part into 'address'
export const parseLocationAddress = (address: string) => {
  const splittedAddress = address.split(', ');
  return {
    name: splittedAddress.slice(-2).join(', '),
    address: splittedAddress.slice(0, splittedAddress.length - 3).join(', ')
  };
};
