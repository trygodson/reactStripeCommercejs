import React, {useState, useEffect} from 'react'
// eslint-disable-next-line
import {Link} from "react-router-dom"
// eslint-disable-next-line
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import AddressForm from '../addressForm'
import PaymentFrom from '../paymentFrom'
import {commerce} from '../../../lib/commerce'
import useStyles from './styles'



const steps = ['shipping address', 'payment details']

const CheckOut = ({cart, order, onCaptureCheckOut, error}) => {
    // eslint-disable-next-line
  const [checkOutToken, setCheckOutToken] = useState(null)
  // eslint-disable-next-line
  const [activeStep, setActiveStep] = useState(0)
    // eslint-disable-next-line
  const [shippingData, setShippingData] = useState({})
  const generateToken = async ()=>{  
    try {
        const token = await commerce.checkout.generateToken(cart.id, {type: "cart"})
        setCheckOutToken(token) 
      } catch (error) {
        console.log(error)
      }
  }
  const classes = useStyles()
  useEffect(()=>{
    generateToken()
    // eslint-disable-next-line
  },[])
const nextStep = ()=> (
  setActiveStep((prevState)=> prevState + 1)
)
    // eslint-disable-next-line
const prevStep = ()=> (
  setActiveStep((prevState)=> prevState - 1)
)

  const next = (data)=>{
    setShippingData(data)
    nextStep()
  }
  const Spinner = ()=>{
    return(
      <>
        <div className={classes.spinner}>
          <CircularProgress/>
        </div>
      </>
    )
  }
  const Form = ()=>{
    return activeStep === 0 ? <AddressForm checkOutToken={checkOutToken} next={next}/> : <PaymentFrom checkOutToken={checkOutToken} backStep={prevStep} nextStep={nextStep} shippingData={shippingData} onCaptureCheckOut={onCaptureCheckOut}/>
  }
  const Confirmation = ()=> order.customer ? (
    <>
      <div>Confirmation</div>
    </>
  ): (
    <div className={classes.spinner}>
      <CircularProgress/>
    </div>
  )

  if(error){
    return(
      <>
        <Typography variant="h5">Error {error}</Typography>
        <br/>
        <Button component={Link} to="/" variant='outlined'>Back Home</Button>
      </>
    )
  }
  return (
    <>
      <div className={classes.toolbar}/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center"></Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step)=>(
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation/> : (!checkOutToken ? <Spinner/> : <Form/>)}
        </Paper>
      </main>
    </>
  )
}

export default CheckOut
