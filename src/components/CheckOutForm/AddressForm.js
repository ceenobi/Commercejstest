import { useForm, FormProvider } from "react-hook-form"
import { MDBCol } from 'mdb-react-ui-kit'
import { useState, useEffect} from "react"
import {commerce} from '../../lib/Commerce'
import {Link} from 'react-router-dom'
import FormInput from "./CustomTextField"


const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries , setShippingCountries] = useState([])
    const [shippingCountry , setShippingCountry] = useState('')
    const [shippingSubDivisions , setShippingSubDivsions] = useState([])
    const [shippingSubDivision , setShippingSubDivsion] = useState('')
    const [shippingOptions , setShippingOptions] = useState([])
    const [shippingOption , setShippingOption] = useState('')
    const countries = Object.entries(shippingCountries).map(([code,name])=>({id:code, label:name}))
    const subdivisions = Object.entries(shippingSubDivisions).map(([code,name])=>({id:code, label:name}))
    const options = shippingOptions.map((sO)=> ({id: sO.id, label:`${sO.description} - (${sO.price.formatted_with_symbol})`}))
    
    const methods = useForm()

    
    const fetchShippingCountries = async (checkoutTokenId) => {
       const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
         setShippingSubDivsions(subdivisions)
        setShippingSubDivsion(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
       if(shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

     useEffect(() => {
       if (shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision)
     }, [shippingSubDivision])


    return (
      <div>
        <h6 className='text-center py-3'>Shipping address</h6>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data)=>next({...data, shippingCountry, shippingSubDivision, shippingOption}))}>
            <MDBCol className=' col-md-6 mx-auto col-lg-4'>
              <FormInput required name='firstName' label='First name' />
              <FormInput required name='lastName' label='Last name' />
              <FormInput required name='address1' label='Address1' />
              <FormInput required name='city' label='City' />
              <FormInput required name='email' label='Email'/>
              <FormInput required name='zip' label='ZIP / Postal code' />
            </MDBCol>
            <MDBCol className=' col-md-6 mx-auto col-lg-4'>
              <label for='exampleFormControlInput1' className='form-label mx-2'>
                Shipping Country
              </label>
              <select value={shippingCountry} onChange={(e)=> setShippingCountry(e.target.value)}>
                  {countries.map((country)=>(
                      <option key={country.id} value={country.id}> {country.label}</option>
                  ))}
              </select>
            </MDBCol>
            <MDBCol className=' col-md-6 mx-auto col-lg-4'>
              <label for='exampleFormControlInput1' className='form-label mx-2'>
                Shipping Subdivision
              </label>
              <select value={shippingSubDivision} onChange={(e)=>(setShippingSubDivsion(e.target.value))}>
                  {subdivisions.map((subdivision)=>(
                      <option key={subdivision.id} value={subdivision.id}> {subdivision.label}</option>
                  ))}
              </select>
            </MDBCol >
            <MDBCol className=' col-md-6 mx-auto col-lg-4'>
                 <label for='exampleFormControlInput2' className='form-label mx-2'>
                Shipping Options
              </label>
              <select value={shippingOption} onChange={(e)=>(setShippingOption(e.target.value))}>
                  {options.map((option)=>(
                      <option key={option.id} value={option.id}> {option.label}</option>
                  ))}
              </select>
            </MDBCol>        
              <div className='d-flex justify-content-between py-3  col-md-6 mx-auto col-lg-4'>
                  <Link to='/cart'>
                      <button className='btn btn-danger'>Back to cart</button>
                  </Link>
                  <button type='submit' className='btn btn-success'>Next</button>
              </div>
          </form>
        </FormProvider>
      </div>
    )
}

export default AddressForm
