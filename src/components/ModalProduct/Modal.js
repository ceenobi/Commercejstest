import React from 'react'
import {MDBContainer, MDBRow} from 'mdb-react-ui-kit'
import ModalProduct from './ModalProduct'
import { ModalWrapper } from './styles'


const Modal = ({ products, onAddToCart, show, handleClose, handleShow}) => {
  
  return (
    <ModalWrapper>
      <MDBContainer className='py-5'>
        <MDBRow>
          {products.map((product) => (
            <div key={product.id}>
              <ModalProduct
                product={product}
                onAddToCart={onAddToCart}
                show={show}
                handleShow={handleShow}
                handleClose={handleClose}
              />
            </div>
          ))}
        </MDBRow>
      </MDBContainer>
    </ModalWrapper>
  )
}

export default Modal
