import {MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit'

const CartItem = ({item, onUpdateCartQty, onRemoveFromCart}) => {
    return (
        <div className='text-center'>
            <MDBRow>
            <MDBCol lg='2' className='mx-auto col-10 mb-2'>
                <img src={item.media.source} alt={item.name}style={{width:"5rem", height:"5rem"}} className="img-fluid"/>
            </MDBCol>
            <MDBCol lg='2' className='mx-auto col-10 mb-2'>
                <h4>{item.name}</h4>
            </MDBCol>
            <MDBCol lg='2' className='mx-auto col-10 mb-2'>
            <div className='justify-content-center'>
                <div>
                    <MDBBtn type='button' className='mx-1' onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</MDBBtn>
                    <span className='mx-1'>{item.quantity}</span>
                    <MDBBtn type='button' className='mx-1'onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</MDBBtn>
                </div>              
            </div>
            </MDBCol>
            <MDBCol lg='2' className='mx-auto col-10 mb-2'>
               <h3>{item.line_total.formatted_with_symbol}</h3>
            </MDBCol >
            <MDBCol lg='2' className='mx-auto col-10 mb-2'>
             <MDBIcon fas icon="trash" type='button' color='warning' onClick={()=>onRemoveFromCart(item.id)}/>
            </MDBCol>
        </MDBRow>
        </div>
    )
}

export default CartItem
