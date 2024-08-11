import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { useAxios } from "../utils";

const url = '/products'

export const loader = async function ( { request } ) {
  const params = Object.fromEntries([...new URL(request.url).searchParams]);
  console.log(params)
  const response = await useAxios( url, {
    params
  } );
  const products = response.data.data;
  const meta = response.data.meta;
  return {
    products,
    meta,
    params
  };
}

export default function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

