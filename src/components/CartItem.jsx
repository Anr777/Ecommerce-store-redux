
function CartItem({ cartItem }) {

  const { cartID, title, price, image, amount, company, productColor } = cartItem;

  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      {/**IMAGE */}
      <img src={ image } alt={ title } 
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/**COLOR */}
      <p className="mt-2 text-sm capitalize flex items-center gap-x-2">
        color: 
        <span className="badge badge-sm" style={{ backgroundColor: productColor }}></span>
      </p>

      {/**AMOUNT */}


      {/**REMOVE */}


      {/**PRICE */}

    </article>
  )
}

export default CartItem
