import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
}

const cartSlice = createSlice( {
  name: 'cart',
  initialState: JSON.parse( localStorage.getItem( 'cart' ) ) || defaultState,
  reducers: {
    addItem: ( state, action ) => {
      const { product } = action.payload;
      const item = state.cartItems.find( item => item.cardID === product.cartID );

      if ( item ) {
        item.amount = item.amount + product.amount;
      } else {
        state.cartItems.push( product )
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals( state );


      toast.success( 'Item added to cart' );
    },

    clearCart: ( state ) => {
      localStorage.setItem( 'cart', JSON.stringify( defaultState ) );
      return defaultState;
    },

    removeItem: ( state, { payload } ) => {

      //! OBTENEMOS EL ITEM QUE VAMOS A ELIMINAR PARA USARLO DESPUES
      const product = state.cartItems.find( item => item.cartID === payload.product.cartID );

      //! FILTRAMOS EL ARRAY PARA QUE NOS DE UN ARRAY SIN EL QUE VAMOS A ELIMIAR
      state.cartItems.filter( item => item.cardID !== payload.product.CartID );
      //! USAMOS EL PRODUCT PARA DESCONTAR EL "numItemsInCart y el total"
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;

      cartSlice.caseReducers.calculateTotals( state );
      toast.error( 'Item removed from cart' );
    },

    editItem: ( state, action ) => {
      const product = action.payload;
      const itemEdit = state.cartItems.find( item => item.cartID === product.cartID );

      state.numItemsInCart += amount - itemEdit.amount;
      state.cartTotal += itemEdit.price * ( amount - itemEdit.amount );
      itemEdit.amount = product.amount
      cartSlice.caseReducers.calculateTotals( state );
      toast.success( 'Cart updated' );
      
    },

    calculateTotals: ( state ) => {
      state.tax = 0.18 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem( 'cart', JSON.stringify( state ) )
    }
  }
} );
export const {
  addItem,
  clearCart,
  removeItem,
  editItem,
} = cartSlice.actions;

export default cartSlice.reducer;