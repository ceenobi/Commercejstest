import { useFormContext, Controller } from 'react-hook-form'
import { MDBInput, MDBRow, MDBContainer } from 'mdb-react-ui-kit'

import React from 'react'
 
 const FormInput = ({name, label, required}) => {
     
  const {control} = useFormContext()
    
     return (
       <MDBContainer>
         <MDBRow className='mb-2'>
           <Controller
             control={control}
             name={name}
             render={({ field }) => (
               <MDBInput
                 {...field}
                 label={label}
                 id='form1'
                 required={required}
               />
             )}
           />
         </MDBRow>
       </MDBContainer>
     )
 }
 
 export default FormInput
  


