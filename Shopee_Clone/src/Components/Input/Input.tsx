import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Input({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  classNameInput = 'rounded-sm focus:shadow-sm p-3 w-full outline-none border border-gray-300 focus:border-gray-500',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input className={classNameInput} type={type} placeholder={placeholder} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
