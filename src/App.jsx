
import './App.css'
import UserLocation from './components/UserLocation'
import Search from './components/Search'
import Navigationbar from './components/Navigationbar'
//notificcation from 'react-toastify'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
   <>

<Navigationbar/>

<div className='grid lg:grid-cols-2  sm:grid-cols-1 md:grid-cols-2 gap-2'>
   <Search/>
   <UserLocation/>

</div>
  <ToastContainer />
   </>
  )
}

export default App
