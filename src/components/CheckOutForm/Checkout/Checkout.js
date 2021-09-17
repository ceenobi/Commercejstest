import {useState, useEffect} from 'react'
import {CheckoutWrapper} from './styles'
import { commerce } from '../../../lib/Commerce'
import { MDBSpinner } from 'mdb-react-ui-kit'

import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {Link, useHistory} from 'react-router-dom'



const steps = ['Shipping address', 'Payment details']


const Checkout = ({ cart, order, error, onCaptureCheckout }) => {
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        })
        setCheckoutToken(token)
      } catch (error) {
        history.push('/')
      }
    }
    generateToken()
  }, [cart])

  const nextStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep + 1)
  const backStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep - 1)

  const next = (data) => {
    setShippingData(data)
    nextStep()
  }

  const timeout =() => {
    setTimeout(()=> {
      setIsFinished(true)
    }, 3000)

  }

  let Confirmation = () => order.customer ? (
      <>
        <div className='py-3 px-4'>
          <h5 className='text-center'>
            Thank you for your purchase, {order.customer.firstname}
            {order.customer.lastname}!
          </h5>
          <hr style={{ borderTop: '3px solid #bbb' }} />
          <h6 className='text-center mb-0'>Order ref: {order.customer_reference}</h6>
        </div>
        <br />
        <Link to='/' className='text-center py-3'>
          <button className='btn btn-primary'>Back to home</button>
        </Link>
      </>
    ) : isFinished ? (
      <div className='py-3 px-4'>
          <h5 className='text-center'>
            Thank you for your purchase
          </h5>
          <hr style={{ borderTop: '3px solid #bbb' }} />
          <br />
        <Link to='/' className='text-center py-3'>
          <button className='btn btn-primary'>Back to home</button>
        </Link>
        </div>

    )  : (
      <div className='d-flex justify-content-center'>
        <MDBSpinner grow>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    )

    if (error) {
      <>
        <h5>Error: {error}</h5>
        <br />
        <Link to='/'>
          <button className='btn btn-primary'>Back to home</button>
        </Link>
      </>
    }
  

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    )

  return (
    <CheckoutWrapper className='py-5 px-4 container'>
      <h4 className='text-center fw-bold'>Checkout</h4>
      <div className='row border-1 shadow bg-light'>
        <div className='col-lg-8 col-md-6 offset-md-2'>
          <div className='wrapper-progressBar' activeStep={activeStep}>
            {steps.map((step) => (
              <ul key={step} className='progressBar'>
                <li className='active'>{step}</li>
              </ul>
            ))}
          </div>
        </div>
        {activeStep === steps.length ? (
          <Confirmation />
        ) : (
          checkoutToken && <Form />
        )}
      </div>
    </CheckoutWrapper>
  )
}

export default Checkout
