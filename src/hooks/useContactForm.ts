import { useReducer, useCallback, useState } from 'react'
import type { ContactFormData, FormErrors } from '@/types'

interface FormState {
  data: ContactFormData
  errors: FormErrors
  touched: Partial<Record<keyof ContactFormData, boolean>>
  submitting: boolean
  sent: boolean
  submitError: string | null
}

type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof ContactFormData; value: string }
  | { type: 'TOUCH_FIELD'; field: keyof ContactFormData }
  | { type: 'SET_ERRORS'; errors: FormErrors }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
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
  touched: {},
  submitting: false,
  sent: false,
  submitError: null,
}

function validateField(field: keyof ContactFormData, value: string): string | undefined {
  switch (field) {
    case 'name':
      return value.trim() ? undefined : 'Bitte geben Sie Ihren Namen ein.'
    case 'email':
      return value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? undefined
        : 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    case 'nachricht':
      return value.trim() ? undefined : 'Bitte geben Sie eine Nachricht ein.'
    default:
      return undefined
  }
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        errors: {
          ...state.errors,
          [action.field]: state.touched[action.field]
            ? validateField(action.field, action.value)
            : state.errors[action.field as keyof FormErrors],
        },
      }
    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
        errors: {
          ...state.errors,
          [action.field]: validateField(action.field, state.data[action.field]),
        },
      }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'SUBMIT_START':
      return { ...state, submitting: true, submitError: null }
    case 'SUBMIT_SUCCESS':
      return { ...initialState, sent: true }
    case 'SUBMIT_ERROR':
      return { ...state, submitting: false, submitError: action.error }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const CONTACT_API = import.meta.env.VITE_CONTACT_API as string | undefined
const isValidEndpoint =
  typeof CONTACT_API === 'string' &&
  CONTACT_API.length > 0 &&
  (CONTACT_API.startsWith('http://') || CONTACT_API.startsWith('https://'))

export function useContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [honeypot, setHoneypot] = useState('')

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, value })
  }, [])

  const touchField = useCallback((field: keyof ContactFormData) => {
    dispatch({ type: 'TOUCH_FIELD', field })
  }, [])

  const validate = useCallback((): boolean => {
    const errors: FormErrors = {}
    errors.name = validateField('name', state.data.name)
    errors.email = validateField('email', state.data.email)
    errors.nachricht = validateField('nachricht', state.data.nachricht)

    // Remove undefined entries
    const clean: FormErrors = {}
    if (errors.name) clean.name = errors.name
    if (errors.email) clean.email = errors.email
    if (errors.nachricht) clean.nachricht = errors.nachricht

    dispatch({ type: 'SET_ERRORS', errors: clean })
    return !clean.name && !clean.email && !clean.nachricht
  }, [state.data])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!validate()) return

      if (honeypot) {
        dispatch({ type: 'SUBMIT_SUCCESS' })
        return
      }

      dispatch({ type: 'SUBMIT_START' })

      try {
        if (!isValidEndpoint) {
          throw new Error('NO_ENDPOINT')
        }
        const res = await fetch(CONTACT_API!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(state.data),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        dispatch({ type: 'SUBMIT_SUCCESS' })
      } catch (err) {
        const message =
          err instanceof Error && err.message === 'NO_ENDPOINT'
            ? 'Kontaktformular ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns direkt per E-Mail an info@lab-root.com.'
            : 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.'
        dispatch({ type: 'SUBMIT_ERROR', error: message })
      }
    },
    [validate, state.data, honeypot],
  )

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return {
    formData: state.data,
    formErrors: state.errors,
    formSent: state.sent,
    formSubmitting: state.submitting,
    submitError: state.submitError,
    honeypot,
    setHoneypot,
    updateField,
    touchField,
    handleSubmit,
    reset,
  }
}
