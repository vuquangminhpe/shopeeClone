import { ToastContainer } from 'react-toastify'
import useRouteElement from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './Contexts/app.context'

function App() {
  const useRouterElements = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', () => reset())

    return () => localStorageEventTarget.removeEventListener('clearLocalStorage', () => reset())
  }, [reset])
  return (
    <div>
      {useRouterElements} <ToastContainer />
    </div>
  )
}

export default App
