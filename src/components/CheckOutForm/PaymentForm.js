import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from '../CheckOutForm/Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken, backStep, shippingData, onCaptureCheckout, nextStep, timeout}) => {
    const handleSubmit = async (event,elements, stripe)=> {
        event.preventDefault();
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement)
        const {error, paymentMethod} = await stripe.createPaymentMethod({type:'card', card:cardElement});
        
        if (error) {
            console.log(error)
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {firstname: shippingData.firstname, lastname: shippingData.lastname, email: shippingData.email,},
                shipping: { name: 'Primary', 
                             street: shippingData.address1, 
                             town_city: shippingData.city,
                             county: shippingData.SubDivision,
                             postal_zip_code: shippingData.zip,
                             country: shippingData.shippingCountry,
                            },
                            fulfillment: {shipping_method: shippingData.shippingOption},
                            payment: {
                                gateway: 'stripe',
                                stripe: {
                                    payment_method_id: paymentMethod.id

                                }
                            }
            }
            onCaptureCheckout(checkoutToken.id, orderData)
            timeout()
            nextStep()
        }

    }

    return (
      <>
        <Review checkoutToken={checkoutToken} />
        <hr style={{ borderTop: '3px solid #bbb' }} />
        <h5 style={{ padding: '20px 0' }} className='text-center fw-bold'>Payment method</h5>
        <Elements stripe={stripePromise}>
            <ElementsConsumer className='container'>
                {({elements, stripe})=> (
                    <form className='text-center py-3 px-4' onSubmit={(e)=> handleSubmit(e, elements,stripe)}>
                        <CardElement/>
                        <br/>
                        <br/>
                        <div style={{ display:'flex', justifyContent: 'space-between'}}>
                            <button className="btn btn-danger btn-ouline" onClick={backStep}>Back</button>
                             <button className="btn btn-success" type='submit' disabled={!stripe}>
                                 Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                             </button>
                        </div>
                    </form>

                )}
            </ElementsConsumer>

        </Elements>
      </>
    )
}

export default PaymentForm
