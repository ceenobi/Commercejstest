import React from 'react'
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit'

const Review = ({checkoutToken}) => {
    return (
      <>
        <h5 className='text-center fw-bold py-3'>Order summary</h5>
        <MDBListGroup className='py-3 px-4'>
          {checkoutToken.live.line_items.map((product) => (
            <MDBListGroupItem style={{ padding: '10px 0' }} key={product.name}>
              <div className='d-lg-flex flex-column text-center'>
                <p>{product.name}</p>
                <p> {`Quantity: ${product.quantity}`}</p>
                <p className='lead'>{product.line_total.formatted_with_symbol}</p>
              </div>
            </MDBListGroupItem>
          ))}
          <MDBListGroupItem style={{ padding: '10px 0' }}>
            <div className='d-lg-flex flex-column text-center'>
              <p>Total</p>
              <p className='lead'>
                {checkoutToken.live.subtotal.formatted_with_symbol}
              </p>
            </div>
          </MDBListGroupItem>
        </MDBListGroup>
      </>
    )
}

export default Review
 