import { ToastContainer } from 'react-toastify'
import useRouteElement from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const useRouterElements = useRouteElement()
  return (
    <div>
      {useRouterElements} <ToastContainer />
    </div>
  )
}

export default App
