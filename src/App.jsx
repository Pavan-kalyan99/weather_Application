
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Header from './FoodComponents/Header';
import About from './FoodComponents/About';
import RecipeList from './FoodComponents/RecipeList';
import Details from './FoodComponents/Details';
import PageNotFound from './FoodComponents/PageNotFound';
function App() {

  return (


<>
<Header/>
<Routes>
  
<Route path='/' element={<RecipeList/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/details/:id' element={<Details/>}/>
<Route  path='*' element={<PageNotFound/>}/>

</Routes>
</>
  )
}

export default App

