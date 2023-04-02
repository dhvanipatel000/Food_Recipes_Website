import { Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './components/Authentication/login';
import Register from './components/Authentication/register';
import Home from './components/Home/Home';
import AddRecipe from './components/FoodRecipes/AddRecipe';
import Description from './components/FoodRecipes/Description';
import Uploaded from './components/FoodRecipes/Uploaded';
import Update from './components/FoodRecipes/Update'
function App() {
  return (
    <>
    {/* <Login/> */}
    
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/addRecipe' element={<AddRecipe/>} />
            <Route path='/recipe/:id' element={<Description />} />
            <Route path='/uploaded' element={<Uploaded />} />
            <Route path='/update/:id' element={<Update />} />
        </Routes>
      
    </>
  );
}

export default App;
