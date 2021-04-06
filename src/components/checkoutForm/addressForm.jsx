import React, {useState, useEffect} from 'react'
 // eslint-disable-next-line
import {InputLabel, Button, Select, MenuItem, Grid, Typography, ButtonGroup} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from './customTextField'
import {Link} from 'react-router-dom'
import {commerce} from '../../lib/commerce';


const AddressForm = ({checkOutToken, next}) => {
  const methods = useForm()
  // eslint-disable-next-line
  const [shippingCountries, setShippingCountries] = useState([])
  // eslint-disable-next-line
  const [shippingCountry, setShippingCountry] = useState('')
  // eslint-disable-next-line
  const [shippingSubDivisions, setShippingSubDivisions] = useState([])
  // eslint-disable-next-line
  const [shippingSubDivision, setShippingSubDivision] = useState('')
  // eslint-disable-next-line
  const [shippingOptions, setShippingOptions] = useState([])
  // eslint-disable-next-line
  const [shippingOption, setShippingOption] = useState('')
// eslint-disable-next-line
const fetchShippingCountry = async (checkOutTokenId)=> {
  const {countries} = await commerce.services.localeListShippingCountries(checkOutTokenId)
  setShippingCountries(countries)
  setShippingCountry(Object.keys(countries)[0])
}
const fetchSubDivision = async (countryCode)=>{
  const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
  setShippingSubDivisions(subdivisions)
  setShippingSubDivision(Object.keys(subdivisions)[0])
}
const fetchShippingOptions = async (checkOutTokenId, country, region = null) =>{
  const response = await commerce.checkout.getShippingOptions(checkOutTokenId, {country, region})
  setShippingOptions(response)
  setShippingOption(response[0].id)
}
useEffect(() => {
  fetchShippingCountry(checkOutToken.id)
  // eslint-disable-next-line
}, [])


useEffect(() => {
 if(shippingCountry) fetchSubDivision(shippingCountry)
}, [shippingCountry])

useEffect(()=>{
  if(shippingSubDivision) fetchShippingOptions(checkOutToken.id, shippingCountry, shippingSubDivision )
    // eslint-disable-next-line 
},[shippingSubDivision])

const country = Object.entries(shippingCountries).map(([code, name])=>({
  id: code,
  label: name
  }))


const subdivision = Object.entries(shippingSubDivisions).map(([code, name])=>({
  id: code,
  label: name
  }))

const options = shippingOptions.map(({description, id, price})=>({
  id, 
  label: `${description} - ${price.formatted_with_symbol}`
}) )
  return (
    <>
      <Typography variant="h6">Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=> next({...data, shippingCountry, shippingSubDivision, shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput  name="firstname" label="first name"/>
            <FormInput  name="lastname" label="last name"/>
            <FormInput  name="address1" label="address"/>
            <FormInput  name="Email" label="email"/>
            <FormInput  name="city" label="city"/>
            <FormInput  name="Zip" label="Zip"/>
            <Grid item xs={12} sm={6}>
              <InputLabel>Select Your Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={({target})=> setShippingCountry(target.value)}>
              {country.map((country)=>(
                <MenuItem key={country.id} value={country.id}>
                    {country.label}
                </MenuItem> 
              ))}
              </Select>
            </Grid>
           <Grid item xs={12} sm={6}>
              <InputLabel>Select SubDivision</InputLabel>
              <Select value={shippingSubDivision} fullWidth onChange={({target})=> setShippingSubDivision(target.value)}>
              {subdivision.map((division)=>(
                <MenuItem key={division.id} value={division.id}>
                  {division.label}
                </MenuItem> 
              ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Select Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={({target})=> setShippingOption(target.value)}>
                {options.map((option)=>(
                  <MenuItem key={option.id} value={option.id}>
                      {option.label}
                  </MenuItem> 
                ))}
              </Select>
            </Grid>
          </Grid>
          <br/>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button variant='outlined' component={Link} to='/cart'>Back to Cart</Button>
            <Button variant='contained' type='submit' color='primary'>Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
