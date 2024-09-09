import React from 'react'
import Footer from '../../Components/Footer'
import CartHeader from '../../Components/CartHeader'
interface Props {
  children?: React.ReactNode
}
export default function CartLayout({ children }: Props) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
