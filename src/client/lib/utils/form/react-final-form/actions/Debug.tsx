import React, { useEffect, useRef, useState, useReducer, useCallback } from 'react'
import { Form, Field, useField, useFormState, useForm } from 'react-final-form'

export default function Debug({}){
    const form = useForm()
    const meta = form.getState()

    console.log('\n\n')


    console.log(
        'FORM: ', form,
    )
    console.log(
        'FORM META: ', meta,
    )
    console.log(
        'FORM DATA: ', meta.values,
    )

    console.log(
        'FORM ERRORS: ', meta.errors, 
    )

    console.log('\n\n')

    // console.log('META DTAT', meta.submitting, meta.submitFailed)

    return <>
    
    </>
}