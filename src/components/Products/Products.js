import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import Product from './Product/Product'
import { ProductsWrapper } from './styles'


export default function Products({products, onAddToCart, handleShow}) {
   
    return (
      <ProductsWrapper>
      <MDBContainer className='mt-5 size'>
        <MDBRow className='border-bottom'>
          {products.map((product) => (
            <MDBCol key={product.id} className='col-12 col-md-6 mx-auto col-lg-3 my-3'>
              <Product product={product} onAddToCart={onAddToCart} handleShow={handleShow}/>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
      </ProductsWrapper>
    )
}
