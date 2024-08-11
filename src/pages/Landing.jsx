import { FeaturedProducts, Hero } from "../components";
import { useAxios } from "../utils";

const url = '/products?featured=true';

export const loader = async () => {
  const response = await useAxios( url );
  const products = response.data.data;
  console.log({products})
  return { products }
}

function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Landing
