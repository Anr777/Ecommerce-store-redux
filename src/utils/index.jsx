
import axios from 'axios';

const productionUrl = 'https://strapi-store-server.onrender.com/api';

export const useAxios = axios.create( {
  baseURL: productionUrl,
} );

export const formatPrice = function ( price ) {
  const solesAmount = new Intl.NumberFormat( 'es-PE', {
    style: 'currency',
    currency: "PEN"
  } ).format( ( price / 27.03 ).toFixed( 2 ) );
  return solesAmount;
}

export const generateAmountOptions = function ( number ) {
  return Array.from( { length: number }, ( _, index ) => (
    <option key={ index + 1 } value={ index + 1 }>{ index + 1 }</option>
  ) )
}