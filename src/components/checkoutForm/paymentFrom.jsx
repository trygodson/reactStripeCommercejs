import React from 'react'
    // eslint-disable-next-line
import {Typography, Button, Divider} from '@material-ui/core'
    // eslint-disable-next-line
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
    // eslint-disable-next-line
import {loadStripe} from '@stripe/stripe-js'
import Review from './review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const PaymentFrom = ({checkOutToken, shippingData, nextStep, onCaptureCheckOut, backStep}) => {

  const handleSubmit = async (event, elements, stripe)=>{
    event.preventDefault()
    if(!stripe || !elements) return;
    const cardElements = elements.getElement(CardElement)
        // eslint-disable-next-line
    const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElements})
    if (error){
      console.log(error.message)
    } else{
      const orderData = {
        line_items: checkOutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: {
        name: 'primary',
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.subDivision,
        postal_zip_code: shippingData.zip, 
        country: shippingData.shippingCountry
      },
      fulfillment: {shipping_method: shippingData.shippingOption},
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id
        }
      }
      }
      onCaptureCheckOut(checkOutToken.id, orderData)
      nextStep()
    }
  }
  return (
    <>
      <Review checkOutToken={checkOutToken}/>
      <Divider/>
      <Typography variant="h6" gutterBottom style={{margin: '20px, 0'}}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe})=>(
            <form onSubmit={(event)=>handleSubmit(event , elements, stripe)}>
              <CardElement/>
              <br/> <br/>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="submit" variant="outlined" disabled={!stripe} color='primary'>
                  Pay {checkOutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}  
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentFrom
