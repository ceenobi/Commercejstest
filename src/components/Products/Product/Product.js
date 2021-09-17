import {
  MDBCard,
  MDBCardText,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBCardFooter,MDBContainer
} from 'mdb-react-ui-kit'
import {ProductWrapper} from './styles'


export default function Product({product, onAddToCart, handleShow}) {
   
    return (
        <ProductWrapper>
           <MDBCard>
            <MDBCardImage src={product.media.source} alt={product.name} className='img-fluid mb-0'/>
             <MDBContainer className='cast'>
            <div className='text d-flex flex-column'>
            <MDBBtn className='btn-block btn-warning'onClick={()=> handleShow}>Details</MDBBtn>
            <MDBBtn type='button'className='btn-primary btn-block' onClick={()=> {onAddToCart(product.id, 1)}}>
                <MDBIcon fas icon="shopping-cart"/> Add
           </MDBBtn>
            </div>           
            </MDBContainer>
             <MDBCardText className='fs-6 mb-0 mx-auto'>{product.name}</MDBCardText> 
           <MDBCardFooter className="d-flex justify-content-center">      
            <h5 className='mb-0 align-self-center'>
                <span className='mr-1'></span>{product.price.formatted_with_symbol}
            </h5>        
           </MDBCardFooter>           
        </MDBCard>
        </ProductWrapper>
    )
}
