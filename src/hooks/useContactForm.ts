import { useReducer, useRef, useEffect, useCallback } from 'react'
import type { ContactFormData, FormErrors } from '@/types'

interface FormState {
  data: ContactFormData
  errors: FormErrors
  sent: boolean
}

type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof ContactFormData; value: string }
  | { type: 'SET_ERRORS'; errors: FormErrors }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'RESET_SENT' }
  | { type: 'RESET' }

const initialState: FormState = {
  data: {
    name: '',
    email: '',
    telefon: '',
    betreff: 'Allgemeine Anfrage',
    nachricht: '',
  },
  errors: {},
  sent: false,
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'SUBMIT_SUCCESS':
      return { ...state, sent: true }
    case 'RESET_SENT':
      return { ...state, sent: false }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function useContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, value })
  }, [])

  const validate = useCallback((): boolean => {
    const errors: FormErrors = {}
    if (!state.data.name.trim()) errors.name = 'Bitte geben Sie Ihren Namen ein.'
    if (!state.data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.data.email))
      errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    if (!state.data.nachricht.trim()) errors.nachricht = 'Bitte geben Sie eine Nachricht ein.'
    dispatch({ type: 'SET_ERRORS', errors })
    return !errors.name && !errors.email && !errors.nachricht
  }, [state.data])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!validate()) return
      dispatch({ type: 'SUBMIT_SUCCESS' })
      timeoutRef.current = setTimeout(() => dispatch({ type: 'RESET_SENT' }), 5000)
    },
    [validate],
  )

  return {
    formData: state.data,
    formErrors: state.errors,
    formSent: state.sent,
    updateField,
    handleSubmit,
  }
}
