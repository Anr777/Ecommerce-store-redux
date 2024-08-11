import { useSelector } from "react-redux"
import CartItem from "./CartItem";



function CartItemsList() {

  const { cartItems } = useSelector( state => state.cart );
  console.log( cartItems );

  return (
    <>
      {
        cartItems.map( item => {
          return (
            <CartItem key={ item.cartID } cartItem={ item } />
          )
        })
      }
    </>
  )
}

export default CartItemsList
