import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBSpinner } from 'mdb-react-ui-kit'
import CartItem from './CartItem/CartItem'
import { CartWrapper } from './styles'
import {Link} from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
  const EmptyCart = () => (
    <div className='row'>
      <div className='text-center mt-5'>
        <h4 className='text-title'>Your cart is currently empty</h4>
        <p>
          Start
          <span className='text-reset'>
            <Link to='/'> adding</Link>
          </span> some!
        </p>
      </div>
    </div>
  )
  const FilledCart = () => (
    <CartWrapper>
      <div>
        <div className='d-none d-lg-block text-center'>
          <MDBRow className='mt-5'>
            <MDBCol lg='2' className='mb-3 mb-md-0 mx-auto col-10'>
              <p className='text-uppercase'>product</p>
            </MDBCol>
            <MDBCol lg='2' className='mb-3 mb-md-0 mx-auto col-10'>
              <p className='text-uppercase'>Description</p>
            </MDBCol>
            <MDBCol lg='2' className='mb-3 mb-md-0 mx-auto col-10'>
              <p className='text-uppercase'>Quantity</p>
            </MDBCol>
            <MDBCol lg='2' className='mb-3 mb-md-0 mx-auto col-10'>
              <p className='text-uppercase'>Price</p>
            </MDBCol>
            <MDBCol lg='2' className='mb-3 mb-md-0 mx-auto col-10'>
              <p className='text-uppercase'>Remove</p>
            </MDBCol>
          </MDBRow>
        </div>

        {cart.line_items.map((item) => (
          <div className='mb-3 mb-md-0 border-bottom py-3 mx-auto' key={item.id}>
            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
          </div>
        ))}
      </div>
      <div className='d-lg-flex mt-5 justify-content-between text-center'>
        <h3>Subtotal: {cart.subtotal.formatted_with_symbol}</h3>
        <div>
          <button type='button' className='btn btn-danger' onClick={handleEmptyCart}>
            Empty cart
          </button>
          <Link to='/checkout'>
             <button type='button' className='btn btn-success mx-2'>Checkout</button>
          </Link>      
        </div>
      </div>
    </CartWrapper>
  )
  if (!cart.line_items) {
    return (
      <div className='py-5 d-flex justify-content-center'>
        <MDBSpinner grow color='success'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    )
  }

  return (
    <MDBContainer className='my-5'>
      <h3>Your Shopping Cart</h3>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </MDBContainer>
  )
}
 
export default Cart;