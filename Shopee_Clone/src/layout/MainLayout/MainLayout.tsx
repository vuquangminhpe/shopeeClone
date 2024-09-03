import React from 'react'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
