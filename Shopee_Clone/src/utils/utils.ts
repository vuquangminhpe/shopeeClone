import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumSignificantDigits: 1
  })
    .format(value)
    .replace('.', ',')
}

export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}
