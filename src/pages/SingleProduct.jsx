import { Link, useLoaderData } from "react-router-dom";
import { formatPrice, generateAmountOptions, useAxios } from "../utils"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";


export const loader = async function ( { params } ) {
  const response = await useAxios( `/products/${ params.id }` )
  console.log( params )
  return { product: response.data.data };
}

function SingleProduct() {

  const dispatch = useDispatch();
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } = product.attributes;
  const solesAmount = formatPrice( price );
  //! STATES
  const [ productColor, setProductColor ] = useState( colors[ 0 ] );
  const [ amount, setAmount ] = useState( 1 );

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount
  }

  //? FUNCIONES Y METODOS

  function handleAmount( e ) {
    setAmount( parseInt( e.target.value ) );
  }

  function addToCart() {
    dispatch( addItem( { product: cartProduct } ) );
  }


  return (
    <section className="">
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/products'>
              Products
            </Link>
          </li>
        </ul>
      </div>
      {/**PRODUCT */ }
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/**IMAGE */ }
        <img src={ image } alt={ title } className="w-96 h-96 object-cover rounded-lg lg:w-full" />

        {/**PRUDUCT INFO */ }
        <div>
          <h1 className="capitalize text-3xl font-bold">
            { title }
          </h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">{ company }</h4>
          <p className="mt-3 text-xl">{ solesAmount }</p>
          <p className="mt-6 leading-8">{ description }</p>
          {/**COLORS */ }
          <div className="mt-6">
            <h4 className="textarea-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              { colors && colors.map( color => (
                <button key={ color }
                  className={ `badge w-6 h-6 mr-2 ${ color === productColor && 'border-2 border-secondary' }` }
                  type="button"
                  style={ { backgroundColor: color } }
                  onClick={ () => setProductColor( color ) }
                >

                </button>
              ) ) }
            </div>
          </div>
          {/** AMOUNT */ }
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-base font-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>

            <select id="amount"
              className="select select-secondary select-bordered select-md" value={ amount } onChange={ ( handleAmount ) }
            >
              {
                generateAmountOptions( 3 )
              }
            </select>
          </div>
          {/** CART BTN */ }
          <div className="mt-10">
            <button className="btn btn-secondary btn-md"
              onClick={ addToCart }
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct