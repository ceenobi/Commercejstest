import React from 'react'
import {ModalWrapper} from './styles'
import {
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit'

const ModalProduct = ({product, onAddToCart, show, handleClose}) => {
    

    return (
      <ModalWrapper>
          <div className="modal text-center py-5 px-4" show={show} onHide={handleClose}>
              <div className="modal-content">
               <div className="modal-body ">
                <div className='bg-white shadow'>
                <img src={product.media.source} alt={product.name} className='img-fluid mb-0'/>
                <h4 className='fs-6 mb-0 mx-auto'>{product.name}</h4>
                <p className='fs-4 mb-0 mx-auto'>{product.price.formatted_with_symbol}</p>
              </div>             
                <p className='text-center py-3 px-4'>{product.description}</p>
             </div> 
             <div className="modal-footer d-flex justify-content-around">
             <div className=" mt-3">
             <MDBBtn className='btn-warning' onClick={handleClose}>close
             </MDBBtn>
              <MDBBtn className='btn-primary mx-2'onClick={() => {onAddToCart(product.id, 1)}}>
              <MDBIcon fas icon='shopping-cart' /> Add
            </MDBBtn>
           </div>        
          </div>
        </div>           
          </div> 
      </ModalWrapper>
    )
}

export default ModalProduct
