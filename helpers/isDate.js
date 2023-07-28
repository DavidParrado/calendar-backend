import moment from 'moment';

export const isDate = ( value, { req, location, path} ) => {
  
  if( !value && value !== 0 ) {
    return false;
  }

  const fecha = moment( value );

  return ( fecha.isValid() )
    ? true
    : false
};